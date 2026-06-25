import { Inject, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CURRENT_VERSION, Habit, HabitLog, HabitsState, STORAGE_KEY } from '../components/pages/habits/habit.model';
import { getLocalDateKey } from '../components/pages/habits/habit.utils';
import { generateId } from '../components/pages/board/task.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class HabitsService {
  private isBrowser: boolean;
  private supabase = inject(SupabaseService);

  readonly habits = signal<Habit[]>([]);
  readonly logs = signal<HabitLog[]>([]);
  readonly activeHabits = computed(() =>
    this.habits()
      .filter((habit) => !habit.archived)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  );

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();

    effect(() => {
      const user = this.supabase.user();
      if (user) this.syncFromSupabase();
    });
  }

  add(name: string, color = '#4d4f46'): void {
    const trimmed = name.trim();
    if (!trimmed) return;
    const habit: Habit = {
      id: generateId(),
      name: trimmed.slice(0, 80),
      color,
      createdAt: Date.now(),
      archived: false,
      sortOrder: this.habits().length,
    };
    this.habits.update((habits) => [...habits, habit]);
    this.save();
    this.supabase.upsertHabits([habit]);
  }

  toggle(habitId: string, date = getLocalDateKey()): void {
    const exists = this.logs().some((log) => log.habitId === habitId && log.date === date);
    this.logs.update((logs) =>
      exists
        ? logs.filter((log) => !(log.habitId === habitId && log.date === date))
        : [...logs, { habitId, date }],
    );
    this.save();
    if (exists) {
      this.supabase.deleteHabitLog(habitId, date);
    } else {
      this.supabase.upsertHabitLog(habitId, date);
    }
  }

  archive(habitId: string): void {
    this.habits.update((habits) =>
      habits.map((habit) => (habit.id === habitId ? { ...habit, archived: true } : habit)),
    );
    this.save();
    const updated = this.habits().find((h) => h.id === habitId);
    if (updated) this.supabase.upsertHabits([updated]);
  }

  private async syncFromSupabase(): Promise<void> {
    const { habits, logs } = await this.supabase.fetchHabits();
    if (habits.length > 0) {
      const mapped: Habit[] = habits.map((r: any) => ({
        id: r.id,
        name: r.name,
        color: r.color ?? '#4d4f46',
        createdAt: new Date(r.created_at).getTime(),
        archived: r.archived,
        sortOrder: r.sort_order ?? 0,
      }));
      // habit_logs uses log_date column in the DB
      const mappedLogs: HabitLog[] = logs.map((r: any) => ({
        habitId: r.habit_id,
        date: r.log_date,
      }));
      this.habits.set(mapped);
      this.logs.set(mappedLogs);
      this.save();
    } else {
      await this.supabase.upsertHabits(this.habits());
      for (const log of this.logs()) {
        await this.supabase.upsertHabitLog(log.habitId, log.date);
      }
    }
  }

  private load(): void {
    if (!this.isBrowser) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const state = JSON.parse(raw) as HabitsState;
      if (Array.isArray(state.habits)) this.habits.set(state.habits);
      if (Array.isArray(state.logs)) this.logs.set(state.logs);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private save(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: CURRENT_VERSION, habits: this.habits(), logs: this.logs() }),
    );
  }
}
