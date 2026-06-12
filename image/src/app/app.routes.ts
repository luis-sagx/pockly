import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'image-to-base64', loadComponent: () => import('./components/pages/base64-tool/base64-tool').then(m => m.Base64Tool) },
  { path: 'base64-to-image', loadComponent: () => import('./components/pages/text-image/text-image').then(m => m.TextImage) },
  { path: 'remove-background', loadComponent: () => import('./components/pages/background-remover/background-remover').then(m => m.BackgroundRemover) },
  { path: 'resize-dimensions', loadComponent: () => import('./components/pages/image-resize/image-resize').then(m => m.ImageResize) },
  { path: 'compress-by-weight', loadComponent: () => import('./components/pages/compress/compress').then(m => m.Compress) },
  { path: 'crop-image', loadComponent: () => import('./components/pages/crop/crop').then(m => m.Crop) },
  { path: 'convert-to-png', loadComponent: () => import('./components/pages/convert-to-png/convert-to-png').then(m => m.ConvertToPng) },
  { path: 'convert-to-jpeg', loadComponent: () => import('./components/pages/convert-to-jpeg/convert-to-jpeg').then(m => m.ConvertToJpeg) },
  { path: 'convert-to-webp', loadComponent: () => import('./components/pages/convert-to-webp/convert-to-webp').then(m => m.ConvertToWebp) },
  { path: 'convert-to-bmp', loadComponent: () => import('./components/pages/convert-to-bmp/convert-to-bmp').then(m => m.ConvertToBmp) },
  { path: 'convert-to-svg', loadComponent: () => import('./components/pages/convert-to-svg/convert-to-svg').then(m => m.ConvertToSvg) },
  { path: 'convert-to-pdf', loadComponent: () => import('./components/pages/convert-to-pdf/convert-to-pdf').then(m => m.ConvertToPdf) },
  { path: 'licenses-attributions', loadComponent: () => import('./components/pages/licenses-attributions/licenses-attributions').then(m => m.LicensesAttributions) },
  { path: 'convert-formats', redirectTo: 'convert-to-png', pathMatch: 'full' },
  { path: 'format-converter', redirectTo: 'convert-to-png', pathMatch: 'full' },
  { path: 'base64', redirectTo: 'image-to-base64', pathMatch: 'full' },
  { path: 'text-image', redirectTo: 'base64-to-image', pathMatch: 'full' },
  { path: 'background-remover', redirectTo: 'remove-background', pathMatch: 'full' },
  { path: 'image-resize', redirectTo: 'resize-dimensions', pathMatch: 'full' },
  { path: 'compress', redirectTo: 'compress-by-weight', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
