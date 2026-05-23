import { Component, computed, inject } from '@angular/core';
import { PROJECT_CATEGORIES } from '../../../config/projects';
import {
  Language,
  LanguageOption,
  LanguageService,
  getCategoryTitleKey,
  getLinkLabelKey,
} from '../../../services/language.service';

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

  readonly translatedCategories = computed(() => {
    const translations = this.t();
    return this.categories.map((category) => ({
      ...category,
      title: translations[getCategoryTitleKey(category.key)],
      links: category.links.map((link) => ({
        ...link,
        label: translations[getLinkLabelKey(category.key, link.label)],
      })),
    }));
  });

  onLanguageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const lang = select.value as Language;
    this.languageService.setLanguage(lang);
  }
}
