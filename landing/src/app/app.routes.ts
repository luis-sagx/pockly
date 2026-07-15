import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

const localizedRoutes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/pages/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./components/pages/privacy/privacy').then((m) => m.Privacy),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./components/pages/terms/terms').then((m) => m.Terms),
  },
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
