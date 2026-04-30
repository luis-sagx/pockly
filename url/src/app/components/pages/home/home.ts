import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faQrcode, faLink } from '@fortawesome/free-solid-svg-icons';

interface Tool {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);
  private library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faQrcode, faLink);
  }

  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'qr-generator',
      label: 'QR Generator',
      path: '/qr-generator',
      icon: 'qrcode',
      description: 'Generate QR codes from text and URLs with custom colors and sizes',
      category: 'Utilities',
    },
    {
      id: 'url-shortener',
      label: 'URL Shortener',
      path: '/url-shortener',
      icon: 'link',
      description: 'Shorten long URLs instantly with just one click',
      category: 'Utilities',
    },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    if (currentFilter === 'all') {
      return this.tools;
    }
    return this.tools.filter((tool) => tool.category === currentFilter);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'URL Tools - Free Online Utilities',
      description: 'Free online URL utilities: QR generator, URL shortener, and more.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}