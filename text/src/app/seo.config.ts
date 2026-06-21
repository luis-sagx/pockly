import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://text.pockly.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const textSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Pockly Text Tools',
  pageConfigs: {
    '': {
      title: 'Text Tools - Free Online Text Utilities',
      description:
        'Free online text tools: word counter, text case converter, diff checker, password generator, and quick notes. No installation required.',
      keywords:
        'text tools, word counter, text case, diff checker, password generator, quick notes',
      ogImage: OG_IMAGE,
      canonicalUrl: BASE_URL,
    },
    'word-count': {
      title: 'Word Counter - Free Online Word Count Tool',
      description:
        'Free online word counter. Count words, characters, sentences, and paragraphs instantly. Copy or export results. No registration required.',
      keywords: 'word counter, character counter, online word count, text analyzer',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/word-count`,
    },
    'text-case': {
      title: 'Text Case Converter - UPPERCASE lowercase Title Case',
      description:
        'Convert text between uppercase, lowercase, title case, sentence case, and more. Free online text case converter.',
      keywords: 'text case, uppercase, lowercase, title case, converter',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/text-case`,
    },
    'diff-checker': {
      title: 'Diff Checker - Compare Text Online Free',
      description:
        'Compare two text blocks side-by-side. Highlight differences. Export or copy results. Free online text diff tool.',
      keywords: 'diff checker, text compare, text diff, compare tool',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/diff-checker`,
    },
    'password-generator': {
      title: 'Password Generator - Create Secure Passwords',
      description:
        'Generate secure passwords online. Custom length, characters, and complexity. Copy to clipboard. Free password generator.',
      keywords: 'password generator, secure password, random password',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/password-generator`,
    },
    'quick-notes': {
      title: 'Quick Notes - Free Online Notepad',
      description:
        'Free online notepad. Save notes instantly. No login required. Access from any device. Sync with Supabase.',
      keywords: 'quick notes, online notepad, text notes',
      noindex: true,
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/quick-notes`,
    },
    'sign-in': {
      title: 'Sign In - Text Tools',
      description: 'Sign in to Text Tools to sync your notes and settings across devices.',
      noindex: true,
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/sign-in`,
    },
    '404': {
      title: 'Not Found - Text Tools',
      description: 'Page not found.',
      noindex: true,
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/404`,
    },
  },
};
