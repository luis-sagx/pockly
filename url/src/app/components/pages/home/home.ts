import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faQrcode, faCode, faBullseye, faBroom, faLockOpen } from '@fortawesome/free-solid-svg-icons';

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
    this.library.addIcons(faQrcode, faCode, faBullseye, faBroom, faLockOpen);
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
      id: 'url-encoder',
      label: 'URL Encoder',
      path: '/url-encoder',
      icon: 'code',
      description: 'Encode text and URLs into safe format for query parameters',
      category: 'url-tools',
    },
    {
      id: 'url-decoder',
      label: 'URL Decoder',
      path: '/url-decoder',
      icon: 'lock-open',
      description: 'Decode percent-encoded URLs back to readable text',
      category: 'url-tools',
    },
    {
      id: 'utm-builder',
      label: 'UTM Builder',
      path: '/utm-builder',
      icon: 'bullseye',
      description: 'Build campaign tracking URLs with UTM parameters for marketing',
      category: 'url-tools',
    },
    {
      id: 'url-cleaner',
      label: 'URL Cleaner',
      path: '/url-cleaner',
      icon: 'broom',
      description: 'Remove tracking junk, sort query params, and normalize URLs',
      category: 'url-tools',
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
      description: 'Free online URL utilities: QR generator, encoder, decoder, UTM builder, URL cleaner, and more.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}
