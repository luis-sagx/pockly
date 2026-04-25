import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
