import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { QrGenerator } from './components/pages/qr-generator/qr-generator';
import { UrlShortener } from './components/pages/url-shortener/url-shortener';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'qr-generator', component: QrGenerator },
  { path: 'url-shortener', component: UrlShortener },
  { path: '**', redirectTo: '/' },
];