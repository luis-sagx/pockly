import {
  Component,
  signal,
  effect,
  OnInit,
  OnDestroy,
  inject,
  computed,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../services/language.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NoteColumn } from '../../ui/note-column/note-column';
import { CreateNoteForm, CreateNoteData } from '../../ui/create-note-form/create-note-form';
import { NoteDetail } from '../../ui/note-detail/note-detail';
import {
  Note,
  Priority,
  NotesState,
  STORAGE_KEY,
  LEGACY_STORAGE_KEY,
  CURRENT_VERSION,
  generateId,
} from './note.model';

const DEBOUNCE_MS = 500;

@Component({
  selector: 'app-quick-notes',
  standalone: true,
  imports: [DragDropModule, NoteColumn, CreateNoteForm, NoteDetail],
  templateUrl: './quick-notes.html',
  styleUrl: './quick-notes.css',
})
export class QuickNotes implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private isBrowser: boolean;
  t = computed(() => this.languageService.getTranslations());

  notes = signal<Note[]>([]);
  activeNote = signal<Note | null>(null);
  showCreateForm = signal(false);
  showDetail = signal(false);

  highNotes = computed(() => this.notes().filter((n) => n.priority === 'high'));
  mediumNotes = computed(() => this.notes().filter((n) => n.priority === 'medium'));
  lowNotes = computed(() => this.notes().filter((n) => n.priority === 'low'));

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      const allNotes = this.notes();
      // Skip save if notes were just loaded (avoid double save on init)
      this.debouncedSave(allNotes);
    });
  }

  ngOnInit(): void {
    this.loadFromStorage();
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  // ── CRUD ──

  createNote(data: CreateNoteData): void {
    const note: Note = {
      id: generateId(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      checklist: data.checklist,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.notes.update((notes) => [note, ...notes]);
  }

  updateNote(updated: Note): void {
    this.notes.update((notes) =>
      notes.map((n) => (n.id === updated.id ? updated : n))
    );
  }

  deleteNote(id: string): void {
    this.notes.update((notes) => notes.filter((n) => n.id !== id));
    if (this.activeNote()?.id === id) {
      this.activeNote.set(null);
      this.showDetail.set(false);
    }
  }

  moveNote(noteId: string, newPriority: Priority): void {
    this.notes.update((notes) =>
      notes.map((n) =>
        n.id === noteId
          ? { ...n, priority: newPriority, updatedAt: Date.now() }
          : n
      )
    );
  }

  // ── Note interaction ──

  onNoteClicked(noteId: string): void {
    const note = this.notes().find((n) => n.id === noteId) ?? null;
    this.activeNote.set(note);
    this.showDetail.set(true);
  }

  onNoteDropped(event: {
    noteId: string;
    newPriority: Priority;
    reorderedNotes: Note[];
  }): void {
    this.notes.update((notes) => {
      // Remove the dragged note (still has old priority)
      const withoutDragged = notes.filter((n) => n.id !== event.noteId);
      // Merge reordered priority notes back in their original positions
      return this.mergePriorityNotes(withoutDragged, event.newPriority, event.reorderedNotes);
    });
  }

  onColumnReordered(reorderedNotes: Note[], priority: Priority): void {
    this.notes.update((notes) =>
      this.mergePriorityNotes(notes, priority, reorderedNotes)
    );
  }

  private mergePriorityNotes(
    notes: Note[],
    priority: Priority,
    reordered: Note[]
  ): Note[] {
    const result: Note[] = [];
    let ri = 0;
    for (const n of notes) {
      if (n.priority === priority) {
        if (ri < reordered.length) {
          result.push(reordered[ri++]);
        }
      } else {
        result.push(n);
      }
    }
    // Append any remaining reordered notes (e.g., destination was empty)
    while (ri < reordered.length) {
      result.push(reordered[ri++]);
    }
    return result;
  }

  onNoteSaved(updated: Note): void {
    this.updateNote(updated);
    this.showDetail.set(false);
    this.activeNote.set(null);
  }

  onDetailClosed(): void {
    this.showDetail.set(false);
    this.activeNote.set(null);
  }

  // ── Persistence ──

  private loadFromStorage(): void {
    const state = this.readStorage();
    this.notes.set(state.notes);
  }

  private readStorage(): NotesState {
    if (!this.isBrowser) return { notes: [], version: CURRENT_VERSION };

    // Try v2 first
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.version && Array.isArray(parsed.notes)) {
          return parsed;
        }
      } catch {
        // Fall through to migration
      }
    }

    // Try legacy migration
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy && legacy.trim()) {
      try {
        // Try to parse as JSON first (old format may have been JSON)
        const parsed = JSON.parse(legacy);
        if (typeof parsed === 'string' && parsed.trim()) {
          // It was a JSON string
          const note = this.createMigratedNote(parsed.trim());
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          return { notes: [note], version: CURRENT_VERSION };
        }
      } catch {
        // Not JSON, treat as plain text
      }

      const note = this.createMigratedNote(legacy.trim());
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return { notes: [note], version: CURRENT_VERSION };
    }

    return { notes: [], version: CURRENT_VERSION };
  }

  private createMigratedNote(text: string): Note {
    return {
      id: generateId(),
      title: 'Quick Notes',
      description: text,
      priority: 'medium',
      checklist: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  private debouncedSave(notes: Note[]): void {
    if (!this.isBrowser) return;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.saveToStorage(notes);
    }, DEBOUNCE_MS);
  }

  private saveToStorage(notes: Note[]): void {
    if (!this.isBrowser) return;
    const state: NotesState = { notes, version: CURRENT_VERSION };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save notes: localStorage quota exceeded');
    }
  }
}
