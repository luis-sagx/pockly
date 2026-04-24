import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  tools = [
    { label: 'Text Case', path: '/text-case', icon: 'fa-font', description: 'UPPER, lower, title case' },
    { label: 'Word Counter', path: '/word-count', icon: 'fa-calculator', description: 'Count words and characters' },
    { label: 'Diff Checker', path: '/diff-checker', icon: 'fa-code-compare', description: 'Compare two texts' },
    { label: 'Password Generator', path: '/password-generator', icon: 'fa-key', description: 'Create secure passwords' },
    { label: 'Quick Notes', path: '/quick-notes', icon: 'fa-sticky-note', description: 'Private auto-saving notes' },
  ];

  ngOnInit() {
    this.seo.setMeta({
      title: 'Text Tools - Free Online Text Utilities',
      description: 'Free online text tools: text case, word counter, diff checker, password generator, and quick notes.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}