import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-nav', imports: [RouterLink], templateUrl: './nav.html', styleUrl: './nav.css' })
export class Nav {
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  readonly open = signal(false);
  toggleMenu(): void { this.open.update((value) => !value); }
  closeMenu(): void { this.open.set(false); }
}
