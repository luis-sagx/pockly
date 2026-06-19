import { Component, Input, Output, EventEmitter, inject, computed, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckSquare, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../pages/board/task.model';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [DragDropModule, FaIconComponent],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  readonly faCheckSquare = faCheckSquare;
  readonly faCheck = faCheck;
  readonly faTimes = faTimes;
  readonly faTrash = faTrash;

  @Input({ required: true }) task!: Task;
  @Output() clicked = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  showDeleteConfirm = signal(false);

  get priorityColorClass(): string {
    switch (this.task.priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-amber-500';
      case 'low':
        return 'border-l-green-500';
    }
  }

  get priorityBadgeClass(): string {
    switch (this.task.priority) {
      case 'high':
        return 'bg-red-50 text-red-700';
      case 'medium':
        return 'bg-amber-50 text-amber-700';
      case 'low':
        return 'bg-green-50 text-green-700';
    }
  }

  get checklistBadge(): string {
    if (!this.task.checklist || this.task.checklist.length === 0) return '';
    const checked = this.task.checklist.filter((item) => item.checked).length;
    const total = this.task.checklist.length;
    return `${checked}/${total}`;
  }

  onClick(): void {
    if (this.showDeleteConfirm()) return;
    this.clicked.emit(this.task.id);
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(true);
  }

  confirmDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(false);
    this.deleted.emit(this.task.id);
  }

  cancelDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(false);
  }
}
