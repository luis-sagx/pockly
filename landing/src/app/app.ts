import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AdSidebar, SeoService } from '@pockly/shared';
import { Nav } from './components/layout/nav/nav';
import { Footer } from './components/layout/footer/footer';
import { AD_CONFIG } from './config/ad.config';

const SIDEBAR_ROUTES = ['/'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, AdSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);

  protected title = 'Pockly - Tools for daily productivity';
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
