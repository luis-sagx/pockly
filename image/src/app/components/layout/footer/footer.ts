import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Language, LanguageOption, LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private faLib = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  language = this.languageService.language;
  availableLanguages: LanguageOption[] = this.languageService.getAvailableLanguages();

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  constructor() {
    this.faLib.addIcons(faLink);
  }

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value as Language;
    this.languageService.setLanguage(lang);
  }
}
