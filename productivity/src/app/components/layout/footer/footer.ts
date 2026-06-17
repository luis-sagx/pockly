import { Component, computed, inject } from '@angular/core';
import { Language, LanguageOption, LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-footer', templateUrl: './footer.html', styleUrl: './footer.css' })
export class Footer {
  private languageService = inject(LanguageService);
  readonly language = this.languageService.language;
  readonly availableLanguages: LanguageOption[] = this.languageService.getAvailableLanguages();
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  onLanguageChange(event: Event): void { this.languageService.setLanguage((event.target as HTMLSelectElement).value as Language); }
}
