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
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faSave, faArrowDown, faMinus, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Task, ChecklistItem, Priority } from '../../pages/board/task.model';
import { generateId } from '../../pages/board/task.model';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [FormsModule, FaIconComponent],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail implements OnChanges {
  readonly faTimes = faTimes;
  readonly faPlus = faPlus;
  readonly faSave = faSave;
  readonly faArrowDown = faArrowDown;
  readonly faMinus = faMinus;
  readonly faArrowUp = faArrowUp;

  @Input() task: Task | null = null;
  @Input() open = false;
  @Output() saved = new EventEmitter<Task>();
  @Output() closed = new EventEmitter<void>();

  @ViewChild('modalBody') modalBody?: ElementRef<HTMLElement>;

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  editTitle = signal('');
  editDescription = signal('');
  editPriority = signal<Priority>('medium');
  editChecklist = signal<ChecklistItem[]>([]);
  newItemText = signal('');

  private previousChecklistLength = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task'] && this.task) {
      this.editTitle.set(this.task.title);
      this.editDescription.set(this.task.description);
      this.editPriority.set(this.task.priority);
      this.editChecklist.set(this.task.checklist.map((item) => ({ ...item })));
      this.previousChecklistLength = this.task.checklist.length;
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
    if (!this.task) return;

    const trimmedTitle = this.editTitle().trim();
    if (!trimmedTitle) return;

    const finalTitle = trimmedTitle.length > 200 ? trimmedTitle.substring(0, 200) : trimmedTitle;

    const updated: Task = {
      ...this.task,
      title: finalTitle,
      description: this.editDescription().trim(),
      priority: this.editPriority(),
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
      items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)),
    );
  }

  removeChecklistItem(id: string): void {
    this.editChecklist.update((items) => items.filter((i) => i.id !== id));
  }
}
