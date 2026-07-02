import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCalculator,
  faPercentage,
  faPercent,
  faMoneyBillWave,
  faRuler,
  faWeightScale,
  faThermometerHalf,
  faFlask,
  faGaugeHigh,
  faArrowRightArrowLeft,
  faArrowTrendUp,
  faChevronDown,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Footer } from './components/layout/footer/footer';
import { Nav } from './components/layout/nav/nav';
import { AdSidebar, SeoService } from '@pockly/shared';
import type { Translations } from './translations';
import { filter } from 'rxjs/operators';
import { AD_CONFIG } from './config/ad.config';

const SIDEBAR_ROUTES = [
  '/percent-of-y',
  '/what-percent',
  '/percentage-change',
  '/currency-converter',
  '/length-converter',
  '/weight-converter',
  '/temperature-converter',
  '/volume-converter',
  '/speed-converter',
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
  protected title = 'Calculator Tools';
  readonly adConfig = AD_CONFIG;
  readonly showSidebar = signal(false);

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCalculator,
      faPercentage,
      faPercent,
      faMoneyBillWave,
      faRuler,
      faWeightScale,
      faThermometerHalf,
      faFlask,
      faGaugeHigh,
      faArrowRightArrowLeft,
      faArrowTrendUp,
      faChevronDown,
      faBars,
      faXmark,
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
