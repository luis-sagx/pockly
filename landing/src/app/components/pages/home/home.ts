import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { PROJECT_CATEGORIES } from '../../../config/projects';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);
  projectCategories = PROJECT_CATEGORIES;

  ngOnInit() {
    this.seo.setMeta({
      title: 'Pockly - Free Online Tools for Daily Productivity',
      description:
        'Free online productivity tools: word counter, JSON generator, background remover, image resizer, format converter, text case tool, and more. Fast, free, no installation required.',
      keywords:
        'online tools, productivity, word counter, json generator, image tools, background remover',
    });
  }
}
