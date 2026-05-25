import { Component, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Priority, Note } from '../../pages/quick-notes/note.model';
import { NoteCard } from '../note-card/note-card';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-note-column',
  standalone: true,
  imports: [DragDropModule, NoteCard],
  templateUrl: './note-column.html',
  styleUrl: './note-column.css',
})
export class NoteColumn {
  @Input({ required: true }) priority!: Priority;
  @Input({ required: true }) notes!: Note[];

  @Output() dropped = new EventEmitter<{
    noteId: string;
    newPriority: Priority;
    reorderedNotes: Note[];
  }>();
  @Output() noteClicked = new EventEmitter<string>();
  @Output() noteDeleted = new EventEmitter<string>();
  @Output() reordered = new EventEmitter<Note[]>();

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  get columnTitle(): string {
    switch (this.priority) {
      case 'high':
        return this.t().priorityHigh;
      case 'medium':
        return this.t().priorityMedium;
      case 'low':
        return this.t().priorityLow;
    }
  }

  get headerColorClass(): string {
    switch (this.priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      case 'low':
        return 'text-green-600';
    }
  }

  get accentBorderClass(): string {
    switch (this.priority) {
      case 'high':
        return 'border-red-400';
      case 'medium':
        return 'border-amber-400';
      case 'low':
        return 'border-green-500';
    }
  }

  isDragging = false;

  onDragEntered(): void {
    this.isDragging = true;
  }

  onDragExited(): void {
    this.isDragging = false;
  }

  onDrop(event: CdkDragDrop<Note[]>): void {
    this.isDragging = false;

    if (event.previousContainer === event.container) {
      // Same column: reorder within
      if (event.previousIndex === event.currentIndex) return;
      const reordered = [...this.notes];
      moveItemInArray(reordered, event.previousIndex, event.currentIndex);
      this.reordered.emit(reordered);
      return;
    }

    // Cross-column: insert at drop position
    const draggedNote = event.item.data as Note;
    if (!draggedNote) return;

    const movedNote = { ...draggedNote, priority: this.priority };
    const reordered = [...this.notes];
    reordered.splice(event.currentIndex, 0, movedNote);

    this.dropped.emit({
      noteId: draggedNote.id,
      newPriority: this.priority,
      reorderedNotes: reordered,
    });
  }

  onCardClicked(noteId: string): void {
    this.noteClicked.emit(noteId);
  }

  onCardDeleted(noteId: string): void {
    this.noteDeleted.emit(noteId);
  }
}
