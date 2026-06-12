import { Injectable, Inject, PLATFORM_ID, signal, computed, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Note, ChecklistItem } from '../components/pages/quick-notes/note.model';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private client: SupabaseClient | null = null;
  private isBrowser: boolean;

  user = signal<User | null>(null);
  session = signal<Session | null>(null);
  isLoggedIn = computed(() => !!this.session());
  syncError = signal('');
  displayName = computed(() => {
    const u = this.user();
    if (!u) return '';
    return u.user_metadata?.['username'] || u.email?.split('@')[0] || '';
  });

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser && environment.supabaseUrl && environment.supabaseAnonKey) {
      this.client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);

      // Restore existing session
      this.client.auth.getSession().then(({ data }) => {
        this.session.set(data.session);
        this.user.set(data.session?.user ?? null);
      });

      // Listen for auth state changes
      this.client.auth.onAuthStateChange((_event, session) => {
        this.session.set(session);
        this.user.set(session?.user ?? null);
      });
    }
  }

  // ── Auth ──

  async signInWithGoogle(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/quick-notes`,
      },
    });
  }

  async signUp(
    email: string,
    password: string,
    username: string
  ): Promise<{ error: Error | null; needsConfirmation: boolean }> {
    if (!this.client) return { error: new Error('Supabase not initialized'), needsConfirmation: false };
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    // If a session is returned, email confirmation is disabled — user is already logged in
    if (data.session) {
      this.session.set(data.session);
      this.user.set(data.session.user);
      return { error: null, needsConfirmation: false };
    }
    // If user exists but no session, email confirmation is required
    return { error, needsConfirmation: !error && !!data.user };
  }

  async signInWithPassword(email: string, password: string): Promise<{ error: Error | null }> {
    if (!this.client) return { error: new Error('Supabase not initialized') };
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    return { error };
  }

  async signOut(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signOut();
    this.user.set(null);
    this.session.set(null);
  }

  // ── Notes CRUD (Supabase) ──

  async fetchNotes(): Promise<Note[]> {
    if (!this.client || !this.user()) return [];

    const { data, error } = await this.client
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Failed to fetch notes from Supabase:', error.message);
      this.syncError.set('Sync failed, notes stored locally');
      return [];
    }

    this.syncError.set('');
    return (data || []).map(this.mapRowToNote);
  }

  async createNote(note: Note): Promise<boolean> {
    if (!this.client || !this.user()) return false;

    const { error } = await this.client.from('notes').insert({
      id: note.id,
      user_id: this.user()!.id,
      title: note.title,
      description: note.description,
      category: note.category ?? null,
      priority: note.priority,
      checklist: note.checklist,
      created_at: new Date(note.createdAt).toISOString(),
      updated_at: new Date(note.updatedAt).toISOString(),
    });

    if (error) {
      console.warn('Failed to create note in Supabase:', error.message);
      this.syncError.set('Sync failed, notes stored locally');
      return false;
    }
    this.syncError.set('');
    return true;
  }

  async updateNote(note: Note): Promise<boolean> {
    if (!this.client || !this.user()) return false;

    const { error } = await this.client
      .from('notes')
      .update({
        title: note.title,
        description: note.description,
        category: note.category ?? null,
        priority: note.priority,
        checklist: note.checklist,
        updated_at: new Date(note.updatedAt).toISOString(),
      })
      .eq('id', note.id);

    if (error) {
      console.warn('Failed to update note in Supabase:', error.message);
      this.syncError.set('Sync failed, notes stored locally');
      return false;
    }
    this.syncError.set('');
    return true;
  }

  async deleteNote(id: string): Promise<boolean> {
    if (!this.client || !this.user()) return false;

    const { error } = await this.client.from('notes').delete().eq('id', id);

    if (error) {
      console.warn('Failed to delete note from Supabase:', error.message);
      this.syncError.set('Sync failed, notes stored locally');
      return false;
    }
    this.syncError.set('');
    return true;
  }

  // ── Helpers ──

  private mapRowToNote(row: any): Note {
    return {
      id: row.id,
      title: row.title || '',
      description: row.description || '',
      category: row.category || undefined,
      priority: row.priority || 'medium',
      checklist: Array.isArray(row.checklist)
        ? row.checklist.map((item: any) => ({
            id: item.id || '',
            text: item.text || '',
            checked: !!item.checked,
          }))
        : [],
      createdAt: new Date(row.created_at).getTime(),
      updatedAt: new Date(row.updated_at).getTime(),
    };
  }
}
