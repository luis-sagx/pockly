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

const BASE_URL = 'https://json.pockly.vercel.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

const PAGE_CONFIGS: Record<string, PageMeta> = {
  '': {
    title: 'JSON Tools - Free Online JSON Utilities',
    description:
      'Free online JSON tools: generator, formatter, validator, converter (CSV, XML, YAML), templates, and utilities. No installation required.',
    keywords: 'json tools, json generator, json formatter, json validator, json converter',
    ogImage: OG_IMAGE,
    canonicalUrl: BASE_URL,
  },
  generator: {
    title: 'JSON Generator - Create and Format JSON Online',
    description:
      'Free online JSON generator and formatter. Create, validate, and format JSON structures with smart presets. Export as file or code.',
    keywords: 'json generator, json formatter, json validator, create json',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/generator`,
  },
  templates: {
    title: 'JSON Templates - Ready-to-Use JSON Examples',
    description:
      'Free JSON templates for common use cases. API templates, configurations, data structures. Copy and customize.',
    keywords: 'json templates, json examples, json presets',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/templates`,
  },
  convert: {
    title: 'JSON Convert - Convert JSON to CSV XML YAML TSV',
    description:
      'Convert JSON to CSV, TSV, XML, YAML and vice versa. Free online JSON converter tool.',
    keywords: 'json to csv, json to xml, json to yaml, json converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert`,
  },
  'convert/csv-to-json': {
    title: 'CSV to JSON Converter - Convert CSV to JSON Online',
    description:
      'Convert CSV files to JSON online. Free and fast CSV to JSON converter. No installation required.',
    keywords: 'csv to json, csv converter, csv to json online',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert/csv-to-json`,
  },
  'convert/tsv-to-json': {
    title: 'TSV to JSON Converter - Convert TSV to JSON Online',
    description:
      'Convert TSV files to JSON online. Free and fast TSV to JSON converter.',
    keywords: 'tsv to json, tsv converter, tsv to json online',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert/tsv-to-json`,
  },
  'convert/json-to-csv': {
    title: 'JSON to CSV Converter - Convert JSON to CSV Online',
    description:
      'Convert JSON to CSV format online. Free and fast JSON to CSV converter. Download as CSV file.',
    keywords: 'json to csv, json converter, json to csv online',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert/json-to-csv`,
  },
  'convert/json-to-tsv': {
    title: 'JSON to TSV Converter - Convert JSON to TSV Online',
    description:
      'Convert JSON to TSV format online. Free and fast JSON to TSV converter.',
    keywords: 'json to tsv, json to tsv converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert/json-to-tsv`,
  },
  'convert/json-to-xml': {
    title: 'JSON to XML Converter - Convert JSON to XML Online',
    description:
      'Convert JSON to XML format online. Free and fast JSON to XML converter.',
    keywords: 'json to xml, json to xml converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert/json-to-xml`,
  },
  'convert/json-to-yaml': {
    title: 'JSON to YAML Converter - Convert JSON to YAML Online',
    description:
      'Convert JSON to YAML format online. Free and fast JSON to YAML converter.',
    keywords: 'json to yaml, json to yaml converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert/json-to-yaml`,
  },
  utils: {
    title: 'JSON Utils - Validate Minify Sort Format',
    description:
      'JSON utilities: validate, minify, prettify, sort keys, flatten, unflatten, diff, and query. Free online JSON tools.',
    keywords: 'json validate, json minify, json prettify, json sort',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils`,
  },
  'utils/format': {
    title: 'JSON Format - Prettify JSON Online',
    description:
      'Prettify and format JSON online. Indent and beautify JSON structures. Free JSON formatter tool.',
    keywords: 'json format, json prettify, json beautify',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/format`,
  },
  'utils/minify': {
    title: 'JSON Minify - Minify JSON Online',
    description:
      'Minify JSON online. Remove whitespace and compress JSON files. Free JSON minifier.',
    keywords: 'json minify, json compress, minify json',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/minify`,
  },
  'utils/sort': {
    title: 'JSON Sort - Sort JSON Keys Online',
    description:
      'Sort JSON keys alphabetically online. Reorder JSON object keys. Free JSON sort tool.',
    keywords: 'json sort, sort json keys, json order',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/sort`,
  },
  'utils/validate': {
    title: 'JSON Validator - Validate JSON Online',
    description:
      'Validate JSON online. Check JSON syntax and structure. Free JSON validator tool.',
    keywords: 'json validator, json validate, json check',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/validate`,
  },
  'utils/flatten': {
    title: 'JSON Flatten - Flatten Nested JSON Online',
    description:
      'Flatten nested JSON objects online. Convert deep JSON structures to flat key-value pairs. Free JSON flatten tool.',
    keywords: 'json flatten, flatten json, nested json',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/flatten`,
  },
  'utils/unflatten': {
    title: 'JSON Unflatten - Unflatten JSON Online',
    description:
      'Unflatten flat key-value JSON back to nested objects. Free JSON unflatten tool.',
    keywords: 'json unflatten, unflatten json',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/unflatten`,
  },
  'utils/diff': {
    title: 'JSON Diff - Compare JSON Online',
    description:
      'Compare two JSON documents side-by-side. Find differences between JSON structures. Free JSON diff tool.',
    keywords: 'json diff, json compare, json difference',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/diff`,
  },
  'utils/query': {
    title: 'JSON Query - Query JSON with JSONPath',
    description:
      'Query JSON data using JSONPath expressions. Extract values from complex JSON. Free JSON query tool.',
    keywords: 'json query, jsonpath, json extract',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/utils/query`,
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
