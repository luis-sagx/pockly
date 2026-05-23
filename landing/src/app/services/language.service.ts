import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  // Nav
  navHome: string;

  // Footer
  freeOnlineTools: string;
  languageLabel: string;

  // Home page
  heroTitle: string;
  heroSubtitle: string;
  filterAll: string;
  filterText: string;
  filterImage: string;
  filterJson: string;
  filterUrl: string;
  filterCalculator: string;
  pagesAvailable: string;

  // SEO
  seoTitle: string;
  seoDescription: string;
}

const translations: Record<Language, Translations> = {
  en: {
    navHome: 'Home',

    freeOnlineTools: 'Free online tools — no signup, no ads.',
    languageLabel: 'Language',

    heroTitle: 'All your tools in one place',
    heroSubtitle:
      'Open the full collection of text, image, JSON, URL and calculator tools from a single hub. Every card below takes you straight to the matching app.',
    filterAll: 'All',
    filterText: 'Text',
    filterImage: 'Image',
    filterJson: 'JSON',
    filterUrl: 'URL',
    filterCalculator: 'Calculator',
    pagesAvailable: 'pages available',

    seoTitle: 'Pockly - Free Online Tools for Daily Productivity',
    seoDescription:
      'Free online productivity tools: word counter, JSON generator, background remover, image resizer, format converter, text case tool, and more.',
  },
  es: {
    navHome: 'Inicio',

    freeOnlineTools: 'Herramientas online gratuitas — sin registro, sin anuncios.',
    languageLabel: 'Idioma',

    heroTitle: 'Todas tus herramientas en un solo lugar',
    heroSubtitle:
      'Abrí la colección completa de herramientas de texto, imagen, JSON, URL y calculadora desde un solo hub. Cada tarjeta te lleva directo a la app correspondiente.',
    filterAll: 'Todas',
    filterText: 'Texto',
    filterImage: 'Imagen',
    filterJson: 'JSON',
    filterUrl: 'URL',
    filterCalculator: 'Calculadora',
    pagesAvailable: 'páginas disponibles',

    seoTitle: 'Pockly - Herramientas online gratuitas para la productividad diaria',
    seoDescription:
      'Herramientas de productividad online gratuitas: contador de palabras, generador JSON, removedor de fondos, redimensionador de imágenes, convertidor de formato, conversor de texto, y más.',
  },
};

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

const STORAGE_KEY = 'pockly-language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
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
    if (stored && translations[stored]) {
      return stored;
    }

    const browserLang = navigator.language.toLowerCase();
    for (const lang of Object.keys(translations)) {
      if (browserLang.startsWith(lang)) {
        return lang as Language;
      }
    }
    return 'en';
  }

  setLanguage(lang: Language): void {
    if (translations[lang]) {
      this._language.set(lang);
    }
  }

  toggleLanguage(): void {
    this._language.update((current) => (current === 'en' ? 'es' : 'en'));
  }

  getLabel(lang: Language): string {
    const option = languages.find((l) => l.code === lang);
    return option ? option.nativeName : lang;
  }

  getTranslations(): Translations {
    return translations[this._language()];
  }

  getAvailableLanguages(): LanguageOption[] {
    return languages;
  }

  getCurrentLanguage(): Language {
    return this._language();
  }
}
