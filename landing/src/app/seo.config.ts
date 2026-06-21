import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://pockly.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const landingSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Pockly',
  pageConfigs: {
    '': {
      title: 'Pockly - Free Online Tools for Daily Productivity',
      description:
        'Free online tools for text, JSON, images, URLs, calculators, and personal productivity.',
      keywords: 'online tools, productivity tools, JSON tools, image tools, text tools',
      ogImage: OG_IMAGE,
      canonicalUrl: BASE_URL,
    },
    '404': {
      title: 'Not Found - Pockly',
      description: 'Page not found.',
      noindex: true,
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/404`,
    },
  },
};
