import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'qr-generator', loadComponent: () => import('./components/pages/qr-generator/qr-generator').then(m => m.QrGenerator) },
  { path: 'url-encoder', loadComponent: () => import('./components/pages/url-encoder/url-encoder').then(m => m.UrlEncoder) },
  { path: 'url-decoder', loadComponent: () => import('./components/pages/url-decoder/url-decoder').then(m => m.UrlDecoder) },
  { path: 'utm-builder', loadComponent: () => import('./components/pages/utm-builder/utm-builder').then(m => m.UtmBuilder) },
  { path: 'url-cleaner', loadComponent: () => import('./components/pages/url-cleaner/url-cleaner').then(m => m.UrlCleaner) },
  {
    path: '404',
    loadComponent: () =>
      import('./components/pages/not-found/not-found').then((m) => m.NotFound),
  },
  { path: '**', redirectTo: '/404' },
];
