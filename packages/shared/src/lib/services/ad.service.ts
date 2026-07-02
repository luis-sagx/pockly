import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private scriptLoadingPromise?: Promise<void>;
  private loadedClient?: string;

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  async ensureScript(adClient: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !adClient) {
      return;
    }

    if (this.loadedClient === adClient && this.scriptTagExists(adClient)) {
      return;
    }

    if (this.scriptLoadingPromise) {
      return this.scriptLoadingPromise;
    }

    this.scriptLoadingPromise = new Promise<void>((resolve, reject) => {
      const existingScript = this.findScript(adClient);
      if (existingScript) {
        this.loadedClient = adClient;
        resolve();
        return;
      }

      const script = this.document.createElement('script');
      script.async = true;
      script.src =
        `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        this.loadedClient = adClient;
        resolve();
      };
      script.onerror = () => {
        this.scriptLoadingPromise = undefined;
        reject(new Error('adsense-script-load-failed'));
      };
      this.document.head.appendChild(script);
    });

    return this.scriptLoadingPromise;
  }

  pushAd(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore repeated push errors from AdSense.
    }
  }

  private scriptTagExists(adClient: string): boolean {
    return Boolean(this.findScript(adClient));
  }

  private findScript(adClient: string): HTMLScriptElement | null {
    return this.document.head.querySelector(
      `script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}"]`,
    );
  }
}
