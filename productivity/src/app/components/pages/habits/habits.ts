import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@pockly/shared';
import { HabitsService } from '../../../services/habits.service';
import { currentStreak, getLocalDateKey, lastNDays } from './habit.utils';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-habits', imports: [FormsModule], templateUrl: './habits.html', styleUrl: './habits.css' })
export class Habits {
  private habitsService = inject(HabitsService);
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  readonly habitName = signal('');
  readonly days = lastNDays(7);
  readonly habits = this.habitsService.activeHabits;
  readonly logs = this.habitsService.logs;
  addHabit(): void { this.habitsService.add(this.habitName()); this.habitName.set(''); }
  toggle(habitId: string, date: string): void { this.habitsService.toggle(habitId, date); }
  archive(habitId: string): void { this.habitsService.archive(habitId); }
  done(habitId: string, date: string): boolean { return this.logs().some((log) => log.habitId === habitId && log.date === date); }
  streak(habitId: string): number { return currentStreak(this.logs().filter((log) => log.habitId === habitId).map((log) => log.date)); }
  isToday(date: string): boolean { return date === getLocalDateKey(); }
}
