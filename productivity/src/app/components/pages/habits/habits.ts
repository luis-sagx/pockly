import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import { HabitsService } from '../../../services/habits.service';
import { currentWeekDays, habitStats, weeklyHistory } from './habit.utils';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-habits',
  imports: [FormsModule, FaIconComponent, ToolContent],
  templateUrl: './habits.html',
  styleUrl: './habits.css',
})
export class Habits {
  readonly faBolt = faBolt;

  private habitsService = inject(HabitsService);
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);

 content = computed(() => TOOL_CONTENT[this.languageService.language()].habits);
  readonly habitName = signal('');
  readonly weekDays = currentWeekDays();
  readonly habits = this.habitsService.activeHabits;
  readonly logs = this.habitsService.logs;

  addHabit(): void {
    this.habitsService.add(this.habitName());
    this.habitName.set('');
  }

  toggle(habitId: string, date: string): void {
    this.habitsService.toggle(habitId, date);
  }

  archive(habitId: string): void {
    this.habitsService.archive(habitId);
  }

  done(habitId: string, date: string): boolean {
    return this.logs().some((log) => log.habitId === habitId && log.date === date);
  }

  stats(habitId: string) {
    return habitStats(this.logs().filter((log) => log.habitId === habitId).map((log) => log.date));
  }

  weekHistory(habitId: string) {
    return weeklyHistory(this.logs().filter((log) => log.habitId === habitId).map((log) => log.date));
  }

  heatColor(completed: number): string {
    if (completed === 0) return 'var(--color-olive-light, #ddd9c8)';
    if (completed <= 2) return '#b8d49a';
    if (completed <= 4) return '#7fb356';
    if (completed <= 6) return '#4d8c25';
    return '#2e6010';
  }
}
