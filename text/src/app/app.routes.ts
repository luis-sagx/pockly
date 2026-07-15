import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

const localizedRoutes: Routes = [
  { path: '', component: Home },
  { path: 'text-case', loadComponent: () => import('./components/pages/text-case-tool/text-case-tool').then(m => m.TextCaseTool) },
  { path: 'word-count', loadComponent: () => import('./components/pages/word-count/word-count').then(m => m.WordCount) },
  { path: 'diff-checker', loadComponent: () => import('./components/pages/diff-checker/diff-checker').then(m => m.DiffChecker) },
  { path: 'password-generator', loadComponent: () => import('./components/pages/password-generator/password-generator').then(m => m.PasswordGenerator) },
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
