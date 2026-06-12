import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { LanguageService } from '../../../services/language.service';
import { IconComponent } from '../../ui/icon/icon';

interface Tool {
  id: string;
  path: string;
  icon: string;
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
  private languageService = inject(LanguageService);
  private router = inject(Router);

  filter = signal<string>('all');

  t = computed(() => this.languageService.getTranslations());

  tools: Tool[] = [
    // Create
    { id: 'generator', path: '/generator', icon: 'wand', category: 'create' },
    { id: 'templates', path: '/templates', icon: 'copy', category: 'create' },

    // Convert
    { id: 'csvToJson', path: '/convert/csv-to-json', icon: 'shuffle', category: 'convert' },
    { id: 'tsvToJson', path: '/convert/tsv-to-json', icon: 'shuffle', category: 'convert' },
    { id: 'jsonToCsv', path: '/convert/json-to-csv', icon: 'shuffle', category: 'convert' },
    { id: 'jsonToTsv', path: '/convert/json-to-tsv', icon: 'shuffle', category: 'convert' },
    { id: 'jsonToXml', path: '/convert/json-to-xml', icon: 'shuffle', category: 'convert' },
    { id: 'jsonToYaml', path: '/convert/json-to-yaml', icon: 'shuffle', category: 'convert' },

    // Utils
    { id: 'format', path: '/utils/format', icon: 'settings', category: 'utils' },
    { id: 'minify', path: '/utils/minify', icon: 'settings', category: 'utils' },
    { id: 'sortKeys', path: '/utils/sort', icon: 'settings', category: 'utils' },
    { id: 'validate', path: '/utils/validate', icon: 'settings', category: 'utils' },
    { id: 'flatten', path: '/utils/flatten', icon: 'settings', category: 'utils' },
    { id: 'unflatten', path: '/utils/unflatten', icon: 'settings', category: 'utils' },
    { id: 'diff', path: '/utils/diff', icon: 'settings', category: 'utils' },
    { id: 'query', path: '/utils/query', icon: 'settings', category: 'utils' },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    if (currentFilter === 'all') {
      return this.tools;
    }
    return this.tools.filter((tool) => tool.category === currentFilter);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'JSON Tools - Free Online JSON Utilities',
      description:
        'Free online JSON tools: generator, templates, converters (CSV, TSV, XML, YAML), and utilities (format, minify, validate, diff, query). No signup required.',
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  setFilter(category: string) {
    this.filter.set(category);
  }

  getToolLabel(toolId: string): string {
    const tr = this.t() as unknown as Record<string, string>;
    return tr[toolId] || toolId;
  }

  getToolDesc(toolId: string): string {
    const tr = this.t() as unknown as Record<string, string>;
    return tr[toolId + 'Desc'] || '';
  }
}
