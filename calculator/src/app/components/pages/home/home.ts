import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface Tool {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  // Signal para el filtro actual
  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'percentage',
      label: 'Percentage',
      path: '/percentage-calculator',
      icon: 'percentage',
      description: 'Calculate percentages instantly with three modes',
      category: 'Math',
    },
    {
      id: 'currency',
      label: 'Currency',
      path: '/currency-converter',
      icon: 'money-bill-wave',
      description: 'Convert currencies using live exchange rates',
      category: 'Finance',
    },
    {
      id: 'unit',
      label: 'Unit Converter',
      path: '/unit-converter',
      icon: 'ruler',
      description: 'Length, weight, temperature, and more',
      category: 'Utilities',
    },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    if (currentFilter === 'all') {
      return this.tools;
    }
    // Map filter names to category names
    const categoryMap: Record<string, string> = {
      math: 'Math',
      finance: 'Finance',
      utilities: 'Utilities',
    };
    return this.tools.filter((tool) => tool.category === categoryMap[currentFilter]);
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