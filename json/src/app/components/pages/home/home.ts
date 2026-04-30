import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { IconComponent } from '../../ui/icon/icon';

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
  imports: [IconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  // Signal para el filtro actual
  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'generator',
      label: 'JSON Generator',
      path: '/generator',
      icon: 'wand',
      description: 'Build JSON objects interactively — no API needed',
      category: 'create',
    },
    {
      id: 'templates',
      label: 'JSON Templates',
      path: '/templates',
      icon: 'copy',
      description: 'Pre-built JSON structures for common use cases',
      category: 'create',
    },
    {
      id: 'convert',
      label: 'JSON Convert',
      path: '/convert',
      icon: 'shuffle',
      description: 'Convert between JSON, CSV, TSV, XML, and YAML formats',
      category: 'transform',
    },
    {
      id: 'utils',
      label: 'JSON Utils',
      path: '/utils',
      icon: 'settings',
      description: 'Format, minify, validate, diff and query JSON data',
      category: 'transform',
    },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    if (currentFilter === 'all') {
      return this.tools;
    }
    const categoryMap: Record<string, string> = {
      create: 'create',
      transform: 'transform',
    };
    return this.tools.filter((tool) => tool.category === categoryMap[currentFilter]);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'JSON Tools - Free Online JSON Utilities',
      description: 'Free online JSON tools: generator, templates, convert, and utils. No signup required.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }

  setFilter(category: string) {
    this.filter.set(category);
  }
}