import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@pockly/shared';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
})
export class Privacy implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setMeta({
      title: 'Privacy Policy - Pockly',
      description:
        'How Pockly handles your data: local browser processing, cookies, advertising (Google AdSense), analytics, and your rights.',
    });
  }
}
