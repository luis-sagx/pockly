import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

interface Tool { id: string; labelKey: keyof Translations; descKey: keyof Translations; category: string; path: string; icon: string; }

@Component({ selector: 'app-home', templateUrl: './home.html', styleUrl: './home.css' })
export class Home {
  private languageService = inject(LanguageService);
  private router = inject(Router);
  readonly filter = signal('all');
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  readonly tools: Tool[] = [
    { id: 'board', labelKey: 'board', descKey: 'boardDesc', category: 'daily', path: '/board', icon: '▦' },
    { id: 'habits', labelKey: 'habits', descKey: 'habitsDesc', category: 'routines', path: '/habits', icon: '●' },
    { id: 'scratchpad', labelKey: 'scratchpad', descKey: 'scratchpadDesc', category: 'capture', path: '/scratchpad', icon: '✎' },
  ];
  readonly filteredTools = computed(() => this.filter() === 'all' ? this.tools : this.tools.filter((tool) => tool.category === this.filter()));
  navigate(path: string): void { this.router.navigate([path]); }
}
