import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { LanguageService } from '../../../services/language.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  filter = signal<string>('all');

  tools = computed(() => {
    const t = this.t();
    return [
      {
        id: 'percent-of-y',
        label: t.percentOfY,
        path: '/percent-of-y',
        icon: 'percentage',
        description: t.percentOfYDesc,
        category: 'math',
      },
      {
        id: 'what-percent',
        label: t.whatPercent,
        path: '/what-percent',
        icon: 'percent',
        description: t.whatPercentDesc,
        category: 'math',
      },
      {
        id: 'percentage-change',
        label: t.percentChange,
        path: '/percentage-change',
        icon: 'arrow-trend-up',
        description: t.percentChangeDesc,
        category: 'math',
      },
      {
        id: 'currency',
        label: t.currency,
        path: '/currency-converter',
        icon: 'money-bill-wave',
        description: t.currencyDesc,
        category: 'finance',
      },
      {
        id: 'length',
        label: t.length,
        path: '/length-converter',
        icon: 'ruler',
        description: t.lengthDesc,
        category: 'utilities',
      },
      {
        id: 'weight',
        label: t.weight,
        path: '/weight-converter',
        icon: 'weight-scale',
        description: t.weightDesc,
        category: 'utilities',
      },
      {
        id: 'temperature',
        label: t.temperature,
        path: '/temperature-converter',
        icon: 'thermometer-half',
        description: t.temperatureDesc,
        category: 'utilities',
      },
      {
        id: 'volume',
        label: t.volume,
        path: '/volume-converter',
        icon: 'flask',
        description: t.volumeDesc,
        category: 'utilities',
      },
      {
        id: 'speed',
        label: t.speed,
        path: '/speed-converter',
        icon: 'gauge-high',
        description: t.speedDesc,
        category: 'utilities',
      },
    ];
  });

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    const allTools = this.tools();
    if (currentFilter === 'all') {
      return allTools;
    }
    return allTools.filter((tool) => tool.category === currentFilter);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'Calculator Tools - Free Online Calculators',
      description: 'Free online calculators: percentage, currency, and unit converter.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}
