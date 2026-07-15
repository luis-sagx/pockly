import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://url.pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const urlSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Pockly URL Tools',
  pageConfigs: {
  '': {
    title: 'URL Tools - Free Online URL Utilities',
    description:
      'Free online URL tools: QR code generator, URL encoder/decoder, UTM builder, and URL cleaner. No installation required.',
    keywords: 'url tools, qr code generator, url encoder, url decoder, utm builder, url cleaner',
    ogImage: OG_IMAGE,
    canonicalUrl: BASE_URL,
  },
  'qr-generator': {
    title: 'QR Code Generator - Create QR Codes Free Online',
    description:
      'Generate QR codes online. Custom colors, size, and error correction. Download as PNG. Free QR generator.',
    keywords: 'qr code generator, qr generator, create qr',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/qr-generator`,
  },
  'url-encoder': {
    title: 'URL Encoder - Encode Text for Safe URLs',
    description:
      'Encode text and URLs for safe use in query parameters. Works with special characters and non-ASCII text. Free online URL encoder.',
    keywords: 'url encoder, encode url, percent encoding, url encode',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/url-encoder`,
  },
  'url-decoder': {
    title: 'URL Decoder - Decode Percent-Encoded URLs',
    description:
      'Decode percent-encoded URLs and text back to readable form. Handles special characters and international text. Free online URL decoder.',
    keywords: 'url decoder, decode url, percent decode, url decode',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/url-decoder`,
  },
  'utm-builder': {
    title: 'UTM Builder - Create Campaign Tracking URLs',
    description:
      'Build campaign tracking URLs with UTM parameters for marketing. Add source, medium, campaign, term, and content. Free online UTM builder.',
    keywords: 'utm builder, utm parameters, campaign tracking, marketing urls, utm link',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utm-builder`,
  },
  'url-cleaner': {
    title: 'URL Cleaner - Remove Tracking & Normalize URLs',
    description:
      'Clean URLs by removing tracking parameters, sorting query params, and normalizing hostnames. Free online URL cleaner tool.',
    keywords: 'url cleaner, clean url, remove tracking, normalize url, url sanitizer',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/url-cleaner`,
  },
  '404': {
    title: 'Page Not Found - Pockly URL Tools',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  },
  // Spanish pages (/es/...)
  'es': {
    title: 'Herramientas de URL Online Gratis',
    description: 'Herramientas de URL online gratis: generador de códigos QR, codificador/decodificador de URL, generador UTM y limpiador de URLs.',
    keywords: 'herramientas url, generador qr, codificar url, generador utm, limpiar url',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es`,
  },
  'es/qr-generator': {
    title: 'Generador de Códigos QR Gratis Online',
    description: 'Genera códigos QR online. Colores, tamaño y corrección de errores personalizables. Descarga en PNG. Gratis.',
    keywords: 'generador de codigos qr, crear qr, codigo qr gratis',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/qr-generator`,
  },
  'es/url-encoder': {
    title: 'Codificador de URL Online - Codificar Texto',
    description: 'Codifica texto y URLs para usarlas de forma segura en parámetros. Compatible con caracteres especiales. Codificador de URL gratis.',
    keywords: 'codificar url, url encode, codificador de url',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/url-encoder`,
  },
  'es/url-decoder': {
    title: 'Decodificador de URL Online - Decodificar URLs',
    description: 'Decodifica URLs y texto codificado por porcentaje a forma legible. Compatible con caracteres internacionales. Gratis.',
    keywords: 'decodificar url, url decode, decodificador de url',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/url-decoder`,
  },
  'es/utm-builder': {
    title: 'Generador de URLs UTM - Seguimiento de Campañas',
    description: 'Crea URLs de seguimiento con parámetros UTM para marketing. Añade source, medium, campaign, term y content. Gratis.',
    keywords: 'generador utm, parametros utm, seguimiento de campañas',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/utm-builder`,
  },
  'es/url-cleaner': {
    title: 'Limpiador de URLs - Eliminar Parámetros de Rastreo',
    description: 'Limpia URLs eliminando parámetros de rastreo, ordenando la query y normalizando el dominio. Herramienta gratis.',
    keywords: 'limpiar url, eliminar rastreo, normalizar url',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/url-cleaner`,
  },
  'es/404': {
    title: 'Página No Encontrada - Pockly URL Tools',
    description: 'La página que buscas no existe.',
    noindex: true,
  },
  },
};
