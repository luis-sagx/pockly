import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { Footer } from './components/layout/footer/footer';
import { Nav } from './components/layout/nav/nav';
import { AdSidebar, SeoService } from '@pockly/shared';
import { filter } from 'rxjs/operators';
import { AD_CONFIG } from './config/ad.config';

// Import icons
import {
  faFont,
  faTextHeight,
  faTextWidth,
  faHashtag,
  faCodeBranch,
  faKey,
  faTh,
  faSignOutAlt,
  faUserCircle,
  faCopy,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const SIDEBAR_ROUTES = ['/text-case', '/word-count', '/diff-checker', '/password-generator'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, AdSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  private faLib = inject(FaIconLibrary);
  private readonly router = inject(Router);
  readonly adConfig = AD_CONFIG;
  readonly showSidebar = signal(false);

  constructor() {
    this.faLib.addIcons(
      faFont,
      faTextHeight,
      faTextWidth,
      faHashtag,
      faCodeBranch,
      faKey,
      faTh,
      faSignOutAlt,
      faUserCircle,
      faCopy,
      faCheck,
    );

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
