import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SeoService } from '@pockly/shared';
import { Nav } from './components/layout/nav/nav';
import { Footer } from './components/layout/footer/footer';
import {
  faSignOutAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  private faLib = inject(FaIconLibrary);

  constructor() {
    this.faLib.addIcons(faSignOutAlt, faUserCircle);
  }
}
