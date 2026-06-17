import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Scratchpad, STORAGE_KEY } from '../components/pages/scratchpad/scratchpad.model';

@Injectable({ providedIn: 'root' })
export class ScratchpadService {
  private isBrowser: boolean;
  readonly content = signal('');
  readonly updatedAt = signal<number | null>(null);
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.load();
  }

  setContent(content: string): void {
    this.content.set(content);
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => this.save(), 500);
  }

  flush(): void { this.save(); }

  private load(): void {
    if (!this.isBrowser) return;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const pad = JSON.parse(raw) as Scratchpad;
      this.content.set(pad.content || '');
      this.updatedAt.set(pad.updatedAt || null);
    } catch { localStorage.removeItem(STORAGE_KEY); }
  }

  private save(): void {
    if (!this.isBrowser) return;
    const updatedAt = Date.now();
    this.updatedAt.set(updatedAt);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ content: this.content(), updatedAt } satisfies Scratchpad));
  }
}
