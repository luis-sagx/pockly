import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AdSidebar, SeoService } from '@pockly/shared';
import { Nav } from './components/layout/nav/nav';
import { Footer } from './components/layout/footer/footer';
import { AD_CONFIG } from './config/ad.config';
import {
  faSignOutAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

// Routes that get the ad sidebar (the actual tool pages).
const SIDEBAR_ROUTES = ['/board', '/habits', '/scratchpad'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, AdSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  private faLib = inject(FaIconLibrary);
  private router = inject(Router);

  readonly adConfig = AD_CONFIG;
  readonly showSidebar = signal(false);

  constructor() {
    this.faLib.addIcons(faSignOutAlt, faUserCircle);

    this.updateSidebar(this.router.url);

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateSidebar(e.urlAfterRedirects));
  }

  private updateSidebar(url: string): void {
    const cleanUrl = url.split('?')[0] || '/';
    this.showSidebar.set(SIDEBAR_ROUTES.includes(cleanUrl));
  }
}
