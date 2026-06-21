import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://productivity.pockly.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const productivitySeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Pockly Productivity Tools',
  pageConfigs: {
    '': { title: 'Productivity Tools - Organize Your Day', description: 'Local-first day organization tools: task board, habit tracker, and scratchpad.', keywords: 'productivity tools, habit tracker, task board, scratchpad', ogImage: OG_IMAGE, canonicalUrl: BASE_URL },
    board: { title: 'Day Board - Today, This Week, Someday', description: 'A personal task board organized by time horizon instead of generic project status.', keywords: 'task board, today this week someday, personal productivity', ogImage: OG_IMAGE, canonicalUrl: `${BASE_URL}/board` },
    habits: { title: 'Habit Tracker - Daily Streaks', description: 'Track daily habits and local-day streaks in your browser.', keywords: 'habit tracker, daily habits, streaks', ogImage: OG_IMAGE, canonicalUrl: `${BASE_URL}/habits` },
    scratchpad: { title: 'Scratchpad - Fast Autosaving Notes', description: 'A single local-first scratchpad for quick markdown capture.', keywords: 'scratchpad, quick notes, autosave notes', ogImage: OG_IMAGE, canonicalUrl: `${BASE_URL}/scratchpad` },
    'sign-in': { title: 'Sign In - Productivity Tools', description: 'Sign in to sync productivity tools.', noindex: true, ogImage: OG_IMAGE, canonicalUrl: `${BASE_URL}/sign-in` },
    '404': { title: 'Not Found - Productivity Tools', description: 'Page not found.', noindex: true, ogImage: OG_IMAGE, canonicalUrl: `${BASE_URL}/404` },
  },
};
