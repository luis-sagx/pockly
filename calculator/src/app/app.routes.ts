import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

const localizedRoutes: Routes = [
  { path: '', component: Home },
  { path: 'percent-of-y', loadComponent: () => import('./components/pages/percentage-calculator/percent-of-y/percent-of-y').then(m => m.PercentOfY) },
  { path: 'what-percent', loadComponent: () => import('./components/pages/percentage-calculator/what-percent/what-percent').then(m => m.WhatPercent) },
  { path: 'percentage-change', loadComponent: () => import('./components/pages/percentage-calculator/percentage-change/percentage-change').then(m => m.PercentageChange) },
  { path: 'currency-converter', loadComponent: () => import('./components/pages/currency-converter/currency-converter').then(m => m.CurrencyConverter) },
  { path: 'length-converter', loadComponent: () => import('./components/pages/unit-converter/length-converter/length-converter').then(m => m.LengthConverter) },
  { path: 'weight-converter', loadComponent: () => import('./components/pages/unit-converter/weight-converter/weight-converter').then(m => m.WeightConverter) },
  { path: 'temperature-converter', loadComponent: () => import('./components/pages/unit-converter/temperature-converter/temperature-converter').then(m => m.TemperatureConverter) },
  { path: 'volume-converter', loadComponent: () => import('./components/pages/unit-converter/volume-converter/volume-converter').then(m => m.VolumeConverter) },
  { path: 'speed-converter', loadComponent: () => import('./components/pages/unit-converter/speed-converter/speed-converter').then(m => m.SpeedConverter) },
  {
    path: '404',
    loadComponent: () =>
      import('./components/pages/not-found/not-found').then((m) => m.NotFound),
  },
];

// Spanish mirror of every route under /es so both languages get prerendered,
// indexable URLs. LanguageService derives the active language from the prefix.
export const routes: Routes = [
  ...localizedRoutes,
  { path: 'es', children: localizedRoutes },
  { path: '**', redirectTo: '/404' },
];
