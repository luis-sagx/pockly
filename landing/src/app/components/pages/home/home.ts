import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { PROJECT_CATEGORIES, type ProjectCategory } from '../../../config/projects';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  private readonly featuredCategoryKeys = ['text', 'image', 'json', 'url', 'calculator'] as const;

  readonly filter = signal<'all' | 'text' | 'image' | 'json' | 'url' | 'calculator'>('all');

  readonly featuredCategories: ProjectCategory[] = this.featuredCategoryKeys
    .map((key) => PROJECT_CATEGORIES.find((category) => category.key === key))
    .filter((category): category is ProjectCategory => category !== undefined);

  readonly filterOptions = [
    { label: 'All', value: 'all' as const },
    { label: 'Text', value: 'text' as const },
    { label: 'Image', value: 'image' as const },
    { label: 'JSON', value: 'json' as const },
    { label: 'URL', value: 'url' as const },
    { label: 'Calculator', value: 'calculator' as const },
  ];

  readonly filteredCategories = computed(() => {
    const currentFilter = this.filter();

    if (currentFilter === 'all') {
      return this.featuredCategories;
    }

    return this.featuredCategories.filter((category) => category.key === currentFilter);
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
    this.seo.setMeta({
      title: 'Pockly - Tools Hub',
      description: 'Launch text, image, JSON, URL and calculator tools from one place.',
    });
  }
}