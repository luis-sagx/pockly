import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-auth', imports: [RouterLink], templateUrl: './auth.html', styleUrl: './auth.css' })
export class Auth {
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
}
