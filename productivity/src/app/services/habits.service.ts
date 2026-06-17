import { Inject, Injectable, PLATFORM_ID, computed, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CURRENT_VERSION, Habit, HabitLog, HabitsState, STORAGE_KEY } from '../components/pages/habits/habit.model';
import { getLocalDateKey } from '../components/pages/habits/habit.utils';
import { generateId } from '../components/pages/board/task.model';

@Injectable({ providedIn: 'root' })
export class HabitsService {
  private isBrowser: boolean;
  readonly habits = signal<Habit[]>([]);
  readonly logs = signal<HabitLog[]>([]);
  readonly activeHabits = computed(() => this.habits().filter((habit) => !habit.archived).sort((a, b) => a.sortOrder - b.sortOrder));

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();
  }

  add(name: string, color = '#4d4f46'): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    const habit: Habit = { id: generateId(), name: trimmed.slice(0, 80), color, createdAt: Date.now(), archived: false, sortOrder: this.habits().length };
    this.habits.update((habits) => [...habits, habit]);
    this.save();
  }

  toggle(habitId: string, date = getLocalDateKey()): void {
    const exists = this.logs().some((log) => log.habitId === habitId && log.date === date);
    this.logs.update((logs) => exists ? logs.filter((log) => !(log.habitId === habitId && log.date === date)) : [...logs, { habitId, date }]);
    this.save();
  }

  archive(habitId: string): void {
    this.habits.update((habits) => habits.map((habit) => habit.id === habitId ? { ...habit, archived: true } : habit));
    this.save();
  }

  private load(): void {
    if (!this.isBrowser) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const state = JSON.parse(raw) as HabitsState;
      if (Array.isArray(state.habits)) this.habits.set(state.habits);
      if (Array.isArray(state.logs)) this.logs.set(state.logs);
    } catch { localStorage.removeItem(STORAGE_KEY); }
  }

  private save(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: CURRENT_VERSION, habits: this.habits(), logs: this.logs() }));
  }
}
