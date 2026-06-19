import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTableColumns, faFire, faNoteSticky, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

interface Tool { id: string; labelKey: keyof Translations; descKey: keyof Translations; category: string; path: string; icon: IconDefinition; }

@Component({ selector: 'app-home', standalone: true, imports: [FaIconComponent], templateUrl: './home.html', styleUrl: './home.css' })
export class Home {
  private languageService = inject(LanguageService);
  private router = inject(Router);
  readonly filter = signal('all');
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  readonly tools: Tool[] = [
    { id: 'board', labelKey: 'board', descKey: 'boardDesc', category: 'daily', path: '/board', icon: faTableColumns },
    { id: 'habits', labelKey: 'habits', descKey: 'habitsDesc', category: 'routines', path: '/habits', icon: faFire },
    { id: 'scratchpad', labelKey: 'scratchpad', descKey: 'scratchpadDesc', category: 'capture', path: '/scratchpad', icon: faNoteSticky },
  ];
  readonly filteredTools = computed(() => this.filter() === 'all' ? this.tools : this.tools.filter((tool) => tool.category === this.filter()));
  navigate(path: string): void { this.router.navigate([path]); }
}
