import { Injectable, inject, computed, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SwPush } from '@angular/service-worker';
import { firstValueFrom } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { HabitsService } from './habits.service';
import { DEFAULT_PREFERENCES, InAppNotification, NotificationPreferences } from '../models/notification.model';
import { getLocalDateKey } from '../components/pages/habits/habit.utils';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private swPush = inject(SwPush);
  private supabase = inject(SupabaseService);
  private habitsService = inject(HabitsService);
  private isBrowser: boolean;

  readonly preferences = signal<NotificationPreferences>(DEFAULT_PREFERENCES);
  readonly pushPermission = signal<NotificationPermission>('default');
  readonly isLoading = signal(false);

  readonly inAppNotifications = computed<InAppNotification[]>(() => {
    const notifications: InAppNotification[] = [];
    const prefs = this.preferences();
    const today = getLocalDateKey();
    const logs = this.habitsService.logs();
    const habits = this.habitsService.activeHabits();

    if (prefs.habitReminderOn) {
      const completedToday = new Set(logs.filter((l) => l.date === today).map((l) => l.habitId));
      const pending = habits.filter((h) => !completedToday.has(h.id));
      if (pending.length > 0) {
        notifications.push({
          id: 'habit_reminder',
          type: 'habit_reminder',
          message: `${pending.length} habit${pending.length > 1 ? 's' : ''} to complete today`,
        });
      }
    }

    if (prefs.streakAlertOn) {
      const completedToday = new Set(logs.filter((l) => l.date === today).map((l) => l.habitId));
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().split('T')[0];
      const completedYesterday = new Set(
        logs.filter((l) => l.date === yesterdayKey).map((l) => l.habitId),
      );
      const atRisk = habits.filter(
        (h) => completedYesterday.has(h.id) && !completedToday.has(h.id),
      );
      if (atRisk.length > 0) {
        notifications.push({
          id: 'streak_alert',
          type: 'streak_alert',
          message: `🔥 Streak at risk: ${atRisk.map((h) => h.name).join(', ')}`,
        });
      }
    }

    return notifications;
  });

  readonly notificationCount = computed(() => this.inAppNotifications().length);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.pushPermission.set(Notification.permission);
      this.loadPreferences();
    }
  }

  async loadPreferences(): Promise<void> {
    const client = this.supabase.getClient();
    const user = this.supabase.user();
    if (!client || !user) return;

    const { data } = await client
      .from('notification_preferences')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      this.preferences.set({
        timezone: data['timezone'],
        reminderTime: (data['reminder_time'] as string).slice(0, 5),
        habitReminderOn: data['habit_reminder_on'],
        taskReminderOn: data['task_reminder_on'],
        streakAlertOn: data['streak_alert_on'],
        pushEnabled: data['push_enabled'],
      });
    }
  }

  async savePreferences(prefs: NotificationPreferences): Promise<void> {
    this.preferences.set(prefs);
    const client = this.supabase.getClient();
    const user = this.supabase.user();
    if (!client || !user) return;

    await client.from('notification_preferences').upsert(
      {
        user_id: user.id,
        timezone: prefs.timezone,
        reminder_time: prefs.reminderTime,
        habit_reminder_on: prefs.habitReminderOn,
        task_reminder_on: prefs.taskReminderOn,
        streak_alert_on: prefs.streakAlertOn,
        push_enabled: prefs.pushEnabled,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );
  }

  async enablePush(): Promise<boolean> {
    if (!this.isBrowser || !environment.vapidPublicKey) return false;
    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: environment.vapidPublicKey,
      });
      const client = this.supabase.getClient();
      const session = this.supabase.session();
      if (!client || !session) return false;

      const key = sub.getKey('p256dh');
      const auth = sub.getKey('auth');
      if (!key || !auth) return false;

      await client.from('push_subscriptions').upsert(
        {
          user_id: session.user.id,
          endpoint: sub.endpoint,
          p256dh: btoa(String.fromCharCode(...new Uint8Array(key))),
          auth_key: btoa(String.fromCharCode(...new Uint8Array(auth))),
        },
        { onConflict: 'user_id,endpoint' },
      );

      this.pushPermission.set('granted');
      return true;
    } catch {
      if (this.isBrowser) this.pushPermission.set(Notification.permission);
      return false;
    }
  }

  async disablePush(): Promise<void> {
    const sub = await firstValueFrom(this.swPush.subscription);
    if (!sub) return;

    const client = this.supabase.getClient();
    const user = this.supabase.user();
    if (client && user) {
      await client
        .from('push_subscriptions')
        .delete()
        .eq('user_id', user.id)
        .eq('endpoint', sub.endpoint);
    }

    await this.swPush.unsubscribe();
    this.pushPermission.set('default');
  }
}
