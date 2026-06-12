import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  canonicalUrl?: string;
}

const BASE_URL = 'https://text.pockly.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

const PAGE_CONFIGS: Record<string, PageMeta> = {
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
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updateFromRoute());
  }

  private updateFromRoute() {
    const url = this.router.url.split('?')[0].replace(/^\//, '') || '';
    const config = this.getConfigForPath(url);
    this.setMeta(config);
  }

  private getConfigForPath(url: string): PageMeta {
    const exactMatch = PAGE_CONFIGS[url];
    if (exactMatch) return exactMatch;

    const basePath = url.split('/')[0];
    const parentMatch = PAGE_CONFIGS[basePath];
    if (parentMatch && PAGE_CONFIGS[basePath]) return parentMatch;

    return PAGE_CONFIGS[''];
  }

  setMeta(config: PageMeta) {
    this.title.setTitle(config.title);

    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    } else {
      this.meta.removeTag('name="keywords"');
    }

    this.meta.updateTag({ name: 'robots', content: config.noindex ? 'noindex,nofollow' : 'index,follow' });

    this.meta.updateTag({ property: 'og:title', content: config.ogTitle || config.title });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription || config.description });

    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }

    if (config.canonicalUrl) {
      this.meta.updateTag({ rel: 'canonical', content: config.canonicalUrl });
    }
  }
}
