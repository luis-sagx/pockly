import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  // Nav
  navHome: string;
  navQrGenerator: string;
  navUrlEncoder: string;
  navUrlDecoder: string;
  navUtmBuilder: string;
  navUrlCleaner: string;

  // Footer
  freeOnlineTools: string;
  languageLabel: string;

  // Home page
  heroTitle: string;
  homeSubtitle: string;
  filterAll: string;
  filterUtilities: string;
  filterUrlTools: string;

  // Tool labels
  qrGenerator: string;
  qrGeneratorDesc: string;
  urlEncoder: string;
  urlEncoderDesc: string;
  urlDecoder: string;
  urlDecoderDesc: string;
  utmBuilder: string;
  utmBuilderDesc: string;
  urlCleaner: string;
  urlCleanerDesc: string;

  // Common
  copy: string;
  copied: string;
  download: string;
  clear: string;
  error: string;
  generate: string;
  encode: string;
  decode: string;
  build: string;
  clean: string;

  // QR Generator
  size: string;
  color: string;
  content: string;
  enterTextOrUrl: string;
  downloadPng: string;
  qrError: string;
  smallSize: string;
  mediumSize: string;
  largeSize: string;

  // URL Encoder
  textToEncode: string;
  enterTextToEncode: string;
  encodeError: string;

  // URL Decoder
  textToDecode: string;
  enterTextToDecode: string;
  decodeError: string;
  invalidEncodedSeq: string;

  // UTM Builder
  baseUrl: string;
  invalidUrl: string;
  autoFilledUtm: string;
  optional: string;
  clearAll: string;
  builtUrl: string;
  fillUtmMessage: string;

  // URL Cleaner
  enterUrlToClean: string;
  cleanUrl: string;
  whatThisDoes: string;
  removesTracking: string;
  sortsQueryParams: string;
  lowercasesHostname: string;
  addsProtocol: string;
  removedParams: string;
  pleaseEnterUrl: string;
  pleaseEnterValidUrl: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Nav
    navHome: 'Home',
    navQrGenerator: 'QR Generator',
    navUrlEncoder: 'URL Encoder',
    navUrlDecoder: 'URL Decoder',
    navUtmBuilder: 'UTM Builder',
    navUrlCleaner: 'URL Cleaner',

    // Footer
    freeOnlineTools: 'Free online tools — no signup, no ads.',
    languageLabel: 'Language',

    // Home page
    heroTitle: 'Your URL tools, all in one place',
    homeSubtitle:
      'Powerful and simple URL utilities to boost your productivity. Generate QR codes, encode URLs, build UTM links, and more. Completely free, no registration required.',
    filterAll: 'All Tools',
    filterUtilities: 'Utilities',
    filterUrlTools: 'URL Tools',

    // Tool labels
    qrGenerator: 'QR Generator',
    qrGeneratorDesc: 'Generate QR codes from text and URLs.',
    urlEncoder: 'URL Encoder',
    urlEncoderDesc: 'Encode text and URLs into safe format for query parameters and paths.',
    urlDecoder: 'URL Decoder',
    urlDecoderDesc: 'Decode percent-encoded URLs and text back to their original form.',
    utmBuilder: 'UTM Builder',
    utmBuilderDesc: 'Build tracking URLs with UTM parameters for your marketing campaigns.',
    urlCleaner: 'URL Cleaner / Normalizer',
    urlCleanerDesc:
      'Remove tracking parameters, sort query params, and normalize URLs in one click.',

    // Common
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download',
    clear: 'Clear',
    error: 'Error',
    generate: 'Generate',
    encode: 'Encode',
    decode: 'Decode',
    build: 'Build',
    clean: 'Clean',

    // QR Generator
    size: 'Size',
    color: 'Color',
    content: 'Content',
    enterTextOrUrl: 'Enter text or URL...',
    downloadPng: 'Download PNG',
    qrError: 'Failed to generate QR code',
    smallSize: 'Small (128px)',
    mediumSize: 'Medium (256px)',
    largeSize: 'Large (512px)',

    // URL Encoder
    textToEncode: 'Text to encode',
    enterTextToEncode: 'Enter text or URL to encode...',
    encodeError: 'Please enter text to encode',

    // URL Decoder
    textToDecode: 'Text to decode',
    enterTextToDecode: 'Enter encoded text or URL...',
    decodeError: 'Please enter text to decode',
    invalidEncodedSeq: 'Failed to decode. The input may contain invalid encoded sequences.',

    // UTM Builder
    baseUrl: 'Base URL',
    invalidUrl: 'Please enter a valid URL',
    autoFilledUtm: 'Auto-filled',
    optional: '(optional)',
    clearAll: 'Clear All',
    builtUrl: 'Built URL:',
    fillUtmMessage: 'Fill in at least one UTM parameter to build the URL',

    // URL Cleaner
    enterUrlToClean: 'Enter URL to clean',
    cleanUrl: 'Clean URL',
    whatThisDoes: 'What this does:',
    removesTracking: 'Removes tracking parameters (utm_*, fbclid, gclid, etc.)',
    sortsQueryParams: 'Sorts remaining query parameters alphabetically',
    lowercasesHostname: 'Lowercases the hostname',
    addsProtocol: 'Adds https:// if missing',
    removedParams: 'Removed params:',
    pleaseEnterUrl: 'Please enter a URL',
    pleaseEnterValidUrl: 'Please enter a valid URL',
  },
  es: {
    // Nav
    navHome: 'Inicio',
    navQrGenerator: 'Generador QR',
    navUrlEncoder: 'Codificar URL',
    navUrlDecoder: 'Decodificar URL',
    navUtmBuilder: 'Creador UTM',
    navUrlCleaner: 'Limpiar URL',

    // Footer
    freeOnlineTools: 'Herramientas online gratuitas — sin registro, sin anuncios.',
    languageLabel: 'Idioma',

    // Home page
    heroTitle: 'Tus herramientas de URL, todo en un solo lugar',
    homeSubtitle:
      'Utilidades de URL potentes y simples para aumentar tu productividad. Genera códigos QR, codifica URLs, crea enlaces UTM y más. Completamente gratis, sin registro requerido.',
    filterAll: 'Todas',
    filterUtilities: 'Utilidades',
    filterUrlTools: 'URL',

    // Tool labels
    qrGenerator: 'Generador QR',
    qrGeneratorDesc: 'Genera códigos QR a partir de texto y URLs.',
    urlEncoder: 'Codificador URL',
    urlEncoderDesc: 'Codifica texto y URLs en formato seguro para parámetros y rutas.',
    urlDecoder: 'Decodificador URL',
    urlDecoderDesc: 'Decodifica URLs y texto con codificación porcentual a su forma original.',
    utmBuilder: 'Creador UTM',
    utmBuilderDesc: 'Crea URLs de seguimiento con parámetros UTM para tus campañas de marketing.',
    urlCleaner: 'Limpiador / Normalizador de URL',
    urlCleanerDesc:
      'Elimina parámetros de rastreo, ordena parámetros de consulta y normaliza URLs en un clic.',

    // Common
    copy: 'Copiar',
    copied: 'Copiado',
    download: 'Descargar',
    clear: 'Limpiar',
    error: 'Error',
    generate: 'Generar',
    encode: 'Codificar',
    decode: 'Decodificar',
    build: 'Crear',
    clean: 'Limpiar',

    // QR Generator
    size: 'Tamaño',
    color: 'Color',
    content: 'Contenido',
    enterTextOrUrl: 'Ingresá texto o URL...',
    downloadPng: 'Descargar PNG',
    qrError: 'Error al generar el código QR',
    smallSize: 'Chico (128px)',
    mediumSize: 'Mediano (256px)',
    largeSize: 'Grande (512px)',

    // URL Encoder
    textToEncode: 'Texto a codificar',
    enterTextToEncode: 'Ingresá texto o URL para codificar...',
    encodeError: 'Ingresá texto para codificar',

    // URL Decoder
    textToDecode: 'Texto a decodificar',
    enterTextToDecode: 'Ingresá texto o URL codificado...',
    decodeError: 'Ingresá texto para decodificar',
    invalidEncodedSeq: 'Error al decodificar. La entrada puede contener secuencias inválidas.',

    // UTM Builder
    baseUrl: 'URL base',
    invalidUrl: 'Ingresá una URL válida',
    autoFilledUtm: 'Auto-completado',
    optional: '(opcional)',
    clearAll: 'Limpiar todo',
    builtUrl: 'URL creada:',
    fillUtmMessage: 'Completá al menos un parámetro UTM para crear la URL',

    // URL Cleaner
    enterUrlToClean: 'Ingresá URL para limpiar',
    cleanUrl: 'Limpiar URL',
    whatThisDoes: 'Qué hace esta herramienta:',
    removesTracking: 'Elimina parámetros de rastreo (utm_*, fbclid, gclid, etc.)',
    sortsQueryParams: 'Ordena los parámetros restantes alfabéticamente',
    lowercasesHostname: 'Convierte el hostname a minúsculas',
    addsProtocol: 'Agrega https:// si falta',
    removedParams: 'Parámetros eliminados:',
    pleaseEnterUrl: 'Ingresá una URL',
    pleaseEnterValidUrl: 'Ingresá una URL válida',
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
