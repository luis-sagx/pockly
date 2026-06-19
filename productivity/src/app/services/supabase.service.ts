import { Injectable, Inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Task } from '../components/pages/board/task.model';

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

      this.client.auth.getSession().then(({ data }) => {
        this.session.set(data.session);
        this.user.set(data.session?.user ?? null);
      });

      this.client.auth.onAuthStateChange((_event, session) => {
        this.session.set(session);
        this.user.set(session?.user ?? null);
      });
    }
  }

  async signInWithGoogle(): Promise<void> {
    if (!this.client) return;
    await this.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/board`,
      },
    });
  }

  async signUp(
    email: string,
    password: string,
    username: string,
  ): Promise<{ error: Error | null; needsConfirmation: boolean }> {
    if (!this.client) return { error: new Error('Supabase not initialized'), needsConfirmation: false };
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });
    if (data.session) {
      this.session.set(data.session);
      this.user.set(data.session.user);
      return { error: null, needsConfirmation: false };
    }
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

  async fetchTasks(): Promise<Task[]> {
    if (!this.client || !this.user()) return [];

    const { data, error } = await this.client
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      this.syncError.set('Sync failed, tasks stored locally');
      return [];
    }

    this.syncError.set('');
    return (data || []).map((row) => ({
      id: row.id,
      title: row.title || '',
      description: row.description || '',
      horizon: row.horizon || 'week',
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
    }));
  }

  async createTask(task: Task): Promise<boolean> {
    if (!this.client || !this.user()) return false;

    const { error } = await this.client.from('notes').insert({
      id: task.id,
      user_id: this.user()!.id,
      title: task.title,
      description: task.description,
      horizon: task.horizon,
      priority: task.priority,
      checklist: task.checklist,
      created_at: new Date(task.createdAt).toISOString(),
      updated_at: new Date(task.updatedAt).toISOString(),
    });

    if (error) {
      this.syncError.set('Sync failed, tasks stored locally');
      return false;
    }

    this.syncError.set('');
    return true;
  }

  async updateTask(task: Task): Promise<boolean> {
    if (!this.client || !this.user()) return false;

    const { error } = await this.client
      .from('notes')
      .update({
        title: task.title,
        description: task.description,
        horizon: task.horizon,
        priority: task.priority,
        checklist: task.checklist,
        updated_at: new Date(task.updatedAt).toISOString(),
      })
      .eq('id', task.id);

    if (error) {
      this.syncError.set('Sync failed, tasks stored locally');
      return false;
    }

    this.syncError.set('');
    return true;
  }

  async deleteTask(id: string): Promise<boolean> {
    if (!this.client || !this.user()) return false;

    const { error } = await this.client.from('notes').delete().eq('id', id);

    if (error) {
      this.syncError.set('Sync failed, tasks stored locally');
      return false;
    }

    this.syncError.set('');
    return true;
  }
}
