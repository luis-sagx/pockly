import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@pockly/shared';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
})
export class Contact implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.setMeta({
      title: 'Contact - Pockly',
      description:
        'Get in touch with the Pockly team: report a bug, request a new tool, or send feedback about any of our free online tools.',
    });
  }
}
