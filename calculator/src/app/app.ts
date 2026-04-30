import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCalculator,
  faPercentage,
  faMoneyBillWave,
  faRuler,
  faArrowRightArrowLeft,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Footer } from './components/layout/footer/footer';
import { Nav } from './components/layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Calculator Tools';

  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCalculator,
      faPercentage,
      faMoneyBillWave,
      faRuler,
      faArrowRightArrowLeft,
      faCircleExclamation
    );
  }
}