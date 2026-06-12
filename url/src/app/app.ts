import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/layout/nav/nav';
import { FooterComponent } from './components/layout/footer/footer';
import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private seo = inject(SeoService);
  protected readonly title = signal('url');
}
