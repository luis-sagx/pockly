import { Component, computed, inject } from '@angular/core';
import { Language, LanguageOption, LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
})
export class FooterComponent {
  private languageService = inject(LanguageService);

  language = this.languageService.language;
  availableLanguages: LanguageOption[] = this.languageService.getAvailableLanguages();

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value as Language;
    this.languageService.setLanguage(lang);
  }
}
