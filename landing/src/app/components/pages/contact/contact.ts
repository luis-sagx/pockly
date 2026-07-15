import { Component, inject } from '@angular/core';
import { LanguageService } from '@pockly/shared';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.html',
})
export class Contact {
  readonly lang = inject(LanguageService).language;
}
