import { Component, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  private library = inject(FaIconLibrary);

  constructor() {
    this.library.addIcons(faLink);
  }
}
