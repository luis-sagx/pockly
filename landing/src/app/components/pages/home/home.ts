import { Component, computed, inject, signal } from '@angular/core';
import { PROJECT_CATEGORIES, type ProjectCategory } from '../../../config/projects';
import { LanguageService } from '@pockly/shared';
import {
  getCategoryTitleKey,
  getLinkLabelKey,
  getLinkDescriptionKey,
} from '../../../translations-helpers';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styles: [
    `
      details > summary {
        list-style: none;
      }
      details > summary::-webkit-details-marker {
        display: none;
      }
      .tc-plus {
        transition: transform 0.2s ease;
      }
      details[open] > summary .tc-plus {
        transform: rotate(45deg);
      }
    `,
  ],
})
export class Home {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  private readonly featuredCategoryKeys = ['text', 'productivity', 'image', 'json', 'url', 'calculator'] as const;

  readonly filter = signal<'all' | 'text' | 'productivity' | 'image' | 'json' | 'url' | 'calculator'>('all');

  readonly featuredCategories: ProjectCategory[] = this.featuredCategoryKeys
    .map((key) => PROJECT_CATEGORIES.find((category) => category.key === key))
    .filter((category): category is ProjectCategory => category !== undefined);

  readonly translatedCategories = computed(() => {
    const translations = this.t();
    return this.featuredCategories.map((category) => ({
      ...category,
      title: translations[getCategoryTitleKey(category.key)],
      links: category.links.map((link) => ({
        ...link,
        label: translations[getLinkLabelKey(category.key, link.label)],
        description: translations[getLinkDescriptionKey(category.key, link.label)],
      })),
    }));
  });

  readonly filterOptions = computed(() => {
    const t = this.languageService.getTranslations() as unknown as Translations;
    return [
      { label: t.filterAll, value: 'all' as const },
      { label: t.filterText, value: 'text' as const },
      { label: t.filterProductivity, value: 'productivity' as const },
      { label: t.filterImage, value: 'image' as const },
      { label: t.filterJson, value: 'json' as const },
      { label: t.filterUrl, value: 'url' as const },
      { label: t.filterCalculator, value: 'calculator' as const },
    ];
  });

  readonly filteredCategories = computed(() => {
    const currentFilter = this.filter();

    if (currentFilter === 'all') {
      return this.translatedCategories();
    }

    return this.translatedCategories().filter((category) => category.key === currentFilter);
  });

  readonly faq = computed(() => {
    const t = this.t();
    return [
      { q: t.homeFaqQ1, a: t.homeFaqA1 },
      { q: t.homeFaqQ2, a: t.homeFaqA2 },
      { q: t.homeFaqQ3, a: t.homeFaqA3 },
      { q: t.homeFaqQ4, a: t.homeFaqA4 },
    ];
  });

  readonly categoryIconPaths: Record<string, string> = {
    text: 'M4 7V4h16v3M9 20h6M12 4v16',
    productivity: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2M8 15l2 2 4-5',
    image: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2M8.5 8.5h.01M21 15l-5-5L5 21',
    json: 'M8 16l-4-4 4-4M16 8l4 4-4 4M14 4l-4 16',
    url: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
    calculator: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01',
  };

  getCategoryIcon(key: string): string {
    return (
      this.categoryIconPaths[key] ??
      'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6M8 8h8M8 12h8M8 16h5'
    );
  }

}
