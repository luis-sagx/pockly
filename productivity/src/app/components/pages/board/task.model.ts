export type Horizon = 'today' | 'week' | 'someday';
export type Priority = 'high' | 'medium' | 'low';

export interface ChecklistItem { id: string; text: string; checked: boolean; }
export interface Task {
  id: string;
  title: string;
  description: string;
  category?: string;
  horizon: Horizon;
  priority?: Priority;
  checklist: ChecklistItem[];
  createdAt: number;
  updatedAt: number;
}
export interface BoardState { tasks: Task[]; version: number; }
export const STORAGE_KEY = 'pockly-board-v1';
export const CURRENT_VERSION = 1;

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
