import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  constructor(library: FaIconLibrary) {
    library.addIcons(faLink);
  }
}
