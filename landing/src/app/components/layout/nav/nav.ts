import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isMenuOpen: boolean = false;

  navLinks: NavLink[] = [
    { label: 'Home', path: '/' },
    { label: 'Word Counter', path: '/word-count' },
    { label: 'Text Case', path: '/text-case' },
    { label: 'Diff Checker', path: '/diff-checker' },
    { label: 'Password Generator', path: '/password-generator' },
    { label: 'Quick Notes', path: '/quick-notes' },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
