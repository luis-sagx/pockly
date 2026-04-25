import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';
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
    { label: 'QR Generator', path: '/qr-generator', icon: 'qr-code', description: 'Generate QR codes from text and URLs' },
    { label: 'URL Shortener', path: '/url-shortener', icon: 'link', description: 'Shorten long URLs instantly' },
  ];

  ngOnInit() {
    this.seo.setMeta({
      title: 'URL Tools - Free Online Utilities',
      description: 'Free online utilities: QR generator and URL shortener.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}