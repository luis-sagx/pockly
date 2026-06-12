import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, InjectionToken, PLATFORM_ID, inject, signal } from '@angular/core';

export type Language = 'en' | 'es';

/**
 * Injection token for app-specific translations.
 * Shape: { en: { key: value, ... }, es: { key: value, ... }, ... }
 */
export const POCKLY_TRANSLATIONS = new InjectionToken<Record<string, Record<string, string>>>(
  'POCKLY_TRANSLATIONS',
);

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

const STORAGE_KEY = 'pockly-language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translations = inject(POCKLY_TRANSLATIONS);
  private readonly _language = signal<Language>('en');
  private isBrowser: boolean;

  readonly language = this._language.asReadonly();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this._language.set(this.getInitialLanguage());
    }

    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, this._language());
      }
    });
  }

  private getInitialLanguage(): Language {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && this.translations[stored]) {
      return stored;
    }

    const browserLang = navigator.language.toLowerCase();
    for (const lang of Object.keys(this.translations)) {
      if (browserLang.startsWith(lang)) {
        return lang as Language;
      }
    }
    return 'en';
  }

  setLanguage(lang: Language): void {
    if (this.translations[lang]) {
      this._language.set(lang);
    }
  }

  toggleLanguage(): void {
    const next = this._language() === 'en' ? 'es' : 'en';
    if (this.translations[next]) {
      this._language.set(next);
    }
  }

  getLabel(lang: Language): string {
    const option = LANGUAGES.find((l) => l.code === lang);
    return option ? option.nativeName : lang;
  }

  getTranslations(): Record<string, string> {
    return this.translations[this._language()] || {};
  }

  getAvailableLanguages(): LanguageOption[] {
    // Only return languages that have translations configured
    return LANGUAGES.filter((l) => this.translations[l.code]);
  }

  getCurrentLanguage(): Language {
    return this._language();
  }
}
