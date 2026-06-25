import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'board', loadComponent: () => import('./components/pages/board/board').then((m) => m.Board) },
  { path: 'habits', loadComponent: () => import('./components/pages/habits/habits').then((m) => m.Habits) },
  { path: 'scratchpad', loadComponent: () => import('./components/pages/scratchpad/scratchpad').then((m) => m.Scratchpad) },
  { path: 'sign-in', loadComponent: () => import('./components/pages/auth/auth').then((m) => m.Auth) },
  { path: 'settings/notifications', loadComponent: () => import('./components/pages/notification-settings/notification-settings').then((m) => m.NotificationSettings) },
  { path: '404', loadComponent: () => import('./components/pages/not-found/not-found').then((m) => m.NotFound) },
  { path: '**', redirectTo: '/404' },
];
