import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, InjectionToken, PLATFORM_ID, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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

/**
 * Language is derived from the URL: routes under /es render Spanish, everything
 * else English. This keeps one indexable URL per language so search engines can
 * crawl both. localStorage only remembers the user's last explicit choice.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private translations = inject(POCKLY_TRANSLATIONS);
  private router = inject(Router);
  private readonly _language = signal<Language>('en');
  private isBrowser: boolean;

  readonly language = this._language.asReadonly();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    this._language.set(this.languageFromUrl(this.router.url));

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this._language.set(this.languageFromUrl(event.urlAfterRedirects));
      });

    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, this._language());
      }
    });
  }

  private languageFromUrl(url: string): Language {
    const path = url.split('?')[0];
    if (path === '/es' || path.startsWith('/es/')) return 'es';
    return 'en';
  }

  /** Returns the current URL translated to the given language. */
  private counterpartUrl(lang: Language): string {
    const [path, query] = this.router.url.split('?');
    const bare = path === '/es' || path.startsWith('/es/') ? path.slice(3) || '/' : path;
    const target = lang === 'es' ? (bare === '/' ? '/es' : `/es${bare}`) : bare;
    return query ? `${target}?${query}` : target;
  }

  setLanguage(lang: Language): void {
    if (!this.translations[lang] || lang === this._language()) return;
    this.router.navigateByUrl(this.counterpartUrl(lang));
  }

  toggleLanguage(): void {
    const next = this._language() === 'en' ? 'es' : 'en';
    this.setLanguage(next);
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
