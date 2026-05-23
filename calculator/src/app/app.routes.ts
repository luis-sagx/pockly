import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { PercentOfY } from './components/pages/percentage-calculator/percent-of-y/percent-of-y';
import { WhatPercent } from './components/pages/percentage-calculator/what-percent/what-percent';
import { PercentageChange } from './components/pages/percentage-calculator/percentage-change/percentage-change';
import { CurrencyConverter } from './components/pages/currency-converter/currency-converter';
import { LengthConverter } from './components/pages/unit-converter/length-converter/length-converter';
import { WeightConverter } from './components/pages/unit-converter/weight-converter/weight-converter';
import { TemperatureConverter } from './components/pages/unit-converter/temperature-converter/temperature-converter';
import { VolumeConverter } from './components/pages/unit-converter/volume-converter/volume-converter';
import { SpeedConverter } from './components/pages/unit-converter/speed-converter/speed-converter';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'percent-of-y', component: PercentOfY },
  { path: 'what-percent', component: WhatPercent },
  { path: 'percentage-change', component: PercentageChange },
  { path: 'currency-converter', component: CurrencyConverter },
  { path: 'length-converter', component: LengthConverter },
  { path: 'weight-converter', component: WeightConverter },
  { path: 'temperature-converter', component: TemperatureConverter },
  { path: 'volume-converter', component: VolumeConverter },
  { path: 'speed-converter', component: SpeedConverter },
  { path: '**', redirectTo: '/' },
];
