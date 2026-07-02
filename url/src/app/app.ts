import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/layout/nav/nav';
import { FooterComponent } from './components/layout/footer/footer';
import { AdSidebar, SeoService } from '@pockly/shared';
import type { Translations } from './translations';
import { filter } from 'rxjs/operators';
import { AD_CONFIG } from './config/ad.config';

const SIDEBAR_ROUTES = [
  '/qr-generator',
  '/url-encoder',
  '/url-decoder',
  '/utm-builder',
  '/url-cleaner',
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, AdSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  private readonly router = inject(Router);
  protected readonly title = signal('url');
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
