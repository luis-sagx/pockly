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

  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'percent-of-y',
      label: 'X% of Y',
      path: '/percent-of-y',
      icon: 'percentage',
      description: 'Calculate what is X percent of a given number',
      category: 'Math',
    },
    {
      id: 'what-percent',
      label: 'X is what % of Y',
      path: '/what-percent',
      icon: 'percent',
      description: 'Find what percentage X represents of a total Y',
      category: 'Math',
    },
    {
      id: 'percentage-change',
      label: '% Change',
      path: '/percentage-change',
      icon: 'arrow-trend-up',
      description: 'Calculate the percentage increase or decrease between two values',
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
      id: 'length',
      label: 'Length',
      path: '/length-converter',
      icon: 'ruler',
      description: 'Convert between mm, cm, m, km, inches, feet, miles',
      category: 'Utilities',
    },
    {
      id: 'weight',
      label: 'Weight',
      path: '/weight-converter',
      icon: 'weight-scale',
      description: 'Convert between mg, g, kg, pounds, ounces, metric tons',
      category: 'Utilities',
    },
    {
      id: 'temperature',
      label: 'Temperature',
      path: '/temperature-converter',
      icon: 'thermometer-half',
      description: 'Convert between Celsius, Fahrenheit, and Kelvin',
      category: 'Utilities',
    },
    {
      id: 'volume',
      label: 'Volume',
      path: '/volume-converter',
      icon: 'flask',
      description: 'Convert between mL, L, fl oz, cups, pints, gallons',
      category: 'Utilities',
    },
    {
      id: 'speed',
      label: 'Speed',
      path: '/speed-converter',
      icon: 'gauge-high',
      description: 'Convert between m/s, km/h, mph, and knots',
      category: 'Utilities',
    },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    if (currentFilter === 'all') {
      return this.tools;
    }
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
