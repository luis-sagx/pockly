import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  openDropdown = signal<string | null>(null);

  toggleDropdown(name: string) {
    this.openDropdown.update((v) => (v === name ? null : name));
  }

  closeDropdown() {
    this.openDropdown.set(null);
  }
}
