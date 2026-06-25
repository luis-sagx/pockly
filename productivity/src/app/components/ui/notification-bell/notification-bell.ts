import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.css',
})
export class NotificationBell {
  private notificationService = inject(NotificationService);

  count = this.notificationService.notificationCount;
  notifications = this.notificationService.inAppNotifications;
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('app-notification-bell')) this.close();
  }
}
