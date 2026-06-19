import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { Horizon, Task } from '../../pages/board/task.model';
import { TaskCard } from '../task-card/task-card';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [DragDropModule, TaskCard, FaIconComponent],
  templateUrl: './task-column.html',
  styleUrl: './task-column.css',
})
export class TaskColumn {
  readonly faInbox = faInbox;

  @Input({ required: true }) horizon!: Horizon;
  @Input({ required: true }) tasks!: Task[];

  @Output() dropped = new EventEmitter<{
    taskId: string;
    newHorizon: Horizon;
    reorderedTasks: Task[];
  }>();
  @Output() taskClicked = new EventEmitter<string>();
  @Output() taskDeleted = new EventEmitter<string>();
  @Output() reordered = new EventEmitter<Task[]>();

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  isDragging = false;

  get columnTitle(): string {
    switch (this.horizon) {
      case 'today':
        return this.t().today;
      case 'week':
        return this.t().thisWeek;
      case 'someday':
        return this.t().someday;
    }
  }

  get headerColorClass(): string {
    switch (this.horizon) {
      case 'today':
        return 'text-posthog-orange';
      case 'week':
        return 'text-amber-600';
      case 'someday':
        return 'text-green-700';
    }
  }

  onDragEntered(): void {
    this.isDragging = true;
  }

  onDragExited(): void {
    this.isDragging = false;
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    this.isDragging = false;

    if (event.previousContainer === event.container) {
      if (event.previousIndex === event.currentIndex) return;
      const reordered = [...this.tasks];
      moveItemInArray(reordered, event.previousIndex, event.currentIndex);
      this.reordered.emit(reordered);
      return;
    }

    const draggedTask = event.item.data as Task;
    if (!draggedTask) return;

    const movedTask = { ...draggedTask, horizon: this.horizon };
    const reordered = [...this.tasks];
    reordered.splice(event.currentIndex, 0, movedTask);

    this.dropped.emit({
      taskId: draggedTask.id,
      newHorizon: this.horizon,
      reorderedTasks: reordered,
    });
  }

  onCardClicked(taskId: string): void {
    this.taskClicked.emit(taskId);
  }

  onCardDeleted(taskId: string): void {
    this.taskDeleted.emit(taskId);
  }
}
