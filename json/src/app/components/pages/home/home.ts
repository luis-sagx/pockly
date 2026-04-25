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
    { label: 'Generator', path: '/generator', icon: 'wand', description: 'Build JSON objects interactively' },
    { label: 'Templates', path: '/templates', icon: 'copy', description: 'Pre-built JSON structures' },
    { label: 'Convert', path: '/convert', icon: 'shuffle', description: 'JSON to CSV, XML, YAML' },
    { label: 'Utils', path: '/utils', icon: 'settings', description: 'Format, minify, validate' },
  ];

  ngOnInit() {
    this.seo.setMeta({
      title: 'JSON Tools - Free Online JSON Utilities',
      description: 'Free online JSON tools: generator, templates, convert, and utils.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}