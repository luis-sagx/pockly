export interface NotificationPreferences {
  timezone: string;
  reminderTime: string;
  habitReminderOn: boolean;
  taskReminderOn: boolean;
  streakAlertOn: boolean;
  pushEnabled: boolean;
}

export const DEFAULT_PREFERENCES: NotificationPreferences = {
  timezone: typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC',
  reminderTime: '20:00',
  habitReminderOn: true,
  taskReminderOn: true,
  streakAlertOn: true,
  pushEnabled: true,
};

export interface InAppNotification {
  id: string;
  type: 'habit_reminder' | 'task_reminder' | 'streak_alert';
  message: string;
}
