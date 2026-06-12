import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, FaIconComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  mobileOpen = signal(false);
  percentOpen = signal(false);
  unitOpen = signal(false);

  private percentTimer: ReturnType<typeof setTimeout> | null = null;
  private unitTimer: ReturnType<typeof setTimeout> | null = null;

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }
  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  togglePercent(): void {
    this.clearPercentTimer();
    this.percentOpen.update((v) => !v);
    this.unitOpen.set(false);
  }

  openPercent(): void {
    this.clearPercentTimer();
    this.percentOpen.set(true);
  }
  scheduleClosePercent(): void {
    this.percentTimer = setTimeout(() => this.percentOpen.set(false), 200);
  }
  private clearPercentTimer(): void {
    if (this.percentTimer) {
      clearTimeout(this.percentTimer);
      this.percentTimer = null;
    }
  }

  toggleUnit(): void {
    this.clearUnitTimer();
    this.unitOpen.update((v) => !v);
    this.percentOpen.set(false);
  }

  openUnit(): void {
    this.clearUnitTimer();
    this.unitOpen.set(true);
  }
  scheduleCloseUnit(): void {
    this.unitTimer = setTimeout(() => this.unitOpen.set(false), 200);
  }
  private clearUnitTimer(): void {
    if (this.unitTimer) {
      clearTimeout(this.unitTimer);
      this.unitTimer = null;
    }
  }
}
