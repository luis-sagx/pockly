import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  tools = [
    { id: 'uppercase', label: 'UPPERCASE', path: '/text-case', icon: 'arrow-up-a-z', description: 'Convert to UPPERCASE' },
    { id: 'lowercase', label: 'lowercase', path: '/text-case', icon: 'arrow-down-a-z', description: 'Convert to lowercase' },
    { id: 'wordcount', label: 'Word Counter', path: '/word-count', icon: 'hashtag', description: 'Count words and characters' },
    { id: 'diff', label: 'Diff Checker', path: '/diff-checker', icon: 'code-branch', description: 'Compare two texts' },
    { id: 'password', label: 'Password Generator', path: '/password-generator', icon: 'key', description: 'Create secure passwords' },
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