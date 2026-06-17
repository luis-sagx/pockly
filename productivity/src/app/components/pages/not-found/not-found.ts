import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-not-found', imports: [RouterLink], templateUrl: './not-found.html', styleUrl: './not-found.css' })
export class NotFound {
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
}
