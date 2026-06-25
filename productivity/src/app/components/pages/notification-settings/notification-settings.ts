import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationPreferences } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';
import { SupabaseService } from '../../../services/supabase.service';

const TIMEZONES: string[] = (Intl as any).supportedValuesOf?.('timeZone') ?? [];

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './notification-settings.html',
  styleUrl: './notification-settings.css',
})
export class NotificationSettings implements OnInit {
  private notificationService = inject(NotificationService);
  private supabase = inject(SupabaseService);

  isLoggedIn = this.supabase.isLoggedIn;
  pushPermission = this.notificationService.pushPermission;
  isSaving = signal(false);
  saveSuccess = signal(false);

  timezones = TIMEZONES;
  prefs: NotificationPreferences = { ...this.notificationService.preferences() };

  readonly toggleItems = [
    { key: 'habitReminderOn' as const, label: 'Daily habit reminder', desc: 'Reminds you to complete your habits' },
    { key: 'taskReminderOn' as const, label: 'Task reminder', desc: 'Alerts when you have tasks for today' },
    { key: 'streakAlertOn' as const, label: 'Streak at risk', desc: 'Warns when a streak is about to break' },
  ];

  ngOnInit() {
    this.prefs = { ...this.notificationService.preferences() };
  }

  togglePref(key: 'habitReminderOn' | 'taskReminderOn' | 'streakAlertOn' | 'pushEnabled') {
    this.prefs = { ...this.prefs, [key]: !this.prefs[key] };
  }

  async save() {
    this.isSaving.set(true);
    await this.notificationService.savePreferences({ ...this.prefs });
    this.isSaving.set(false);
    this.saveSuccess.set(true);
    setTimeout(() => this.saveSuccess.set(false), 2000);
  }

  async enablePush() {
    await this.notificationService.enablePush();
    this.prefs = { ...this.prefs, pushEnabled: this.pushPermission() === 'granted' };
  }

  async disablePush() {
    await this.notificationService.disablePush();
    this.prefs = { ...this.prefs, pushEnabled: false };
  }
}
