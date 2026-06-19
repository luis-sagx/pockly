import {
  Component,
  signal,
  effect,
  OnInit,
  OnDestroy,
  inject,
  computed,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { SupabaseService } from '../../../services/supabase.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskColumn } from '../../ui/task-column/task-column';
import { CreateTaskForm, CreateTaskData } from '../../ui/create-task-form/create-task-form';
import { TaskDetail } from '../../ui/task-detail/task-detail';
import { Task, Priority, Horizon, BoardState, STORAGE_KEY, CURRENT_VERSION, generateId } from './task.model';

const DEBOUNCE_MS = 500;

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule, DragDropModule, TaskColumn, CreateTaskForm, TaskDetail, FaIconComponent],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit, OnDestroy {
  readonly faPlus = faPlus;

  private languageService = inject(LanguageService);
  private supabaseService = inject(SupabaseService);
  private isBrowser: boolean;
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  syncError = this.supabaseService.syncError;

  tasks = signal<Task[]>([]);
  activeTask = signal<Task | null>(null);
  showCreateForm = signal(false);
  showDetail = signal(false);

  somedayTasks = computed(() => this.tasks().filter((task) => task.horizon === 'someday'));
  weekTasks = computed(() => this.tasks().filter((task) => task.horizon === 'week'));
  todayTasks = computed(() => this.tasks().filter((task) => task.horizon === 'today'));

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private prevLoggedIn: boolean | undefined;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      const allTasks = this.tasks();
      this.debouncedSave(allTasks);
    });

    effect(() => {
      const loggedIn = this.supabaseService.isLoggedIn();
      if (this.prevLoggedIn === true && !loggedIn) {
        this.tasks.set([]);
        this.clearStorage();
      } else if (loggedIn && this.prevLoggedIn !== true) {
        this.loadSupabaseTasks();
      }
      this.prevLoggedIn = loggedIn;
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.loadFromStorage();
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  createTask(data: CreateTaskData): void {
    const task: Task = {
      id: generateId(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      horizon: 'today',
      checklist: data.checklist,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.tasks.update((tasks) => [task, ...tasks]);

    if (this.supabaseService.isLoggedIn()) {
      this.supabaseService.createTask(task);
    }
  }

  updateTask(updated: Task): void {
    updated = { ...updated, updatedAt: Date.now() };
    this.tasks.update((tasks) => tasks.map((task) => (task.id === updated.id ? updated : task)));

    if (this.supabaseService.isLoggedIn()) {
      this.supabaseService.updateTask(updated);
    }
  }

  deleteTask(id: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    if (this.activeTask()?.id === id) {
      this.activeTask.set(null);
      this.showDetail.set(false);
    }

    if (this.supabaseService.isLoggedIn()) {
      this.supabaseService.deleteTask(id);
    }
  }

  moveTask(taskId: string, newHorizon: Horizon): void {
    this.tasks.update((tasks) =>
      tasks.map((task) => (task.id === taskId ? { ...task, horizon: newHorizon, updatedAt: Date.now() } : task)),
    );

    if (this.supabaseService.isLoggedIn()) {
      const movedTask = this.tasks().find((task) => task.id === taskId);
      if (movedTask) {
        this.supabaseService.updateTask(movedTask);
      }
    }
  }

  onTaskClicked(taskId: string): void {
    const task = this.tasks().find((item) => item.id === taskId) ?? null;
    this.activeTask.set(task);
    this.showDetail.set(true);
  }

  onTaskDropped(event: { taskId: string; newHorizon: Horizon; reorderedTasks: Task[] }): void {
    this.tasks.update((tasks) => {
      const withoutDragged = tasks.filter((task) => task.id !== event.taskId);
      return this.mergeHorizonTasks(withoutDragged, event.newHorizon, event.reorderedTasks);
    });
  }

  onColumnReordered(reorderedTasks: Task[], horizon: Horizon): void {
    this.tasks.update((tasks) => this.mergeHorizonTasks(tasks, horizon, reorderedTasks));
  }

  private mergeHorizonTasks(tasks: Task[], horizon: Horizon, reordered: Task[]): Task[] {
    const result: Task[] = [];
    let reorderedIndex = 0;
    for (const task of tasks) {
      if (task.horizon === horizon) {
        if (reorderedIndex < reordered.length) {
          result.push(reordered[reorderedIndex++]);
        }
      } else {
        result.push(task);
      }
    }
    while (reorderedIndex < reordered.length) {
      result.push(reordered[reorderedIndex++]);
    }
    return result;
  }

  onTaskSaved(updated: Task): void {
    this.updateTask(updated);
    this.showDetail.set(false);
    this.activeTask.set(null);
  }

  onDetailClosed(): void {
    this.showDetail.set(false);
    this.activeTask.set(null);
  }

  private loadFromStorage(): void {
    if (this.supabaseService.isLoggedIn()) {
      this.loadSupabaseTasks();
    } else {
      const state = this.readLocalStorage();
      this.tasks.set(state.tasks);
    }
  }

  private async loadSupabaseTasks(): Promise<void> {
    const remoteTasks = await this.supabaseService.fetchTasks();
    if (remoteTasks.length > 0) {
      this.tasks.set(remoteTasks);
      this.saveToStorage(remoteTasks);
    } else {
      const state = this.readLocalStorage();
      if (state.tasks.length > 0) {
        this.tasks.set(state.tasks);
        for (const task of state.tasks) {
          await this.supabaseService.createTask(task);
        }
      }
    }
  }

  private readLocalStorage(): BoardState {
    if (!this.isBrowser) return { tasks: [], version: CURRENT_VERSION };

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.version && Array.isArray(parsed.tasks)) {
          return parsed;
        }
      } catch {
        // ignore corrupted local storage
      }
    }

    return { tasks: [], version: CURRENT_VERSION };
  }

  private debouncedSave(tasks: Task[]): void {
    if (!this.isBrowser) return;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.saveToStorage(tasks);
    }, DEBOUNCE_MS);
  }

  private saveToStorage(tasks: Task[]): void {
    if (!this.isBrowser) return;
    const state: BoardState = { tasks, version: CURRENT_VERSION };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private clearStorage(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(STORAGE_KEY);
  }
}
