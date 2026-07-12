import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@pockly/shared';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
})
export class About implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setMeta({
      title: 'About Pockly - Free Online Tools',
      description:
        'Learn what Pockly is, why every tool is free, how your data is handled in the browser, and who builds and maintains the toolkit.',
    });
  }
}
