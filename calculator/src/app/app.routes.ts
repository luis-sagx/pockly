import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { PercentageCalculator } from './components/pages/percentage-calculator/percentage-calculator';
import { CurrencyConverter } from './components/pages/currency-converter/currency-converter';
import { UnitConverter } from './components/pages/unit-converter/unit-converter';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'percentage-calculator', component: PercentageCalculator },
  { path: 'currency-converter', component: CurrencyConverter },
  { path: 'unit-converter', component: UnitConverter },
  { path: '**', redirectTo: '/' },
];