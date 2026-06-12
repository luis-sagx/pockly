import { Component, Input, Output, EventEmitter, inject, computed, signal } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckSquare, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Note } from '../../pages/quick-notes/note.model';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [DragDropModule, FaIconComponent],
  templateUrl: './note-card.html',
  styleUrl: './note-card.css',
})
export class NoteCard {
  readonly faCheckSquare = faCheckSquare;
  readonly faCheck = faCheck;
  readonly faTimes = faTimes;
  readonly faTrash = faTrash;

  @Input({ required: true }) note!: Note;
  @Output() clicked = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>();

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  showDeleteConfirm = signal(false);

  get priorityColorClass(): string {
    switch (this.note.priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-amber-500';
      case 'low':
        return 'border-l-green-500';
    }
  }

  get checklistBadge(): string {
    if (!this.note.checklist || this.note.checklist.length === 0) return '';
    const checked = this.note.checklist.filter((item) => item.checked).length;
    const total = this.note.checklist.length;
    return `${checked}/${total}`;
  }

  onClick(): void {
    if (this.showDeleteConfirm()) return;
    this.clicked.emit(this.note.id);
  }

  onDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(true);
  }

  confirmDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(false);
    this.deleted.emit(this.note.id);
  }

  cancelDelete(event: MouseEvent): void {
    event.stopPropagation();
    this.showDeleteConfirm.set(false);
  }
}
