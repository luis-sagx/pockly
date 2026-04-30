import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faImage, faScissors, faExpand, faRepeat, faHashtag, faTextHeight, faCodeBranch, faKey, faPenToSquare, faHouse } from '@fortawesome/free-solid-svg-icons';

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
    this.library.addIcons(faImage, faScissors, faExpand, faRepeat, faHashtag, faTextHeight, faCodeBranch, faKey, faPenToSquare, faHouse);
  }

  // Signal para el filtro actual
  filter = signal<string>('all');

  tools: Tool[] = [
    {
      id: 'base64',
      label: 'Base64 Image',
      path: '/base64',
      icon: 'image',
      description: 'Convert images to Base64 data strings and back.',
      category: 'Image',
    },
    {
      id: 'background-remover',
      label: 'Background Remover',
      path: '/background-remover',
      icon: 'scissors',
      description: 'Remove image backgrounds with AI. Get transparent PNGs.',
      category: 'Image',
    },
    {
      id: 'image-resize',
      label: 'Image Resize',
      path: '/image-resize',
      icon: 'expand',
      description: 'Resize images by dimensions or file size in KB.',
      category: 'Image',
    },
    {
      id: 'format-converter',
      label: 'Format Converter',
      path: '/format-converter',
      icon: 'repeat',
      description: 'Convert between PNG, JPEG, WEBP, BMP, SVG, and PDF.',
      category: 'Image',
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
      title: 'Image Tools - Free Online Image Utilities',
      description: 'Free online image tools: base64, background remover, resizer, and format converter.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}