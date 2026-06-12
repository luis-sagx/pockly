import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://calculator.pockly.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const calculatorSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
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
  },
};
