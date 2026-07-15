import { Injectable, InjectionToken, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
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
  /** Overrides the auto-generated WebApplication JSON-LD for this page. */
  structuredData?: Record<string, unknown>;
}

export interface SeoConfig {
  baseUrl: string;
  ogImage: string;
  /** Shown as og:site_name and used in the JSON-LD publisher. */
  siteName?: string;
  /** schema.org applicationCategory for the auto JSON-LD (e.g. 'UtilitiesApplication'). */
  applicationCategory?: string;
  /**
   * Page paths (without leading slash) to PageMeta. Spanish pages live under
   * 'es' / 'es/<path>' keys; when both language keys exist for a path the
   * service emits hreflang alternates automatically.
   */
  pageConfigs: Record<string, PageMeta>;
}

export const POCKLY_SEO_CONFIG = new InjectionToken<SeoConfig>('POCKLY_SEO_CONFIG');

export interface FaqEntry {
  q: string;
  a: string;
}

const JSON_LD_ID = 'pockly-jsonld';
const FAQ_JSON_LD_ID = 'pockly-faq-jsonld';
const HREFLANG_ATTR = 'data-pockly-hreflang';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private config = inject(POCKLY_SEO_CONFIG);

  constructor() {
    this.updateFromRoute();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateFromRoute());
  }

  private currentPath(): string {
    return this.router.url.split('?')[0].split('#')[0].replace(/^\//, '') || '';
  }

  private isSpanishPath(path: string): boolean {
    return path === 'es' || path.startsWith('es/');
  }

  /** Path with the language prefix removed ('' for home). */
  private barePath(path: string): string {
    return this.isSpanishPath(path) ? path.slice(3) : path;
  }

  private urlFor(bare: string, lang: 'en' | 'es'): string {
    const prefix = lang === 'es' ? '/es' : '';
    return `${this.config.baseUrl}${prefix}${bare ? `/${bare}` : ''}` || this.config.baseUrl;
  }

  private updateFromRoute() {
    const path = this.currentPath();
    const pageMeta = this.getConfigForPath(path);
    this.setMeta(pageMeta, path);
  }

  private getConfigForPath(path: string): PageMeta {
    const exactMatch = this.config.pageConfigs[path];
    if (exactMatch) return exactMatch;

    // Fall back through parent paths: 'es/utils/format' -> 'es/utils' -> 'es'.
    const segments = path.split('/');
    for (let i = segments.length - 1; i > 0; i--) {
      const parent = segments.slice(0, i).join('/');
      const parentMatch = this.config.pageConfigs[parent];
      if (parentMatch) return parentMatch;
    }

    return this.config.pageConfigs[''] || {
      title: 'Pockly',
      description: '',
    };
  }

  setMeta(config: PageMeta, path: string = this.currentPath()) {
    const lang: 'en' | 'es' = this.isSpanishPath(path) ? 'es' : 'en';
    const bare = this.barePath(path);

    this.document.documentElement.lang = lang;

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    } else {
      this.meta.removeTag('name="keywords"');
    }

    this.meta.updateTag({
      name: 'robots',
      content: config.noindex ? 'noindex,nofollow' : 'index,follow',
    });

    const ogImage = config.ogImage || this.config.ogImage;
    const ogTitle = config.ogTitle || config.title;
    const ogDescription = config.ogDescription || config.description;

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: lang === 'es' ? 'es_ES' : 'en_US' });
    this.meta.updateTag({ property: 'og:title', content: ogTitle });
    this.meta.updateTag({ property: 'og:description', content: ogDescription });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: ogTitle });
    if (this.config.siteName) {
      this.meta.updateTag({ property: 'og:site_name', content: this.config.siteName });
    }
    if (config.canonicalUrl) {
      this.meta.updateTag({ property: 'og:url', content: config.canonicalUrl });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: ogDescription });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    if (config.canonicalUrl) {
      const staleMetaCanonical = this.document.head.querySelector('meta[rel="canonical"]');
      if (staleMetaCanonical) staleMetaCanonical.remove();

      const existingLink = this.document.head.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;
      if (existingLink) {
        existingLink.href = config.canonicalUrl;
      } else {
        const link = this.document.createElement('link');
        link.rel = 'canonical';
        link.href = config.canonicalUrl;
        this.document.head.appendChild(link);
      }
    }

    this.setHreflang(config, bare, lang);
    this.setJsonLd(config, ogImage, lang, bare);
    this.clearFaqJsonLd();
  }

  private setHreflang(config: PageMeta, bare: string, lang: 'en' | 'es') {
    this.document.head
      .querySelectorAll(`link[${HREFLANG_ATTR}]`)
      .forEach((el) => el.remove());

    if (config.noindex) return;

    const enKey = bare;
    const esKey = bare ? `es/${bare}` : 'es';
    const hasBoth = !!this.config.pageConfigs[enKey] && !!this.config.pageConfigs[esKey];
    if (!hasBoth) return;

    const alternates: Array<[string, string]> = [
      ['en', this.urlFor(bare, 'en')],
      ['es', this.urlFor(bare, 'es')],
      ['x-default', this.urlFor(bare, 'en')],
    ];
    for (const [hreflang, href] of alternates) {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', hreflang);
      link.href = href;
      link.setAttribute(HREFLANG_ATTR, '');
      this.document.head.appendChild(link);
    }

    this.meta.updateTag({
      property: 'og:locale:alternate',
      content: lang === 'es' ? 'en_US' : 'es_ES',
    });
  }

  private setJsonLd(config: PageMeta, ogImage: string, lang: 'en' | 'es', bare: string) {
    const existing = this.document.getElementById(JSON_LD_ID);
    if (existing) existing.remove();

    if (config.noindex) return;

    const pageUrl = config.canonicalUrl || this.urlFor(bare, lang);
    const webApp = config.structuredData ?? {
      '@type': 'WebApplication',
      name: config.title,
      description: config.description,
      url: pageUrl,
      image: ogImage,
      inLanguage: lang,
      applicationCategory: this.config.applicationCategory || 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: this.config.siteName || 'Pockly',
        url: 'https://pockly.uk',
      },
    };

    const graph: unknown[] = [webApp];
    if (bare) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'es' ? 'Inicio' : 'Home',
            item: this.urlFor('', lang),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: config.title,
            item: pageUrl,
          },
        ],
      });
    }

    const script = this.document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    this.document.head.appendChild(script);
  }

  /**
   * Emits FAQPage JSON-LD for the FAQs visible on the current page. Called by
   * the ToolContent component; cleared automatically on every navigation.
   */
  setFaqJsonLd(faqs: FaqEntry[]) {
    this.clearFaqJsonLd();
    if (!faqs.length) return;

    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: this.isSpanishPath(this.currentPath()) ? 'es' : 'en',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    };

    const script = this.document.createElement('script');
    script.id = FAQ_JSON_LD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private clearFaqJsonLd() {
    const existing = this.document.getElementById(FAQ_JSON_LD_ID);
    if (existing) existing.remove();
  }
}
