import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://flow.pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const productivitySeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Flow by Pockly',
  pageConfigs: {
    '': {
      title: 'Flow - Productivity Tools to Organize Your Day',
      description:
        'Local-first day organization tools: task board, habit tracker, and scratchpad.',
      keywords: 'productivity tools, habit tracker, task board, scratchpad',
      ogImage: OG_IMAGE,
      canonicalUrl: BASE_URL,
    },
    board: {
      title: 'Day Board - Today, This Week, Someday',
      description:
        'A personal task board organized by time horizon instead of generic project status.',
      keywords: 'task board, today this week someday, personal productivity',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/board`,
    },
    habits: {
      title: 'Habit Tracker - Daily Streaks',
      description: 'Track daily habits and local-day streaks in your browser.',
      keywords: 'habit tracker, daily habits, streaks',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/habits`,
    },
    scratchpad: {
      title: 'Scratchpad - Fast Autosaving Notes',
      description:
        'A single local-first scratchpad for quick markdown capture.',
      keywords: 'scratchpad, quick notes, autosave notes',
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/scratchpad`,
    },
    'sign-in': {
      title: 'Sign In - Flow',
      description: 'Sign in to sync productivity tools.',
      noindex: true,
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/sign-in`,
    },
    '404': {
      title: 'Not Found - Flow',
      description: 'Page not found.',
      noindex: true,
      ogImage: OG_IMAGE,
      canonicalUrl: `${BASE_URL}/404`,
    },
  'settings/notifications': {
    title: 'Notification Settings - Flow',
    description: 'Configure Flow notifications.',
    noindex: true,
  },
  // Spanish pages (/es/...)
  'es': {
    title: 'Flow - Herramientas de Productividad para Organizar tu Día',
    description: 'Organiza tu día con un tablero local-first, un rastreador de hábitos y un bloc de notas. Herramientas de productividad gratis.',
    keywords: 'herramientas de productividad, rastreador de habitos, tablero de tareas, bloc de notas',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es`,
  },
  'es/board': {
    title: 'Tablero del Día - Hoy, Esta Semana, Algún Día',
    description: 'Un tablero de tareas personal organizado por horizonte temporal en lugar de estados genéricos de proyecto.',
    keywords: 'tablero de tareas, hoy esta semana, productividad personal',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/board`,
  },
  'es/habits': {
    title: 'Rastreador de Hábitos - Rachas Diarias',
    description: 'Registra hábitos diarios y rachas en tu navegador. Rastreador de hábitos gratis.',
    keywords: 'rastreador de habitos, habitos diarios, rachas',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/habits`,
  },
  'es/scratchpad': {
    title: 'Bloc de Notas Rápido con Autoguardado',
    description: 'Un bloc de notas local-first para capturar markdown rápidamente. Con autoguardado.',
    keywords: 'bloc de notas, notas rapidas, autoguardado',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/scratchpad`,
  },
  'es/sign-in': {
    title: 'Iniciar Sesión - Flow',
    description: 'Inicia sesión para sincronizar tus herramientas de productividad.',
    noindex: true,
  },
  'es/settings/notifications': {
    title: 'Ajustes de Notificaciones - Flow',
    description: 'Configura las notificaciones de Flow.',
    noindex: true,
  },
  'es/404': {
    title: 'Página No Encontrada - Flow',
    description: 'La página que buscas no existe.',
    noindex: true,
  },
  },
};
