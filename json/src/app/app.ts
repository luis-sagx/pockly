import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/layout/footer/footer';
import { Nav } from './components/layout/nav/nav';
import { SeoService } from '@pockly/shared';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private seo = inject(SeoService);
  protected title = 'JSON Tools';
}
