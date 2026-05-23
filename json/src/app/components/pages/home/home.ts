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

  filter = signal<string>('all');

  tools: Tool[] = [
    // Create
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

    // Convert
    {
      id: 'csv2json',
      label: 'CSV → JSON',
      path: '/convert/csv-to-json',
      icon: 'shuffle',
      description: 'Convert CSV data to JSON format',
      category: 'convert',
    },
    {
      id: 'tsv2json',
      label: 'TSV → JSON',
      path: '/convert/tsv-to-json',
      icon: 'shuffle',
      description: 'Convert TSV (tab-separated) data to JSON',
      category: 'convert',
    },
    {
      id: 'json2csv',
      label: 'JSON → CSV',
      path: '/convert/json-to-csv',
      icon: 'shuffle',
      description: 'Convert JSON array to CSV format',
      category: 'convert',
    },
    {
      id: 'json2tsv',
      label: 'JSON → TSV',
      path: '/convert/json-to-tsv',
      icon: 'shuffle',
      description: 'Convert JSON array to TSV format',
      category: 'convert',
    },
    {
      id: 'json2xml',
      label: 'JSON → XML',
      path: '/convert/json-to-xml',
      icon: 'shuffle',
      description: 'Convert JSON to XML format',
      category: 'convert',
    },
    {
      id: 'json2yaml',
      label: 'JSON → YAML',
      path: '/convert/json-to-yaml',
      icon: 'shuffle',
      description: 'Convert JSON to YAML format',
      category: 'convert',
    },

    // Utils
    {
      id: 'format',
      label: 'Format JSON',
      path: '/utils/format',
      icon: 'settings',
      description: 'Pretty print with indentation',
      category: 'utils',
    },
    {
      id: 'minify',
      label: 'Minify JSON',
      path: '/utils/minify',
      icon: 'settings',
      description: 'Remove whitespace from JSON',
      category: 'utils',
    },
    {
      id: 'sort',
      label: 'Sort JSON Keys',
      path: '/utils/sort',
      icon: 'settings',
      description: 'Sort object keys alphabetically',
      category: 'utils',
    },
    {
      id: 'validate',
      label: 'Validate JSON',
      path: '/utils/validate',
      icon: 'settings',
      description: 'Check if valid JSON',
      category: 'utils',
    },
    {
      id: 'flatten',
      label: 'Flatten JSON',
      path: '/utils/flatten',
      icon: 'settings',
      description: 'Convert nested to flat (key.subkey)',
      category: 'utils',
    },
    {
      id: 'unflatten',
      label: 'Unflatten JSON',
      path: '/utils/unflatten',
      icon: 'settings',
      description: 'Convert flat to nested object',
      category: 'utils',
    },
    {
      id: 'diff',
      label: 'JSON Diff',
      path: '/utils/diff',
      icon: 'settings',
      description: 'Compare two JSON objects',
      category: 'utils',
    },
    {
      id: 'query',
      label: 'JSON Query',
      path: '/utils/query',
      icon: 'settings',
      description: 'Extract values with JSONPath',
      category: 'utils',
    },
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
    window.location.href = path;
  }

  setFilter(category: string) {
    this.filter.set(category);
  }
}
