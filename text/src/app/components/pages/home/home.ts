import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { LanguageService } from '../../../services/language.service';
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
  labelKey: keyof ReturnType<LanguageService['getTranslations']>;
  path: string;
  icon: string;
  descriptionKey: keyof ReturnType<LanguageService['getTranslations']>;
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
  private languageService = inject(LanguageService);

  constructor() {
    this.library.addIcons(faHashtag, faTextHeight, faCodeBranch, faKey, faPenToSquare);
  }

  // Signal para el filtro actual
  filter = signal<string>('all');

  t = computed(() => this.languageService.getTranslations());

  tools: Tool[] = [
    {
      id: 'wordcount',
      labelKey: 'wordCounter',
      path: '/word-count',
      icon: 'hashtag',
      descriptionKey: 'wordCounterDesc',
      category: 'Text',
    },
    {
      id: 'textcase',
      labelKey: 'textCaseConverter',
      path: '/text-case',
      icon: 'text-height',
      descriptionKey: 'textCaseConverterDesc',
      category: 'Text',
    },
    {
      id: 'diff',
      labelKey: 'diffChecker',
      path: '/diff-checker',
      icon: 'code-branch',
      descriptionKey: 'diffCheckerDesc',
      category: 'Compare',
    },
    {
      id: 'password',
      labelKey: 'passwordGenerator',
      path: '/password-generator',
      icon: 'key',
      descriptionKey: 'passwordGeneratorDesc',
      category: 'Utilities',
    },
    {
      id: 'quicknotes',
      labelKey: 'quickNotes',
      path: '/quick-notes',
      icon: 'pen-to-square',
      descriptionKey: 'quickNotesDesc',
      category: 'Utilities',
    },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    const translations = this.t();
    if (currentFilter === 'all') {
      return this.tools.map(tool => ({
        ...tool,
        label: translations[tool.labelKey] as string,
        description: translations[tool.descriptionKey] as string
      }));
    }
    // Map filter names to category names
    const categoryMap: Record<string, string> = {
      text: 'Text',
      compare: 'Compare',
      utilities: 'Utilities',
    };
    return this.tools
      .filter((tool) => tool.category === categoryMap[currentFilter])
      .map(tool => ({
        ...tool,
        label: translations[tool.labelKey] as string,
        description: translations[tool.descriptionKey] as string
      }));
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
