import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  inject,
  computed,
  signal,
  ViewChild,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Note, ChecklistItem } from '../../pages/quick-notes/note.model';
import { generateId } from '../../pages/quick-notes/note.model';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './note-detail.html',
  styleUrl: './note-detail.css',
})
export class NoteDetail implements OnChanges {
  @Input() note: Note | null = null;
  @Input() open = false;
  @Output() saved = new EventEmitter<Note>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalBody') modalBody?: ElementRef<HTMLElement>;

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  editTitle = signal('');
  editDescription = signal('');
  editCategory = signal('');
  editChecklist = signal<ChecklistItem[]>([]);
  newItemText = signal('');

  private previousChecklistLength = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note'] && this.note) {
      this.editTitle.set(this.note.title);
      this.editDescription.set(this.note.description);
      this.editCategory.set(this.note.category ?? '');
      this.editChecklist.set(
        this.note.checklist.map((item) => ({ ...item }))
      );
      this.previousChecklistLength = this.note.checklist.length;
    }
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  save(): void {
    if (!this.note) return;

    const trimmedTitle = this.editTitle().trim();
    if (!trimmedTitle) return;

    const finalTitle = trimmedTitle.length > 200 ? trimmedTitle.substring(0, 200) : trimmedTitle;
    const trimmedCategory = this.editCategory().trim();

    const updated: Note = {
      ...this.note,
      title: finalTitle,
      description: this.editDescription().trim(),
      category: trimmedCategory || undefined,
      checklist: this.editChecklist(),
      updatedAt: Date.now(),
    };

    this.saved.emit(updated);
  }

  addChecklistItem(): void {
    const text = this.newItemText().trim();
    if (!text) return;

    const item: ChecklistItem = {
      id: generateId(),
      text,
      checked: false,
    };

    this.editChecklist.update((items) => [...items, item]);
    this.newItemText.set('');
    this.onChecklistChanged();
  }

  onChecklistChanged(): void {
    const currentLength = this.editChecklist().length;
    if (currentLength > this.previousChecklistLength && this.modalBody) {
      queueMicrotask(() => {
        const el = this.modalBody?.nativeElement;
        if (el) el.scrollTop = el.scrollHeight;
      });
    }
    this.previousChecklistLength = currentLength;
  }

  toggleChecklistItem(id: string): void {
    this.editChecklist.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  removeChecklistItem(id: string): void {
    this.editChecklist.update((items) => items.filter((i) => i.id !== id));
  }

  get priorityLabel(): string {
    switch (this.note?.priority) {
      case 'high':
        return this.t().priorityHigh;
      case 'medium':
        return this.t().priorityMedium;
      case 'low':
        return this.t().priorityLow;
      default:
        return '';
    }
  }

  get priorityColorClass(): string {
    switch (this.note?.priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return '';
    }
  }
}
