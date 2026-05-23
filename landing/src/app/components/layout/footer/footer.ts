import { Component, computed, inject } from '@angular/core';
import { PROJECT_CATEGORIES } from '../../../config/projects';
import { Language, LanguageOption, LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private languageService = inject(LanguageService);

  categories = PROJECT_CATEGORIES;
  language = this.languageService.language;
  availableLanguages: LanguageOption[] = this.languageService.getAvailableLanguages();

  t = computed(() => this.languageService.getTranslations());

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value as Language;
    this.languageService.setLanguage(lang);
  }
}
