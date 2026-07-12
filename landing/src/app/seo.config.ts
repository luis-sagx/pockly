import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const landingSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  pageConfigs: {
    '': {
      title: 'Pockly - Free Online Tools for Daily Productivity',
      description:
        'Free online tools for text, JSON, images, URLs, calculators, and personal productivity.',
      keywords: 'online tools, productivity tools, JSON tools, image tools, text tools',
      ogImage: OG_IMAGE,
      canonicalUrl: BASE_URL,
    },
    'about': {
      title: 'About Pockly - Free Online Tools',
      description:
        'Learn what Pockly is, why every tool is free, how your data is handled in the browser, and who builds and maintains the toolkit.',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/about`,
    },
    'contact': {
      title: 'Contact - Pockly',
      description:
        'Get in touch with the Pockly team: report a bug, request a new tool, or send feedback.',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/contact`,
    },
    'privacy': {
      title: 'Privacy Policy - Pockly',
      description:
        'How Pockly handles your data: local browser processing, cookies, advertising, and your rights.',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/privacy`,
    },
    'terms': {
      title: 'Terms of Use - Pockly',
      description:
        'The terms that apply when you use Pockly and its free online tools.',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/terms`,
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
