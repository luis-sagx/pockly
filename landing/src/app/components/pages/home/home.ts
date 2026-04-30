import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';

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
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  // Signal para el filtro actual
  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'wordcount',
      label: 'Word Counter',
      path: '/word-count',
      icon: 'fa-hashtag',
      description: 'Count words, characters, sentences and paragraphs in your text',
      category: 'Text',
    },
    {
      id: 'textcase',
      label: 'Text Case Converter',
      path: '/text-case',
      icon: 'fa-text-height',
      description: 'Convert text to uppercase, lowercase, title case or sentence case',
      category: 'Text',
    },
    {
      id: 'diff',
      label: 'Diff Checker',
      path: '/diff-checker',
      icon: 'fa-code-branch',
      description: 'Compare two texts and see exactly what changed between them',
      category: 'Compare',
    },
    {
      id: 'password',
      label: 'Password Generator',
      path: '/password-generator',
      icon: 'fa-key',
      description: 'Generate secure passwords with custom length and character options',
      category: 'Utilities',
    },
    {
      id: 'quicknotes',
      label: 'Quick Notes',
      path: '/quick-notes',
      icon: 'fa-pen-to-square',
      description: 'Write and auto-save notes instantly to your browser storage',
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
      text: 'Text',
      compare: 'Compare',
      utilities: 'Utilities',
    };
    return this.tools.filter((tool) => tool.category === categoryMap[currentFilter]);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'Pockly - Free Online Text Utilities',
      description:
        'Free online text tools: text case, word counter, diff checker, password generator, and quick notes.',
    });
  }
}