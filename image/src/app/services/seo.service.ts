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

const PAGE_CONFIGS: Record<string, PageMeta> = {
  '': {
    title: 'Pockly - Free Online Tools for Daily Productivity',
    description:
      'Free online productivity tools: image resizer, background remover, base64 encoder, format converter, and more.',
    keywords: 'online tools, productivity, image tools, base64, format converter',
    noindex: false,
  },
  'base64': {
    title: 'Base64 Encoder/Decoder - Image to Base64',
    description:
      'Encode images to Base64 or decode Base64 back to image. Copy or download result. Free online Base64 tool.',
    keywords: 'base64 encoder, base64 decoder, image to base64',
  },
  'background-remover': {
    title: 'Background Remover - Remove Image Backgrounds Free',
    description:
      'Remove image backgrounds online for free. One-click background removal with clean edges. Download as PNG or with transparent background.',
    keywords: 'background remover, remove background, transparent background, image editor',
  },
  'image-resize': {
    title: 'Image Resizer - Resize Images Online Free',
    description:
      'Resize images online for free. Set exact pixel dimensions, percentage, or preset sizes. Fast preview and instant download.',
    keywords: 'image resize, resize image, photo resizer, pixels',
  },
  'format-converter': {
    title: 'Image Format Converter - Convert PNG JPEG WEBP',
    description:
      'Convert image formats online. PNG to JPEG, WEBP, BMP. Batch conversion supported. Fast and free.',
    keywords: 'image converter, format converter, png to jpg, webp converter',
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
    if (parentMatch) return parentMatch;

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