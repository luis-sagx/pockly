import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faHashtag,
  faTextHeight,
  faCodeBranch,
  faKey,
  faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';

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
  private library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faHashtag, faTextHeight, faCodeBranch, faKey, faPenToSquare);
  }

  // Signal para el filtro actual
  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'wordcount',
      label: 'Word Counter',
      path: '/word-count',
      icon: 'hashtag',
      description: 'Count words, characters, sentences and paragraphs in your text',
      category: 'Text',
    },
    {
      id: 'textcase',
      label: 'Text Case Converter',
      path: '/text-case',
      icon: 'text-height',
      description: 'Convert text to uppercase, lowercase, title case or sentence case',
      category: 'Text',
    },
    {
      id: 'diff',
      label: 'Diff Checker',
      path: '/diff-checker',
      icon: 'code-branch',
      description: 'Compare two texts and see exactly what changed between them',
      category: 'Compare',
    },
    {
      id: 'password',
      label: 'Password Generator',
      path: '/password-generator',
      icon: 'key',
      description: 'Generate secure passwords with custom length and character options',
      category: 'Utilities',
    },
    {
      id: 'quicknotes',
      label: 'Quick Notes',
      path: '/quick-notes',
      icon: 'pen-to-square',
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
      title: 'Text Tools - Free Online Text Utilities',
      description:
        'Free online text tools: text case, word counter, diff checker, password generator, and quick notes.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}
