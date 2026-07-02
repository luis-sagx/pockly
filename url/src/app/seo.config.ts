import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://url.pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const urlSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
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
  },
};
