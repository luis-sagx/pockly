import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCodeBranch,
  faExpand,
  faFile,
  faHashtag,
  faHouse,
  faImage,
  faKey,
  faPenToSquare,
  faRepeat,
  faScissors,
  faTextHeight,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../services/language.service';
import { SeoService } from '../../../services/seo.service';

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
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  constructor() {
    this.library.addIcons(
      faImage,
      faScissors,
      faExpand,
      faRepeat,
      faHashtag,
      faTextHeight,
      faCodeBranch,
      faKey,
      faPenToSquare,
      faHouse,
      faFile,
    );
  }

  // Signal para el filtro actual
  filter = signal<string>('all');

  toolsData = [
    {
      id: 'base64',
      labelKey: 'imageToBase64' as const,
      descKey: 'imageToBase64Desc' as const,
      path: '/base64',
      icon: 'image',
      category: 'Image',
    },
    {
      id: 'background-remover',
      labelKey: 'backgroundRemover' as const,
      descKey: 'backgroundRemoverDesc' as const,
      path: '/background-remover',
      icon: 'scissors',
      category: 'Image',
    },
    {
      id: 'image-resize',
      labelKey: 'imageResize' as const,
      descKey: 'imageResizeDesc' as const,
      path: '/image-resize',
      icon: 'expand',
      category: 'Image',
    },
    {
      id: 'convert-to-png',
      labelKey: 'convertToPng' as const,
      descKey: 'convertToPngDesc' as const,
      path: '/convert-to-png',
      icon: 'image',
      category: 'Image',
    },
    {
      id: 'convert-to-jpeg',
      labelKey: 'convertToJpeg' as const,
      descKey: 'convertToJpegDesc' as const,
      path: '/convert-to-jpeg',
      icon: 'image',
      category: 'Image',
    },
    {
      id: 'convert-to-webp',
      labelKey: 'convertToWebp' as const,
      descKey: 'convertToWebpDesc' as const,
      path: '/convert-to-webp',
      icon: 'image',
      category: 'Image',
    },
    {
      id: 'convert-to-bmp',
      labelKey: 'convertToBmp' as const,
      descKey: 'convertToBmpDesc' as const,
      path: '/convert-to-bmp',
      icon: 'image',
      category: 'Image',
    },
    {
      id: 'convert-to-svg',
      labelKey: 'convertToSvg' as const,
      descKey: 'convertToSvgDesc' as const,
      path: '/convert-to-svg',
      icon: 'code-branch',
      category: 'Image',
    },
    {
      id: 'convert-to-pdf',
      labelKey: 'convertToPdf' as const,
      descKey: 'convertToPdfDesc' as const,
      path: '/convert-to-pdf',
      icon: 'file',
      category: 'Image',
    },
  ];

  filteredTools = computed(() => {
    const currentFilter = this.filter();
    const translations = this.t();
    const translatedTools = this.toolsData.map((tool) => ({
      id: tool.id,
      label: translations[tool.labelKey],
      description: translations[tool.descKey],
      path: tool.path,
      icon: tool.icon,
      category: tool.category,
    }));

    if (currentFilter === 'all') {
      return translatedTools;
    }
    return translatedTools.filter((tool) => tool.category === currentFilter);
  });

  ngOnInit() {
    this.seo.setMeta({
      title: 'Image Tools - Free Online Image Utilities',
      description:
        'Free online image tools: base64, background remover, resizer, and format converter.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}
