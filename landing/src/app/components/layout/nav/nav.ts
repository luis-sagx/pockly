import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PROJECT_CATEGORIES } from '../../../config/projects';

@Component({
  selector: 'app-nav',
  imports: [CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isMenuOpen: boolean = false;
  categories = PROJECT_CATEGORIES;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
