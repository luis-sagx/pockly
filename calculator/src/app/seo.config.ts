import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://calculator.pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const calculatorSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Pockly Calculator Tools',
  pageConfigs: {
  '': {
    title: 'Calculator Tools - Free Online Calculators',
    description:
      'Free online calculators: percentage, currency converter, unit converters (length, weight, temperature, volume, speed). No installation required.',
    keywords: 'online calculators, percentage calculator, currency converter, unit converter',
    ogImage: OG_IMAGE,
    canonicalUrl: BASE_URL,
  },
  'percent-of-y': {
    title: 'Percent of Y Calculator - Find Percentage Online',
    description:
      'Calculate what a percentage of a number is. Free online percentage calculator.',
    keywords: 'percentage calculator, percent of, percent calculator',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/percent-of-y`,
  },
  'what-percent': {
    title: 'What Percent Calculator - Percentage Online',
    description:
      'Calculate what percentage one number is of another. Free online what percent calculator.',
    keywords: 'what percent, percent calculator, percentage',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/what-percent`,
  },
  'percentage-change': {
    title: 'Percentage Change Calculator - Increase Decrease Online',
    description:
      'Calculate percentage increase or decrease between two values. Free online percentage change calculator.',
    keywords: 'percentage change, percent change, increase decrease',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/percentage-change`,
  },
  'currency-converter': {
    title: 'Currency Converter - Live Exchange Rates Online',
    description:
      'Convert between currencies with live exchange rates. Free online currency converter.',
    keywords: 'currency converter, exchange rates, currency calculator',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/currency-converter`,
  },
  'length-converter': {
    title: 'Length Converter - Convert Length Units Online',
    description:
      'Convert between meters, kilometers, miles, feet, inches, and more. Free online length converter.',
    keywords: 'length converter, distance converter, unit converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/length-converter`,
  },
  'weight-converter': {
    title: 'Weight Converter - Convert Weight Units Online',
    description:
      'Convert between kilograms, pounds, ounces, grams, and more. Free online weight converter.',
    keywords: 'weight converter, mass converter, kilogram to pound',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/weight-converter`,
  },
  'temperature-converter': {
    title: 'Temperature Converter - Celsius Fahrenheit Kelvin Online',
    description:
      'Convert between Celsius, Fahrenheit, and Kelvin. Free online temperature converter.',
    keywords: 'temperature converter, celsius to fahrenheit, kelvin',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/temperature-converter`,
  },
  'volume-converter': {
    title: 'Volume Converter - Convert Volume Units Online',
    description:
      'Convert between liters, gallons, milliliters, cups, and more. Free online volume converter.',
    keywords: 'volume converter, liter to gallon, volume conversion',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/volume-converter`,
  },
  'speed-converter': {
    title: 'Speed Converter - Convert Speed Units Online',
    description:
      'Convert between mph, km/h, m/s, knots, and more. Free online speed converter.',
    keywords: 'speed converter, mph to kmh, speed conversion',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/speed-converter`,
  },
  '404': {
    title: 'Page Not Found - Pockly Calculator Tools',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  },
  // Spanish pages (/es/...)
  'es': {
    title: 'Calculadoras Online Gratis - Porcentajes, Divisas y Unidades',
    description: 'Calculadoras online gratis: porcentajes, conversor de divisas y conversores de unidades (longitud, peso, temperatura, volumen, velocidad). Sin instalación.',
    keywords: 'calculadoras online, calculadora de porcentaje, conversor de divisas, conversor de unidades',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es`,
  },
  'es/percent-of-y': {
    title: 'Calculadora de Porcentaje - Porcentaje de un Número',
    description: 'Calcula cuánto es un porcentaje de un número. Calculadora de porcentajes online gratis.',
    keywords: 'calculadora de porcentaje, porcentaje de un numero, calcular porcentaje',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/percent-of-y`,
  },
  'es/what-percent': {
    title: 'Qué Porcentaje es X de Y - Calculadora Online',
    description: 'Calcula qué porcentaje representa un número respecto a otro. Calculadora online gratis.',
    keywords: 'que porcentaje es, calculadora de porcentaje, porcentajes',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/what-percent`,
  },
  'es/percentage-change': {
    title: 'Calculadora de Cambio Porcentual - Aumento y Disminución',
    description: 'Calcula el aumento o disminución porcentual entre dos valores. Calculadora de variación porcentual gratis.',
    keywords: 'cambio porcentual, variacion porcentual, aumento disminucion',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/percentage-change`,
  },
  'es/currency-converter': {
    title: 'Conversor de Divisas - Tipos de Cambio en Tiempo Real',
    description: 'Convierte entre monedas con tipos de cambio actualizados. Conversor de divisas online gratis.',
    keywords: 'conversor de divisas, tipo de cambio, convertir monedas',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/currency-converter`,
  },
  'es/length-converter': {
    title: 'Conversor de Longitud - Convertir Unidades Online',
    description: 'Convierte entre metros, kilómetros, millas, pies, pulgadas y más. Conversor de longitud online gratis.',
    keywords: 'conversor de longitud, convertir distancias, conversor de unidades',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/length-converter`,
  },
  'es/weight-converter': {
    title: 'Conversor de Peso - Kilos, Libras, Onzas Online',
    description: 'Convierte entre kilogramos, libras, onzas, gramos y más. Conversor de peso online gratis.',
    keywords: 'conversor de peso, kilos a libras, convertir peso',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/weight-converter`,
  },
  'es/temperature-converter': {
    title: 'Conversor de Temperatura - Celsius Fahrenheit Kelvin',
    description: 'Convierte entre Celsius, Fahrenheit y Kelvin. Conversor de temperatura online gratis.',
    keywords: 'conversor de temperatura, celsius a fahrenheit, kelvin',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/temperature-converter`,
  },
  'es/volume-converter': {
    title: 'Conversor de Volumen - Litros, Galones, Tazas Online',
    description: 'Convierte entre litros, galones, mililitros, tazas y más. Conversor de volumen online gratis.',
    keywords: 'conversor de volumen, litros a galones, convertir volumen',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/volume-converter`,
  },
  'es/speed-converter': {
    title: 'Conversor de Velocidad - km/h, mph, Nudos Online',
    description: 'Convierte entre km/h, mph, m/s, nudos y más. Conversor de velocidad online gratis.',
    keywords: 'conversor de velocidad, mph a kmh, convertir velocidad',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/speed-converter`,
  },
  'es/404': {
    title: 'Página No Encontrada - Pockly Calculator Tools',
    description: 'La página que buscas no existe.',
    noindex: true,
  },
  },
};
