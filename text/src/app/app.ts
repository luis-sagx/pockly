import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { Footer } from './components/layout/footer/footer';
import { Nav } from './components/layout/nav/nav';

// Import icons
import {
  faFont,
  faTextHeight,
  faTextWidth,
  faHashtag,
  faCodeBranch,
  faKey,
  faTh,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private faLib = inject(FaIconLibrary);

  constructor() {
this.faLib.addIcons(
      faFont,
      faTextHeight,
      faTextWidth,
      faHashtag,
      faCodeBranch,
      faKey,
      faTh,
    );
  }
}