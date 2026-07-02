import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Footer } from './components/layout/footer/footer';
import { Nav } from './components/layout/nav/nav';
import { AdSidebar, SeoService } from '@pockly/shared';
import type { Translations } from './translations';
import { filter } from 'rxjs/operators';
import { AD_CONFIG } from './config/ad.config';

const SIDEBAR_ROUTES = [
  '/image-to-base64',
  '/base64-to-image',
  '/remove-background',
  '/resize-dimensions',
  '/compress-by-weight',
  '/crop-image',
  '/convert-to-png',
  '/convert-to-jpeg',
  '/convert-to-webp',
  '/convert-to-bmp',
  '/convert-to-svg',
  '/convert-to-pdf',
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, AdSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  private readonly router = inject(Router);
  protected title = 'Image Tools';
  readonly adConfig = AD_CONFIG;
  readonly showSidebar = signal(false);

  constructor() {
    this.updateSidebar(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateSidebar(event.urlAfterRedirects));
  }

  private updateSidebar(url: string): void {
    const cleanUrl = url.split('?')[0] || '/';
    this.showSidebar.set(SIDEBAR_ROUTES.includes(cleanUrl));
  }
}
