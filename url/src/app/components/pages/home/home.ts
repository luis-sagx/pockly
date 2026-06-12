import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { LanguageService } from '@pockly/shared';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faQrcode, faCode, faBullseye, faBroom, faLockOpen } from '@fortawesome/free-solid-svg-icons';

interface ToolConfig {
  id: string;
  path: string;
  icon: string;
  category: string;
}

interface ToolDisplay {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
  category: string;
}

const TOOL_CONFIGS: ToolConfig[] = [
  {
    id: 'qr-generator',
    path: '/qr-generator',
    icon: 'qrcode',
    category: 'utilities',
  },
  {
    id: 'url-encoder',
    path: '/url-encoder',
    icon: 'code',
    category: 'url-tools',
  },
  {
    id: 'url-decoder',
    path: '/url-decoder',
    icon: 'lock-open',
    category: 'url-tools',
  },
  {
    id: 'utm-builder',
    path: '/utm-builder',
    icon: 'bullseye',
    category: 'url-tools',
  },
  {
    id: 'url-cleaner',
    path: '/url-cleaner',
    icon: 'broom',
    category: 'url-tools',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private seo = inject(SeoService);
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);
  private router = inject(Router);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  constructor() {
    this.library.addIcons(faQrcode, faCode, faBullseye, faBroom, faLockOpen);
  }

  filter = signal<string>('all');

  tools = computed<ToolDisplay[]>(() => {
    const t = this.t();
    const labelMap: Record<string, string> = {
      'qr-generator': t.qrGenerator,
      'url-encoder': t.urlEncoder,
      'url-decoder': t.urlDecoder,
      'utm-builder': t.utmBuilder,
      'url-cleaner': t.urlCleaner,
    };
    const descMap: Record<string, string> = {
      'qr-generator': t.qrGeneratorDesc,
      'url-encoder': t.urlEncoderDesc,
      'url-decoder': t.urlDecoderDesc,
      'utm-builder': t.utmBuilderDesc,
      'url-cleaner': t.urlCleanerDesc,
    };
    return TOOL_CONFIGS.map((config) => ({
      ...config,
      label: labelMap[config.id] || config.id,
      description: descMap[config.id] || '',
    }));
  });

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    const allTools = this.tools();
    if (currentFilter === 'all') {
      return allTools;
    }
    return allTools.filter((tool) => tool.category === currentFilter);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'URL Tools - Free Online Utilities',
      description:
        'Free online URL utilities: QR generator, encoder, decoder, UTM builder, URL cleaner, and more.',
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
