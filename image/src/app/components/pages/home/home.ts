import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { IconComponent } from '../../ui/icon/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  toolList = [
    { label: 'Base64 Image', path: '/base64', icon: 'image', description: 'Image to Base64 and back' },
    { label: 'Background Remover', path: '/background-remover', icon: 'scissors', description: 'Remove image backgrounds with AI' },
    { label: 'Image Resize', path: '/image-resize', icon: 'maximize', description: 'Resize by dimensions or weight' },
    { label: 'Format Converter', path: '/format-converter', icon: 'repeat', description: 'Convert PNG, JPEG, WEBP, BMP, SVG, PDF' },
  ];

  ngOnInit() {
    this.seo.setMeta({
      title: 'Image Tools - Free Online Image Utilities',
      description: 'Free online image tools: base64, background remover, resizer, and format converter.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}