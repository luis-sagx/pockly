import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private languageService = inject(LanguageService);

  openDropdown = signal<string | null>(null);
  mobileMenuOpen = signal(false);
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  t = computed(() => this.languageService.getTranslations());

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
