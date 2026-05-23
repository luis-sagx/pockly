import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  openDropdown = signal<string | null>(null);
  mobileMenuOpen = signal(false);
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  openDropdownMenu(name: string) {
    this.cancelCloseTimer();
    this.openDropdown.set(name);
  }

  scheduleClose() {
    this.closeTimer = setTimeout(() => this.openDropdown.set(null), 200);
  }

  cancelCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
