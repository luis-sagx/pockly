import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://pockly.uk';
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
  // Spanish pages (/es/...)
  'es': {
    title: 'Pockly - Herramientas Online Gratis para tu Día a Día',
    description: 'Herramientas online gratis para texto, JSON, imágenes, URLs, calculadoras y productividad personal.',
    keywords: 'herramientas online, herramientas gratis, herramientas json, herramientas de imagen, herramientas de texto',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es`,
  },
  'es/about': {
    title: 'Sobre Pockly - Herramientas Online Gratis',
    description: 'Descubre qué es Pockly, por qué todas las herramientas son gratis, cómo se procesan tus datos en el navegador y quién lo mantiene.',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/about`,
  },
  'es/contact': {
    title: 'Contacto - Pockly',
    description: 'Contacta con el equipo de Pockly: reporta un error, pide una nueva herramienta o envía sugerencias.',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/contact`,
  },
  'es/privacy': {
    title: 'Política de Privacidad - Pockly',
    description: 'Cómo maneja Pockly tus datos: procesamiento local en el navegador, cookies, publicidad y tus derechos.',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/privacy`,
  },
  'es/terms': {
    title: 'Términos de Uso - Pockly',
    description: 'Los términos que aplican al usar Pockly y sus herramientas online gratuitas.',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/terms`,
  },
  'es/404': {
    title: 'Página No Encontrada - Pockly',
    description: 'La página que buscas no existe.',
    noindex: true,
  },
  },
};
