export type Priority = 'high' | 'medium' | 'low';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Note {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  checklist: ChecklistItem[];
  createdAt: number;
  updatedAt: number;
}

export interface NotesState {
  notes: Note[];
  version: number;
}

export const STORAGE_KEY = 'pockly-quick-notes-v2';
export const LEGACY_STORAGE_KEY = 'pockly-quick-notes';
export const CURRENT_VERSION = 1;

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
