import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@pockly/shared';
import { BoardService } from '../../../services/board.service';
import { Horizon, Priority, Task } from './task.model';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-board', imports: [FormsModule], templateUrl: './board.html', styleUrl: './board.css' })
export class Board {
  private board = inject(BoardService);
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  readonly tasks = this.board.tasks;
  readonly showForm = signal(false);
  readonly importText = signal('');
  readonly title = signal('');
  readonly description = signal('');
  readonly category = signal('');
  readonly horizon = signal<Horizon>('today');
  readonly priority = signal<Priority | 'none'>('none');
  readonly columns: { id: Horizon; label: keyof Translations; className: string }[] = [
    { id: 'today', label: 'today', className: 'border-posthog-orange' },
    { id: 'week', label: 'thisWeek', className: 'border-olive-deep' },
    { id: 'someday', label: 'someday', className: 'border-olive-border' },
  ];
  tasksByHorizon(horizon: Horizon): Task[] { return this.tasks().filter((task) => task.horizon === horizon); }
  create(): void {
    const title = this.title().trim();
    if (!title) return;
    const selectedPriority = this.priority();
    this.board.create({
      title: title.slice(0, 200),
      description: this.description().trim(),
      category: this.category().trim() || undefined,
      horizon: this.horizon(),
      priority: selectedPriority === 'none' ? undefined : selectedPriority,
    });
    this.title.set(''); this.description.set(''); this.category.set(''); this.horizon.set('today'); this.priority.set('none'); this.showForm.set(false);
  }
  move(task: Task, horizon: Horizon): void { this.board.move(task.id, horizon); }
  remove(id: string): void { this.board.remove(id); }
  importJson(): void { if (this.importText().trim()) { this.board.importJson(this.importText()); this.importText.set(''); } }
  exportJson(): void { this.importText.set(this.board.exportJson()); }
}
