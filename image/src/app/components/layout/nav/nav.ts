import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  private _isMenuOpen = signal(false);

  isMenuOpen = computed(() => this._isMenuOpen());

  toggleMenu(): void {
    this._isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this._isMenuOpen.set(false);
  }
}
