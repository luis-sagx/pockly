import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { QrGenerator } from './components/pages/qr-generator/qr-generator';
import { UrlEncoder } from './components/pages/url-encoder/url-encoder';
import { UrlDecoder } from './components/pages/url-decoder/url-decoder';
import { UtmBuilder } from './components/pages/utm-builder/utm-builder';
import { UrlCleaner } from './components/pages/url-cleaner/url-cleaner';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'qr-generator', component: QrGenerator },
  { path: 'url-encoder', component: UrlEncoder },
  { path: 'url-decoder', component: UrlDecoder },
  { path: 'utm-builder', component: UtmBuilder },
  { path: 'url-cleaner', component: UrlCleaner },
  { path: '**', redirectTo: '/' },
];
