import { Component, inject, signal, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faHashtag,
  faTextHeight,
  faCodeBranch,
  faKey,
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
export class Home {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);
  private router = inject(Router);

  constructor() {
    this.library.addIcons(faHashtag, faTextHeight, faCodeBranch, faKey);
  }

  // Signal para el filtro actual
  filter = signal<string>('all');

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

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
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    const translations = this.t();
    if (currentFilter === 'all') {
      return this.tools.map(tool => ({
        ...tool,
        label: translations[tool.labelKey as keyof Translations] as string,
        description: translations[tool.descriptionKey as keyof Translations] as string
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
        label: translations[tool.labelKey as keyof Translations] as string,
        description: translations[tool.descriptionKey as keyof Translations] as string
      }));
  });


  navigate(path: string) {
    this.router.navigate([path]);
  }
}
