import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
import { SeoService } from '@pockly/shared';
import type { Translations } from './translations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  protected title = 'Calculator Tools';

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
  }
}
