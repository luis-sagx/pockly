import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { PROJECT_CATEGORIES, type ProjectCategory } from '../../../config/projects';
import { SeoService } from '../../../services/seo.service';
import {
  LanguageService,
  getCategoryTitleKey,
  getLinkLabelKey,
  getLinkDescriptionKey,
} from '../../../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private seo = inject(SeoService);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  private readonly featuredCategoryKeys = ['text', 'image', 'json', 'url', 'calculator'] as const;

  readonly filter = signal<'all' | 'text' | 'image' | 'json' | 'url' | 'calculator'>('all');

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
    const t = this.languageService.getTranslations();
    return [
      { label: t.filterAll, value: 'all' as const },
      { label: t.filterText, value: 'text' as const },
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

  readonly categoryIcons: Record<string, string> = {
    text: 'fa-font',
    image: 'fa-image',
    json: 'fa-code',
    url: 'fa-link',
    calculator: 'fa-calculator',
  };

  getCategoryIcon(key: string): string {
    return this.categoryIcons[key] ?? 'fa-layer-group';
  }

  ngOnInit() {
    const t = this.languageService.getTranslations();
    this.seo.setMeta({
      title: t.seoTitle,
      description: t.seoDescription,
    });
  }
}
