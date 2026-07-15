import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://text.pockly.uk';
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
      keywords: 'text tools, word counter, text case, diff checker, password generator, quick notes',
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
    title: 'Page Not Found - Pockly Text Tools',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  },
  // Spanish pages (/es/...)
  'es': {
    title: 'Herramientas de Texto Online Gratis',
    description: 'Herramientas de texto online gratis: contador de palabras, conversor de mayúsculas, comparador de textos, generador de contraseñas y notas rápidas.',
    keywords: 'herramientas de texto, contador de palabras, comparador de textos, generador de contraseñas',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es`,
  },
  'es/word-count': {
    title: 'Contador de Palabras Online Gratis',
    description: 'Contador de palabras online gratis. Cuenta palabras, caracteres, frases y párrafos al instante. Sin registro.',
    keywords: 'contador de palabras, contador de caracteres, contar palabras online',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/word-count`,
  },
  'es/text-case': {
    title: 'Conversor de Mayúsculas y Minúsculas Online',
    description: 'Convierte texto entre mayúsculas, minúsculas, tipo título, tipo frase y más. Conversor online gratis.',
    keywords: 'mayusculas y minusculas, convertir mayusculas, conversor de texto',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/text-case`,
  },
  'es/diff-checker': {
    title: 'Comparador de Textos Online - Encontrar Diferencias',
    description: 'Compara dos bloques de texto lado a lado. Resalta las diferencias. Exporta o copia resultados. Gratis.',
    keywords: 'comparador de textos, comparar textos, diferencias entre textos',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/diff-checker`,
  },
  'es/password-generator': {
    title: 'Generador de Contraseñas Seguras Online',
    description: 'Genera contraseñas seguras online. Longitud, caracteres y complejidad personalizables. Copia al portapapeles. Gratis.',
    keywords: 'generador de contraseñas, contraseña segura, contraseña aleatoria',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/password-generator`,
  },
  'es/quick-notes': {
    title: 'Notas Rápidas - Bloc de Notas Online Gratis',
    description: 'Bloc de notas online gratis. Guarda notas al instante. Sin registro. Accede desde cualquier dispositivo.',
    keywords: 'notas rapidas, bloc de notas online, notas de texto',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/quick-notes`,
  },
  'es/sign-in': {
    title: 'Iniciar Sesión - Text Tools',
    description: 'Inicia sesión en Text Tools para sincronizar tus notas y ajustes entre dispositivos.',
    noindex: true,
  },
  'es/404': {
    title: 'Página No Encontrada - Pockly Text Tools',
    description: 'La página que buscas no existe.',
    noindex: true,
  },
  },
};
