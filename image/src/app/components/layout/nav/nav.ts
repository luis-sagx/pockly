import { Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  private _isMenuOpen = signal(false);

  isMenuOpen = computed(() => this._isMenuOpen());

  toggleMenu(): void {
    this._isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this._isMenuOpen.set(false);
  }
}
