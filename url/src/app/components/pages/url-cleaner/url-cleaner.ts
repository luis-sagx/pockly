import { Component, signal, computed, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBroom, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { OutputBox } from '@pockly/shared';
import { LanguageService } from '@pockly/shared';

const TRACKING_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'fbclid',
  'gclid',
  'gclsrc',
  'dclid',
  'msclkid',
  'twclid',
  'igshid',
  'mc_cid',
  'mc_eid',
  '_ga',
  '_gl',
  '_gaq',
  'ref',
  'source',
]);

@Component({
  selector: 'app-url-cleaner',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox],
  templateUrl: './url-cleaner.html',
})
export class UrlCleaner {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  inputUrl = signal('');
  outputUrl = signal('');
  error = signal('');
  removedParams = signal<string[]>([]);

  constructor() {
    this.library.addIcons(faBroom, faTrashCan, faCircleExclamation);
  }

  clean(): void {
    const raw = this.inputUrl().trim();
    if (!raw) {
      this.error.set(this.t().pleaseEnterUrl);
      this.outputUrl.set('');
      this.removedParams.set([]);
      return;
    }

    this.error.set('');
    this.removedParams.set([]);

    try {
      let urlString = raw;

      if (!/^https?:\/\//i.test(urlString)) {
        urlString = 'https://' + urlString;
      }

      const url = new URL(urlString);
      const removed: string[] = [];

      const paramsToRemove: string[] = [];
      url.searchParams.forEach((_value, key) => {
        const lowerKey = key.toLowerCase();
        if (TRACKING_PARAMS.has(lowerKey)) {
          paramsToRemove.push(key);
          removed.push(key);
        }
      });

      paramsToRemove.forEach((key) => url.searchParams.delete(key));

      url.searchParams.sort();

      url.hostname = url.hostname.toLowerCase();

      if (url.hash === '#' || url.hash === '') {
        url.hash = '';
      }

      this.removedParams.set(removed);
      this.outputUrl.set(url.toString());
    } catch {
      this.error.set(this.t().pleaseEnterValidUrl);
      this.outputUrl.set('');
      this.removedParams.set([]);
    }
  }

  onInputChange(value: string): void {
    this.inputUrl.set(value);
    this.error.set('');
    this.outputUrl.set('');
    this.removedParams.set([]);
  }

  clear(): void {
    this.inputUrl.set('');
    this.outputUrl.set('');
    this.error.set('');
    this.removedParams.set([]);
  }
}
