import { DOCUMENT } from '@angular/common';
import { Injectable, InjectionToken, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LanguageService } from './language.service';

export type JsonLdNode = Record<string, unknown>;
export type JsonLdValue = JsonLdNode | JsonLdNode[];

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonicalUrl?: string;
  siteName?: string;
  lang?: string;
  jsonLd?: JsonLdValue;
}

export interface SeoConfig {
  baseUrl: string;
  ogImage: string;
  siteName?: string;
  defaultLang?: string;
  defaultOgType?: string;
  pageConfigs: Record<string, PageMeta>;
}

export const POCKLY_SEO_CONFIG = new InjectionToken<SeoConfig>('POCKLY_SEO_CONFIG');

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(POCKLY_SEO_CONFIG);
  private readonly languageService = inject(LanguageService);

  constructor() {
    this.updateFromRoute();

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.updateFromRoute());

    effect(() => {
      const currentLang = this.languageService.getCurrentLanguage();
      this.document.documentElement.lang = currentLang || this.config.defaultLang || 'en';
    });
  }

  private updateFromRoute() {
    const normalizedPath = this.normalizePath(this.router.url);
    const pageMeta = this.getConfigForPath(normalizedPath);
    this.setMeta(pageMeta, normalizedPath);
  }

  private normalizePath(url: string): string {
    return url.split('?')[0].split('#')[0].replace(/^\//, '') || '';
  }

  private getConfigForPath(url: string): PageMeta {
    const exactMatch = this.config.pageConfigs[url];
    if (exactMatch) {
      return exactMatch;
    }

    const parentPath = url.split('/')[0];
    const parentMatch = this.config.pageConfigs[parentPath];
    if (parentMatch) {
      return parentMatch;
    }

    if (url === '404' && this.config.pageConfigs['404']) {
      return this.config.pageConfigs['404'];
    }

    return (
      this.config.pageConfigs[''] || {
        title: 'Pockly',
        description: '',
      }
    );
  }

  setMeta(config: PageMeta, path = '') {
    const canonicalUrl = config.canonicalUrl || this.resolveCanonicalUrl(path);
    const ogImage = config.ogImage || this.config.ogImage;
    const ogTitle = config.ogTitle || config.title;
    const ogDescription = config.ogDescription || config.description;
    const ogType = config.ogType || this.config.defaultOgType || 'website';
    const siteName = config.siteName || this.config.siteName || 'Pockly';
    const lang = config.lang || this.languageService.getCurrentLanguage() || this.config.defaultLang || 'en';
    const twitterCard = config.twitterCard || 'summary_large_image';
    const robots = this.resolveRobots(config);

    this.title.setTitle(config.title);
    this.document.documentElement.lang = lang;

    this.meta.updateTag({ name: 'description', content: config.description });

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    } else {
      this.meta.removeTag('name="keywords"');
    }

    this.meta.updateTag({ name: 'robots', content: robots });

    this.meta.updateTag({ property: 'og:title', content: ogTitle });
    this.meta.updateTag({ property: 'og:description', content: ogDescription });
    this.meta.updateTag({ property: 'og:image', content: ogImage });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:type', content: ogType });
    this.meta.updateTag({ property: 'og:site_name', content: siteName });

    this.meta.updateTag({ name: 'twitter:card', content: twitterCard });
    this.meta.updateTag({ name: 'twitter:title', content: ogTitle });
    this.meta.updateTag({ name: 'twitter:description', content: ogDescription });
    this.meta.updateTag({ name: 'twitter:image', content: ogImage });

    this.setCanonical(canonicalUrl);
    this.setJsonLd(config.jsonLd || this.buildDefaultJsonLd(config, canonicalUrl, siteName, lang));
  }

  private resolveCanonicalUrl(path: string): string {
    return path ? `${this.config.baseUrl}/${path}` : this.config.baseUrl;
  }

  private resolveRobots(config: PageMeta): string {
    const shouldNoFollow = config.nofollow ?? config.noindex ?? false;
    const directives = [config.noindex ? 'noindex' : 'index', shouldNoFollow ? 'nofollow' : 'follow'];
    return directives.join(',');
  }

  private setCanonical(canonicalUrl: string): void {
    const existingLink = this.document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (existingLink) {
      existingLink.href = canonicalUrl;
      return;
    }

    const link = this.document.createElement('link');
    link.rel = 'canonical';
    link.href = canonicalUrl;
    this.document.head.appendChild(link);
  }

  private setJsonLd(jsonLd: JsonLdValue): void {
    const id = 'pockly-jsonld';
    this.document.getElementById(id)?.remove();

    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    this.document.head.appendChild(script);
  }

  private buildDefaultJsonLd(
    config: PageMeta,
    canonicalUrl: string,
    siteName: string,
    lang: string,
  ): JsonLdNode[] {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: this.config.baseUrl,
        inLanguage: lang,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: config.title,
        description: config.description,
        url: canonicalUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser',
        inLanguage: lang,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ];
  }
}
