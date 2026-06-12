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

const BASE_URL = 'https://pockly-qr.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

const PAGE_CONFIGS: Record<string, PageMeta> = {
  '': {
    title: 'URL Tools - Free Online URL Utilities',
    description:
      'Free online URL tools: QR code generator, URL encoder/decoder, UTM builder, and URL cleaner. No installation required.',
    keywords: 'url tools, qr code generator, url encoder, url decoder, utm builder, url cleaner',
    ogImage: OG_IMAGE,
    canonicalUrl: BASE_URL,
  },
  'qr-generator': {
    title: 'QR Code Generator - Create QR Codes Free Online',
    description:
      'Generate QR codes online. Custom colors, size, and error correction. Download as PNG. Free QR generator.',
    keywords: 'qr code generator, qr generator, create qr',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/qr-generator`,
  },
  'url-encoder': {
    title: 'URL Encoder - Encode Text for Safe URLs',
    description:
      'Encode text and URLs for safe use in query parameters. Works with special characters and non-ASCII text. Free online URL encoder.',
    keywords: 'url encoder, encode url, percent encoding, url encode',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/url-encoder`,
  },
  'url-decoder': {
    title: 'URL Decoder - Decode Percent-Encoded URLs',
    description:
      'Decode percent-encoded URLs and text back to readable form. Handles special characters and international text. Free online URL decoder.',
    keywords: 'url decoder, decode url, percent decode, url decode',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/url-decoder`,
  },
  'utm-builder': {
    title: 'UTM Builder - Create Campaign Tracking URLs',
    description:
      'Build campaign tracking URLs with UTM parameters for marketing. Add source, medium, campaign, term, and content. Free online UTM builder.',
    keywords: 'utm builder, utm parameters, campaign tracking, marketing urls, utm link',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utm-builder`,
  },
  'url-cleaner': {
    title: 'URL Cleaner - Remove Tracking & Normalize URLs',
    description:
      'Clean URLs by removing tracking parameters, sorting query params, and normalizing hostnames. Free online URL cleaner tool.',
    keywords: 'url cleaner, clean url, remove tracking, normalize url, url sanitizer',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/url-cleaner`,
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
