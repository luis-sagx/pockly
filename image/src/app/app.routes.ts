import { Routes } from '@angular/router';
import { BackgroundRemover } from './components/pages/background-remover/background-remover';
import { Base64Tool } from './components/pages/base64-tool/base64-tool';
import { Compress } from './components/pages/compress/compress';
import { ConvertToBmp } from './components/pages/convert-to-bmp/convert-to-bmp';
import { ConvertToJpeg } from './components/pages/convert-to-jpeg/convert-to-jpeg';
import { ConvertToPdf } from './components/pages/convert-to-pdf/convert-to-pdf';
import { ConvertToPng } from './components/pages/convert-to-png/convert-to-png';
import { ConvertToSvg } from './components/pages/convert-to-svg/convert-to-svg';
import { ConvertToWebp } from './components/pages/convert-to-webp/convert-to-webp';
import { Crop } from './components/pages/crop/crop';
import { Home } from './components/pages/home/home';
import { ImageResize } from './components/pages/image-resize/image-resize';
import { TextImage } from './components/pages/text-image/text-image';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'image-to-base64', component: Base64Tool },
  { path: 'base64-to-image', component: TextImage },
  { path: 'remove-background', component: BackgroundRemover },
  { path: 'resize-dimensions', component: ImageResize },
  { path: 'compress-by-weight', component: Compress },
  { path: 'crop-image', component: Crop },
  { path: 'convert-to-png', component: ConvertToPng },
  { path: 'convert-to-jpeg', component: ConvertToJpeg },
  { path: 'convert-to-webp', component: ConvertToWebp },
  { path: 'convert-to-bmp', component: ConvertToBmp },
  { path: 'convert-to-svg', component: ConvertToSvg },
  { path: 'convert-to-pdf', component: ConvertToPdf },
  { path: 'convert-formats', redirectTo: 'convert-to-png', pathMatch: 'full' },
  { path: 'format-converter', redirectTo: 'convert-to-png', pathMatch: 'full' },
  { path: 'base64', redirectTo: 'image-to-base64', pathMatch: 'full' },
  { path: 'text-image', redirectTo: 'base64-to-image', pathMatch: 'full' },
  { path: 'background-remover', redirectTo: 'remove-background', pathMatch: 'full' },
  { path: 'image-resize', redirectTo: 'resize-dimensions', pathMatch: 'full' },
  { path: 'compress', redirectTo: 'compress-by-weight', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
