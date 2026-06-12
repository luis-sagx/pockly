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
}

export interface SeoConfig {
  baseUrl: string;
  ogImage: string;
  pageConfigs: Record<string, PageMeta>;
}

export const POCKLY_SEO_CONFIG = new InjectionToken<SeoConfig>('POCKLY_SEO_CONFIG');

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

  private updateFromRoute() {
    const url = this.router.url.split('?')[0].replace(/^\//, '') || '';
    const pageMeta = this.getConfigForPath(url);
    this.setMeta(pageMeta);
  }

  private getConfigForPath(url: string): PageMeta {
    const exactMatch = this.config.pageConfigs[url];
    if (exactMatch) return exactMatch;

    const basePath = url.split('/')[0];
    const parentMatch = this.config.pageConfigs[basePath];
    if (parentMatch && this.config.pageConfigs[basePath]) return parentMatch;

    return this.config.pageConfigs[''] || {
      title: 'Pockly',
      description: '',
    };
  }

  setMeta(config: PageMeta) {
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

    this.meta.updateTag({ property: 'og:title', content: config.ogTitle || config.title });
    this.meta.updateTag({
      property: 'og:description',
      content: config.ogDescription || config.description,
    });

    if (config.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: config.ogImage });
    }

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
  }
}
