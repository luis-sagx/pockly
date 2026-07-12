import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@pockly/shared';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.html',
})
export class Terms implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setMeta({
      title: 'Terms of Use - Pockly',
      description:
        'The terms that apply when you use Pockly and its free online tools: acceptable use, accounts, disclaimers, and limitation of liability.',
    });
  }
}
