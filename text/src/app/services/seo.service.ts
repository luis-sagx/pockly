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
      'Free online productivity tools: word counter, JSON generator, background remover, image resizer, format converter, text case tool, and more.',
    keywords: 'online tools, productivity, word counter, json generator, image tools',
    noindex: false,
  },
  'word-count': {
    title: 'Word Counter - Free Online Word Count Tool',
    description:
      'Free online word counter. Count words, characters, sentences, and paragraphs instantly. Copy or export results. No registration required.',
    keywords: 'word counter, character counter, online word count, text analyzer',
  },
  'json-generator': {
    title: 'JSON Generator - Create and Format JSON Online',
    description:
      'Free online JSON generator and formatter. Create, validate, and format JSON structures with smart presets. Export as file or code.',
    keywords: 'json generator, json formatter, json validator, create json',
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
  'text-case': {
    title: 'Text Case Converter - UPPERCASE lowercase Title Case',
    description:
      'Convert text between uppercase, lowercase, title case, and more. Preserve formatting while converting.',
    keywords: 'text case, uppercase, lowercase, title case, converter',
  },
  'diff-checker': {
    title: 'Diff Checker - Compare Text Online',
    description:
      'Compare two text blocks side-by-side. Highlight differences. Export or copy results. Free online text diff tool.',
    keywords: 'diff checker, text compare, text diff, compare tool',
  },
  'base64': {
    title: 'Base64 Encoder/Decoder - Image to Base64',
    description:
      'Encode images to Base64 or decode Base64 back to image. Copy or download result. Free online Base64 tool.',
    keywords: 'base64 encoder, base64 decoder, image to base64',
  },
  'json/templates': {
    title: 'JSON Templates - Ready-to-Use JSON Examples',
    description:
      'Free JSON templates for common use cases. API templates, configurations, data structures. Copy and customize.',
    keywords: 'json templates, json examples, json presets',
  },
  'json/convert': {
    title: 'JSON Convert - JSON to XML YAML CSV',
    description:
      'Convert JSON to XML, YAML, CSV, and more. Online JSON converter tool. Free and fast.',
    keywords: 'json to xml, json to yaml, json converter',
  },
  'json/utils': {
    title: 'JSON Utils - Validate Minify Sort',
    description:
      'JSON utilities: validate, minify, prettify, sort keys. Free online JSON tools.',
    keywords: 'json validate, json minify, json prettify, json sort',
  },
  'password-generator': {
    title: 'Password Generator - Create Secure Passwords',
    description:
      'Generate secure passwords online. Custom length, characters, and complexity. Copy to clipboard. Free password generator.',
    keywords: 'password generator, secure password, random password',
  },
  'quick-notes': {
    title: 'Quick Notes - Free Online Notepad',
    description:
      'Free online notepad. Save notes instantly. No login required. Access from any device.',
    keywords: 'quick notes, online notepad, text notes',
  },
  'percentage-calculator': {
    title: 'Percentage Calculator - Calculate Percentages',
    description:
      'Calculate percentages online. Find percentage of a number, percentage change, and more. Free calculator.',
    keywords: 'percentage calculator, calculate percentage',
  },
  'currency-converter': {
    title: 'Currency Converter - Exchange Rates',
    description:
      'Convert currencies with live exchange rates. Free currency converter tool.',
    keywords: 'currency converter, exchange rates',
  },
  'unit-converter': {
    title: 'Unit Converter - Length Weight Temperature',
    description:
      'Convert units: length, weight, temperature, and more. Free online unit converter.',
    keywords: 'unit converter, length converter, weight converter',
  },
  'qr-generator': {
    title: 'QR Code Generator - Create QR Codes Free',
    description:
      'Generate QR codes online. Custom colors, size, and error correction. Download as PNG. Free QR generator.',
    keywords: 'qr code generator, qr generator, create qr',
  },
  'url-shortener': {
    title: 'URL Shortener - Shorten Links Free',
    description:
      'Shorten URLs online. Free link shortener tool. Track clicks and manage links.',
    keywords: 'url shortener, link shortener, shorten url',
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