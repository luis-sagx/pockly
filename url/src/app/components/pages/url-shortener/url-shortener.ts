import { Component, signal, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLink, faCompressAlt, faTrashCan, faExternalLink, faCircleExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '../../ui/input-box/input-box';
import { CopyButton } from '../../ui/copy-button/copy-button';

@Component({
  selector: 'app-url-shortener',
  standalone: true,
  imports: [FaIconComponent, InputBox, CopyButton],
  templateUrl: './url-shortener.html',
  styleUrl: './url-shortener.css',
})
export class UrlShortener {
  private library = inject(FaIconLibrary);

  inputUrl = signal('');
  shortenedUrl = signal('');
  loading = signal(false);
  error = signal('');

  constructor() {
    this.library.addIcons(faLink, faCompressAlt, faTrashCan, faExternalLink, faCircleExclamation, faCheck);
  }

  async shorten(): Promise<void> {
    const url = this.inputUrl().trim();
    if (!url) { this.error.set('Please enter a URL'); return; }
    try { new URL(url); } catch { this.error.set('Please enter a valid URL (starting with http:// or https://)'); return; }
    this.loading.set(true);
    this.error.set('');
    this.shortenedUrl.set('');
    try {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error('API request failed');
      const text = await response.text();
      if (!text.startsWith('http')) throw new Error('Invalid response');
      this.shortenedUrl.set(text.trim());
    } catch (e: unknown) { this.error.set('Failed to shorten URL. Please try again.'); }
    finally { this.loading.set(false); }
  }

  onInputChange(value: string): void { this.inputUrl.set(value); this.error.set(''); }
  clear(): void { this.inputUrl.set(''); this.shortenedUrl.set(''); this.error.set(''); }
}