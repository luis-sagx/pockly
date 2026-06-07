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
import { SupabaseService } from '../../../services/supabase.service';
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
  private supabaseService = inject(SupabaseService);
  private isBrowser: boolean;
  t = computed(() => this.languageService.getTranslations());

  notes = signal<Note[]>([]);
  activeNote = signal<Note | null>(null);
  showCreateForm = signal(false);
  showDetail = signal(false);

  lowNotes = computed(() => this.notes().filter((n) => n.priority === 'low'));
  mediumNotes = computed(() => this.notes().filter((n) => n.priority === 'medium'));
  highNotes = computed(() => this.notes().filter((n) => n.priority === 'high'));

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private prevLoggedIn: boolean | undefined;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      const allNotes = this.notes();
      this.debouncedSave(allNotes);
    });

    effect(() => {
      const loggedIn = this.supabaseService.isLoggedIn();
      if (this.prevLoggedIn === true && !loggedIn) {
        this.notes.set([]);
        this.clearStorage();
      } else if (loggedIn && this.prevLoggedIn !== true) {
        this.loadSupabaseNotes();
      }
      this.prevLoggedIn = loggedIn;
    }, { allowSignalWrites: true });
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
      category: data.category,
      priority: data.priority,
      checklist: data.checklist,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.notes.update((notes) => [note, ...notes]);

    // Sync to Supabase if logged in
    if (this.supabaseService.isLoggedIn()) {
      this.supabaseService.createNote(note);
    }
  }

  updateNote(updated: Note): void {
    updated = { ...updated, updatedAt: Date.now() };
    this.notes.update((notes) =>
      notes.map((n) => (n.id === updated.id ? updated : n))
    );

    if (this.supabaseService.isLoggedIn()) {
      this.supabaseService.updateNote(updated);
    }
  }

  deleteNote(id: string): void {
    this.notes.update((notes) => notes.filter((n) => n.id !== id));
    if (this.activeNote()?.id === id) {
      this.activeNote.set(null);
      this.showDetail.set(false);
    }

    if (this.supabaseService.isLoggedIn()) {
      this.supabaseService.deleteNote(id);
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

    // Sync moved note to Supabase
    if (this.supabaseService.isLoggedIn()) {
      const movedNote = this.notes().find((n) => n.id === noteId);
      if (movedNote) {
        this.supabaseService.updateNote(movedNote);
      }
    }
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
    if (this.supabaseService.isLoggedIn()) {
      this.loadSupabaseNotes();
    } else {
      const state = this.readLocalStorage();
      this.notes.set(state.notes);
    }
  }

  private async loadSupabaseNotes(): Promise<void> {
    const remoteNotes = await this.supabaseService.fetchNotes();
    if (remoteNotes.length > 0) {
      this.notes.set(remoteNotes);
      // Also update localStorage as cache
      this.saveToStorage(remoteNotes);
    } else {
      // No notes in Supabase yet — try localStorage (first login)
      const state = this.readLocalStorage();
      if (state.notes.length > 0) {
        this.notes.set(state.notes);
        // Upload existing notes to Supabase
        for (const note of state.notes) {
          await this.supabaseService.createNote(note);
        }
      }
    }
  }

  private readLocalStorage(): NotesState {
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

  private clearStorage(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }
}
