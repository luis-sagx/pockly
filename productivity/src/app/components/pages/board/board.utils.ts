import { Horizon, Priority, Task, generateId } from './task.model';

interface LegacyNote {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  priority?: Priority;
  checklist?: unknown;
  createdAt?: number;
  updatedAt?: number;
}

export function priorityToHorizon(priority: Priority | undefined): Horizon {
  switch (priority) {
    case 'high': return 'today';
    case 'low': return 'someday';
    case 'medium':
    default: return 'week';
  }
}

export function importLegacyNotes(rawJson: string): Task[] {
  const parsed = JSON.parse(rawJson) as { notes?: LegacyNote[] } | LegacyNote[];
  const notes = Array.isArray(parsed) ? parsed : parsed.notes;
  if (!Array.isArray(notes)) throw new Error('Invalid quick-notes export');
  return notes.map((note) => {
    const priority = note.priority && ['high', 'medium', 'low'].includes(note.priority) ? note.priority : undefined;
    const now = Date.now();
    return {
      id: note.id || generateId(),
      title: (note.title || 'Untitled task').slice(0, 200),
      description: note.description || '',
      category: note.category || undefined,
      horizon: priorityToHorizon(priority),
      priority,
      checklist: Array.isArray(note.checklist) ? note.checklist as Task['checklist'] : [],
      createdAt: note.createdAt || now,
      updatedAt: note.updatedAt || now,
    };
  });
}
