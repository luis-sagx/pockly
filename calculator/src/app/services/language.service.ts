import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  // Nav
  navHome: string;
  navPercentage: string;
  navPercentOfY: string;
  navWhatPercent: string;
  navPercentChange: string;
  navCurrency: string;
  navUnitConverter: string;
  navLength: string;
  navWeight: string;
  navTemperature: string;
  navVolume: string;
  navSpeed: string;

  // Footer
  freeOnlineTools: string;
  languageLabel: string;

  // Home
  heroTitle: string;
  homeSubtitle: string;
  filterAll: string;
  filterMath: string;
  filterFinance: string;
  filterUtilities: string;

  // Tool labels for home cards
  percentOfY: string;
  percentOfYDesc: string;
  whatPercent: string;
  whatPercentDesc: string;
  percentChange: string;
  percentChangeDesc: string;
  currency: string;
  currencyDesc: string;
  length: string;
  lengthDesc: string;
  weight: string;
  weightDesc: string;
  temperature: string;
  temperatureDesc: string;
  volume: string;
  volumeDesc: string;
  speed: string;
  speedDesc: string;

  // Common calc page strings
  from: string;
  to: string;
  amount: string;
  result: string;
  decimalPrecision: string;

  // Percent of Y
  percentOfYTitle: string;
  percentageLabel: string;
  percentOfConnector: string;
  numberLabel: string;

  // What Percent
  whatPercentTitle: string;
  isWhatPercentOf: string;
  totalLabel: string;

  // Percentage Change
  percentChangeTitle: string;
  fromLabel: string;
  toLabel: string;
  toConnector: string;
  increase: string;
  decrease: string;
  noChange: string;

  // Currency Converter
  currencyTitle: string;
  ratesFrom: string;
  failedToLoadRates: string;

  // Unit Converter page titles
  lengthTitle: string;
  weightTitle: string;
  temperatureTitle: string;
  volumeTitle: string;
  speedTitle: string;

  // Unit Converter page descriptions (different from home card descriptions)
  lengthPageDesc: string;
  weightPageDesc: string;
  temperaturePageDesc: string;
  volumePageDesc: string;
  speedPageDesc: string;

  // Unit names (for select dropdowns)
  unit_mm: string;
  unit_cm: string;
  unit_m: string;
  unit_km: string;
  unit_in: string;
  unit_ft: string;
  unit_yd: string;
  unit_mi: string;
  unit_mg: string;
  unit_g: string;
  unit_kg: string;
  unit_lb: string;
  unit_oz: string;
  unit_ton: string;
  unit_celsius: string;
  unit_fahrenheit: string;
  unit_kelvin: string;
  unit_ml: string;
  unit_l: string;
  unit_floz: string;
  unit_cup: string;
  unit_pint: string;
  unit_gallon: string;
  unit_ms: string;
  unit_kmh: string;
  unit_mph: string;
  unit_knot: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Nav
    navHome: 'Home',
    navPercentage: 'Percentage',
    navPercentOfY: 'X% of Y',
    navWhatPercent: 'X is what % of Y',
    navPercentChange: '% Change',
    navCurrency: 'Currency',
    navUnitConverter: 'Unit Converter',
    navLength: 'Length',
    navWeight: 'Weight',
    navTemperature: 'Temperature',
    navVolume: 'Volume',
    navSpeed: 'Speed',

    // Footer
    freeOnlineTools: 'Free online tools — no signup, no ads.',
    languageLabel: 'Language',

    // Home
    heroTitle: 'Your calculators, all in one place',
    homeSubtitle:
      'Powerful and simple calculators to boost your productivity. Calculate percentages, convert currencies, and convert units. Completely free, no registration required.',
    filterAll: 'All Tools',
    filterMath: 'Math',
    filterFinance: 'Finance',
    filterUtilities: 'Utilities',

    // Tool labels for home cards
    percentOfY: 'X% of Y',
    percentOfYDesc: 'Calculate what is X percent of a given number',
    whatPercent: 'X is what % of Y',
    whatPercentDesc: 'Find what percentage X represents of a total Y',
    percentChange: '% Change',
    percentChangeDesc: 'Calculate the percentage increase or decrease between two values',
    currency: 'Currency',
    currencyDesc: 'Convert currencies using live exchange rates',
    length: 'Length',
    lengthDesc: 'Convert between mm, cm, m, km, inches, feet, miles',
    weight: 'Weight',
    weightDesc: 'Convert between mg, g, kg, pounds, ounces, metric tons',
    temperature: 'Temperature',
    temperatureDesc: 'Convert between Celsius, Fahrenheit, and Kelvin',
    volume: 'Volume',
    volumeDesc: 'Convert between mL, L, fl oz, cups, pints, gallons',
    speed: 'Speed',
    speedDesc: 'Convert between m/s, km/h, mph, and knots',

    // Common calc page strings
    from: 'From',
    to: 'To',
    amount: 'Amount',
    result: 'Result',
    decimalPrecision: 'Decimal precision:',

    // Percent of Y
    percentOfYTitle: 'X% of Y',
    percentageLabel: 'Percentage (%)',
    percentOfConnector: '% of',
    numberLabel: 'Number',

    // What Percent
    whatPercentTitle: 'X is what % of Y',
    isWhatPercentOf: 'is what % of',
    totalLabel: 'Total',

    // Percentage Change
    percentChangeTitle: '% Change',
    fromLabel: 'From',
    toLabel: 'To',
    toConnector: 'to',
    increase: 'increase',
    decrease: 'decrease',
    noChange: 'no change',

    // Currency Converter
    currencyTitle: 'Currency Converter',
    ratesFrom: 'Rates from:',
    failedToLoadRates: 'Failed to load exchange rates.',

    // Unit Converter page titles
    lengthTitle: 'Length Converter',
    weightTitle: 'Weight Converter',
    temperatureTitle: 'Temperature Converter',
    volumeTitle: 'Volume Converter',
    speedTitle: 'Speed Converter',

    // Unit Converter page descriptions
    lengthPageDesc:
      'Convert between millimeters, centimeters, meters, inches, feet, and more.',
    weightPageDesc:
      'Convert between milligrams, grams, kilograms, pounds, ounces, and metric tons.',
    temperaturePageDesc: 'Convert between Celsius, Fahrenheit, and Kelvin.',
    volumePageDesc:
      'Convert between milliliters, liters, fluid ounces, cups, pints, and gallons.',
    speedPageDesc:
      'Convert between meters per second, kilometers per hour, miles per hour, and knots.',

    // Unit names
    unit_mm: 'Millimeter',
    unit_cm: 'Centimeter',
    unit_m: 'Meter',
    unit_km: 'Kilometer',
    unit_in: 'Inch',
    unit_ft: 'Foot',
    unit_yd: 'Yard',
    unit_mi: 'Mile',
    unit_mg: 'Milligram',
    unit_g: 'Gram',
    unit_kg: 'Kilogram',
    unit_lb: 'Pound',
    unit_oz: 'Ounce',
    unit_ton: 'Metric Ton',
    unit_celsius: 'Celsius',
    unit_fahrenheit: 'Fahrenheit',
    unit_kelvin: 'Kelvin',
    unit_ml: 'Milliliter',
    unit_l: 'Liter',
    unit_floz: 'Fluid Ounce',
    unit_cup: 'Cup',
    unit_pint: 'Pint',
    unit_gallon: 'Gallon (US)',
    unit_ms: 'Meters/second',
    unit_kmh: 'Kilometers/hour',
    unit_mph: 'Miles/hour',
    unit_knot: 'Knot',
  },
  es: {
    // Nav
    navHome: 'Inicio',
    navPercentage: 'Porcentaje',
    navPercentOfY: 'X% de Y',
    navWhatPercent: 'X es qué % de Y',
    navPercentChange: '% Cambio',
    navCurrency: 'Divisas',
    navUnitConverter: 'Convertir unidades',
    navLength: 'Longitud',
    navWeight: 'Peso',
    navTemperature: 'Temperatura',
    navVolume: 'Volumen',
    navSpeed: 'Velocidad',

    // Footer
    freeOnlineTools: 'Herramientas online gratuitas — sin registro, sin anuncios.',
    languageLabel: 'Idioma',

    // Home
    heroTitle: 'Tus calculadoras, todo en un solo lugar',
    homeSubtitle:
      'Calculadoras potentes y simples para aumentar tu productividad. Calcula porcentajes, convierte divisas y convierte unidades. Completamente gratis, sin registro requerido.',
    filterAll: 'Todas',
    filterMath: 'Matemática',
    filterFinance: 'Finanzas',
    filterUtilities: 'Utilidades',

    // Tool labels for home cards
    percentOfY: 'X% de Y',
    percentOfYDesc: 'Calcula cuánto es el X por ciento de un número dado',
    whatPercent: 'X es qué % de Y',
    whatPercentDesc: 'Encuentra qué porcentaje representa X de un total Y',
    percentChange: '% Cambio',
    percentChangeDesc: 'Calcula el aumento o disminución porcentual entre dos valores',
    currency: 'Divisas',
    currencyDesc: 'Convierte divisas usando tasas de cambio en vivo',
    length: 'Longitud',
    lengthDesc: 'Convierte entre mm, cm, m, km, pulgadas, pies, millas',
    weight: 'Peso',
    weightDesc: 'Convierte entre mg, g, kg, libras, onzas, toneladas métricas',
    temperature: 'Temperatura',
    temperatureDesc: 'Convierte entre Celsius, Fahrenheit y Kelvin',
    volume: 'Volumen',
    volumeDesc: 'Convierte entre mL, L, onzas líquidas, tazas, pintas, galones',
    speed: 'Velocidad',
    speedDesc: 'Convierte entre m/s, km/h, mph y nudos',

    // Common calc page strings
    from: 'De',
    to: 'A',
    amount: 'Cantidad',
    result: 'Resultado',
    decimalPrecision: 'Precisión decimal:',

    // Percent of Y
    percentOfYTitle: 'X% de Y',
    percentageLabel: 'Porcentaje (%)',
    percentOfConnector: '% de',
    numberLabel: 'Número',

    // What Percent
    whatPercentTitle: 'X es qué % de Y',
    isWhatPercentOf: 'es qué % de',
    totalLabel: 'Total',

    // Percentage Change
    percentChangeTitle: '% Cambio',
    fromLabel: 'De',
    toLabel: 'A',
    toConnector: 'a',
    increase: 'aumento',
    decrease: 'disminución',
    noChange: 'sin cambio',

    // Currency Converter
    currencyTitle: 'Conversor de divisas',
    ratesFrom: 'Tasas del:',
    failedToLoadRates: 'Error al cargar las tasas de cambio.',

    // Unit Converter page titles
    lengthTitle: 'Conversor de longitud',
    weightTitle: 'Conversor de peso',
    temperatureTitle: 'Conversor de temperatura',
    volumeTitle: 'Conversor de volumen',
    speedTitle: 'Conversor de velocidad',

    // Unit Converter page descriptions
    lengthPageDesc:
      'Convierte entre milímetros, centímetros, metros, pulgadas, pies y más.',
    weightPageDesc:
      'Convierte entre miligramos, gramos, kilogramos, libras, onzas y toneladas métricas.',
    temperaturePageDesc: 'Convierte entre Celsius, Fahrenheit y Kelvin.',
    volumePageDesc:
      'Convierte entre mililitros, litros, onzas líquidas, tazas, pintas y galones.',
    speedPageDesc:
      'Convierte entre metros por segundo, kilómetros por hora, millas por hora y nudos.',

    // Unit names
    unit_mm: 'Milímetro',
    unit_cm: 'Centímetro',
    unit_m: 'Metro',
    unit_km: 'Kilómetro',
    unit_in: 'Pulgada',
    unit_ft: 'Pie',
    unit_yd: 'Yarda',
    unit_mi: 'Milla',
    unit_mg: 'Miligramo',
    unit_g: 'Gramo',
    unit_kg: 'Kilogramo',
    unit_lb: 'Libra',
    unit_oz: 'Onza',
    unit_ton: 'Tonelada métrica',
    unit_celsius: 'Celsius',
    unit_fahrenheit: 'Fahrenheit',
    unit_kelvin: 'Kelvin',
    unit_ml: 'Mililitro',
    unit_l: 'Litro',
    unit_floz: 'Onza líquida',
    unit_cup: 'Taza',
    unit_pint: 'Pinta',
    unit_gallon: 'Galón (EE.UU.)',
    unit_ms: 'Metros/segundo',
    unit_kmh: 'Kilómetros/hora',
    unit_mph: 'Millas/hora',
    unit_knot: 'Nudo',
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
