import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'sign-in', loadComponent: () => import('./components/pages/auth/auth').then(m => m.Auth) },
  { path: 'text-case', loadComponent: () => import('./components/pages/text-case-tool/text-case-tool').then(m => m.TextCaseTool) },
  { path: 'word-count', loadComponent: () => import('./components/pages/word-count/word-count').then(m => m.WordCount) },
  { path: 'diff-checker', loadComponent: () => import('./components/pages/diff-checker/diff-checker').then(m => m.DiffChecker) },
  { path: 'password-generator', loadComponent: () => import('./components/pages/password-generator/password-generator').then(m => m.PasswordGenerator) },
  { path: 'quick-notes', loadComponent: () => import('./components/pages/quick-notes/quick-notes').then(m => m.QuickNotes) },
  {
    path: '404',
    loadComponent: () =>
      import('./components/pages/not-found/not-found').then((m) => m.NotFound),
  },
  { path: '**', redirectTo: '/404' },
];
