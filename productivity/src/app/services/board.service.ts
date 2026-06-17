import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BoardState, CURRENT_VERSION, Horizon, STORAGE_KEY, Task, generateId } from '../components/pages/board/task.model';
import { importLegacyNotes } from '../components/pages/board/board.utils';

@Injectable({ providedIn: 'root' })
export class BoardService {
  private isBrowser: boolean;
  readonly tasks = signal<Task[]>([]);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();
  }

  create(input: Pick<Task, 'title' | 'description' | 'category' | 'horizon' | 'priority'>): void {
    const now = Date.now();
    const task: Task = { id: generateId(), title: input.title, description: input.description, category: input.category, horizon: input.horizon, priority: input.priority, checklist: [], createdAt: now, updatedAt: now };
    this.tasks.update((tasks) => [task, ...tasks]);
    this.save();
  }

  update(task: Task): void {
    const updated = { ...task, updatedAt: Date.now() };
    this.tasks.update((tasks) => tasks.map((item) => item.id === updated.id ? updated : item));
    this.save();
  }

  move(id: string, horizon: Horizon): void {
    this.tasks.update((tasks) => tasks.map((task) => task.id === id ? { ...task, horizon, updatedAt: Date.now() } : task));
    this.save();
  }

  remove(id: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    this.save();
  }

  importJson(rawJson: string): void {
    const imported = importLegacyNotes(rawJson);
    const existing = new Set(this.tasks().map((task) => task.id));
    this.tasks.update((tasks) => [...imported.filter((task) => !existing.has(task.id)), ...tasks]);
    this.save();
  }

  exportJson(): string {
    return JSON.stringify({ version: CURRENT_VERSION, tasks: this.tasks() }, null, 2);
  }

  private load(): void {
    if (!this.isBrowser) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const state = JSON.parse(raw) as BoardState;
      if (Array.isArray(state.tasks)) this.tasks.set(state.tasks);
    } catch { localStorage.removeItem(STORAGE_KEY); }
  }

  private save(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: CURRENT_VERSION, tasks: this.tasks() }));
  }
}
