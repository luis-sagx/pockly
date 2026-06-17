export interface Habit { id: string; name: string; color: string; createdAt: number; archived: boolean; sortOrder: number; }
export interface HabitLog { habitId: string; date: string; }
export interface HabitsState { habits: Habit[]; logs: HabitLog[]; version: number; }
export const STORAGE_KEY = 'pockly-habits-v1';
export const CURRENT_VERSION = 1;
