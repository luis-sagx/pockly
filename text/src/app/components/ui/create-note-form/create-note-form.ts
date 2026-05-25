import { Component, Output, EventEmitter, inject, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority } from '../../pages/quick-notes/note.model';
import { LanguageService } from '../../../services/language.service';

export interface CreateNoteData {
  title: string;
  description: string;
  priority: Priority;
  checklist: never[];
}

@Component({
  selector: 'app-create-note-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-note-form.html',
  styleUrl: './create-note-form.css',
})
export class CreateNoteForm {
  @Output() created = new EventEmitter<CreateNoteData>();
  @Output() cancelled = new EventEmitter<void>();

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  title = signal('');
  description = signal('');
  priority = signal<Priority>('medium');

  submit(): void {
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) return;

    // Truncate title to 200 chars
    const finalTitle = trimmedTitle.length > 200 ? trimmedTitle.substring(0, 200) : trimmedTitle;

    this.created.emit({
      title: finalTitle,
      description: this.description().trim(),
      priority: this.priority(),
      checklist: [],
    });
    this.reset();
  }

  cancel(): void {
    this.reset();
    this.cancelled.emit();
  }

  setPriority(p: Priority): void {
    this.priority.set(p);
  }

  private reset(): void {
    this.title.set('');
    this.description.set('');
    this.priority.set('medium');
  }
}
