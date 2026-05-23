import { Component, signal, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBroom, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '../../ui/input-box/input-box';
import { OutputBox } from '../../ui/output-box/output-box';

const TRACKING_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'gclsrc', 'dclid',
  'msclkid', 'twclid',
  'igshid', 'mc_cid', 'mc_eid',
  '_ga', '_gl', '_gaq',
  'ref', 'source', // common referrer params
]);

@Component({
  selector: 'app-url-cleaner',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox],
  templateUrl: './url-cleaner.html',
  styleUrl: './url-cleaner.css',
})
export class UrlCleaner {
  private library = inject(FaIconLibrary);

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
      this.error.set('Please enter a URL');
      this.outputUrl.set('');
      this.removedParams.set([]);
      return;
    }

    this.error.set('');
    this.removedParams.set([]);

    try {
      let urlString = raw;

      // Add protocol if missing
      if (!/^https?:\/\//i.test(urlString)) {
        urlString = 'https://' + urlString;
      }

      const url = new URL(urlString);
      const removed: string[] = [];

      // Collect and remove tracking params
      const paramsToRemove: string[] = [];
      url.searchParams.forEach((_value, key) => {
        const lowerKey = key.toLowerCase();
        if (TRACKING_PARAMS.has(lowerKey)) {
          paramsToRemove.push(key);
          removed.push(key);
        }
      });

      paramsToRemove.forEach((key) => url.searchParams.delete(key));

      // Sort remaining query params alphabetically
      url.searchParams.sort();

      // Lowercase hostname
      url.hostname = url.hostname.toLowerCase();

      // Remove fragment (hash) if it's empty
      if (url.hash === '#' || url.hash === '') {
        url.hash = '';
      }

      this.removedParams.set(removed);
      this.outputUrl.set(url.toString());
    } catch {
      this.error.set('Please enter a valid URL');
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
