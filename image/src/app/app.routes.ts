import { Routes } from '@angular/router';
import { BackgroundRemover } from './components/pages/background-remover/background-remover';
import { Base64Tool } from './components/pages/base64-tool/base64-tool';
import { Compress } from './components/pages/compress/compress';
import { FormatConverter } from './components/pages/format-converter/format-converter';
import { Home } from './components/pages/home/home';
import { ImageResize } from './components/pages/image-resize/image-resize';
import { TextImage } from './components/pages/text-image/text-image';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'image-to-base64', component: Base64Tool },
  { path: 'base64-to-image', component: TextImage },
  { path: 'remove-background', component: BackgroundRemover },
  { path: 'resize-dimensions', component: ImageResize },
  { path: 'convert-formats', component: FormatConverter },
  { path: 'compress-by-weight', component: Compress },
  { path: 'base64', redirectTo: 'image-to-base64', pathMatch: 'full' },
  { path: 'text-image', redirectTo: 'base64-to-image', pathMatch: 'full' },
  { path: 'background-remover', redirectTo: 'remove-background', pathMatch: 'full' },
  { path: 'image-resize', redirectTo: 'resize-dimensions', pathMatch: 'full' },
  { path: 'format-converter', redirectTo: 'convert-formats', pathMatch: 'full' },
  { path: 'compress', redirectTo: 'compress-by-weight', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
