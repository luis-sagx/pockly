import { Component, signal, computed, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBullseye, faTrashCan, faLink, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { CopyButton } from '../../ui/copy-button/copy-button';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-utm-builder',
  standalone: true,
  imports: [FaIconComponent, CopyButton],
  templateUrl: './utm-builder.html',
})
export class UtmBuilder {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  baseUrl = signal('');
  utmSource = signal('');
  utmMedium = signal('');
  utmCampaign = signal('');
  utmTerm = signal('');
  utmContent = signal('');
  extractedCount = signal(0);

  constructor() {
    this.library.addIcons(faBullseye, faTrashCan, faLink, faWandMagicSparkles);
  }

  builtUrl = computed(() => {
    const base = this.baseUrl().trim();
    if (!base) return '';

    try {
      const url = new URL(base);
      const params: [string, string][] = [];

      const source = this.utmSource().trim();
      const medium = this.utmMedium().trim();
      const campaign = this.utmCampaign().trim();
      const term = this.utmTerm().trim();
      const content = this.utmContent().trim();

      if (source) params.push(['utm_source', source]);
      if (medium) params.push(['utm_medium', medium]);
      if (campaign) params.push(['utm_campaign', campaign]);
      if (term) params.push(['utm_term', term]);
      if (content) params.push(['utm_content', content]);

      params.forEach(([key, value]) => url.searchParams.set(key, value));

      return url.toString();
    } catch {
      return '';
    }
  });

  isValidUrl = computed(() => {
    const base = this.baseUrl().trim();
    if (!base) return false;
    try {
      new URL(base);
      return true;
    } catch {
      return false;
    }
  });

  canBuild = computed(() => {
    return (
      this.isValidUrl() &&
      (this.utmSource().trim() || this.utmMedium().trim() || this.utmCampaign().trim())
    );
  });

  private extractUtmFromUrl(url: string): void {
    try {
      let urlString = url;
      if (!/^https?:\/\//i.test(urlString)) {
        urlString = 'https://' + urlString;
      }
      const parsed = new URL(urlString);
      let count = 0;

      const source = parsed.searchParams.get('utm_source');
      const medium = parsed.searchParams.get('utm_medium');
      const campaign = parsed.searchParams.get('utm_campaign');
      const term = parsed.searchParams.get('utm_term');
      const content = parsed.searchParams.get('utm_content');

      if (source) {
        this.utmSource.set(source);
        count++;
      }
      if (medium) {
        this.utmMedium.set(medium);
        count++;
      }
      if (campaign) {
        this.utmCampaign.set(campaign);
        count++;
      }
      if (term) {
        this.utmTerm.set(term);
        count++;
      }
      if (content) {
        this.utmContent.set(content);
        count++;
      }

      this.extractedCount.set(count);
    } catch {
      this.extractedCount.set(0);
    }
  }

  onInputChange(
    field: 'baseUrl' | 'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmTerm' | 'utmContent',
    value: string
  ): void {
    const signals: Record<string, ReturnType<typeof signal>> = {
      baseUrl: this.baseUrl,
      utmSource: this.utmSource,
      utmMedium: this.utmMedium,
      utmCampaign: this.utmCampaign,
      utmTerm: this.utmTerm,
      utmContent: this.utmContent,
    };
    signals[field].set(value);

    if (field === 'baseUrl' && value.trim()) {
      this.extractUtmFromUrl(value);
    }
  }

  clear(): void {
    this.baseUrl.set('');
    this.utmSource.set('');
    this.utmMedium.set('');
    this.utmCampaign.set('');
    this.utmTerm.set('');
    this.utmContent.set('');
    this.extractedCount.set(0);
  }
}
