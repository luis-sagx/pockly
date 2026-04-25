import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { Base64Tool } from './components/pages/base64-tool/base64-tool';
import { BackgroundRemover } from './components/pages/background-remover/background-remover';
import { ImageResize } from './components/pages/image-resize/image-resize';
import { FormatConverter } from './components/pages/format-converter/format-converter';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'base64', component: Base64Tool },
  { path: 'background-remover', component: BackgroundRemover },
  { path: 'image-resize', component: ImageResize },
  { path: 'format-converter', component: FormatConverter },
  { path: '**', redirectTo: '/' },
];