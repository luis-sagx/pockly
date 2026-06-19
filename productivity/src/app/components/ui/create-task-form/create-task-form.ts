import { Component, Output, EventEmitter, inject, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Priority } from '../../pages/board/task.model';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

export interface CreateTaskData {
  title: string;
  description: string;
  priority: Priority;
  checklist: never[];
}

@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [FormsModule, FaIconComponent],
  templateUrl: './create-task-form.html',
  styleUrl: './create-task-form.css',
})
export class CreateTaskForm {
  readonly faPlus = faPlus;
  readonly faTimes = faTimes;

  @Output() created = new EventEmitter<CreateTaskData>();
  @Output() cancelled = new EventEmitter<void>();

  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  title = signal('');
  description = signal('');
  priority = signal<Priority>('medium');

  submit(): void {
    const trimmedTitle = this.title().trim();
    if (!trimmedTitle) return;

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
