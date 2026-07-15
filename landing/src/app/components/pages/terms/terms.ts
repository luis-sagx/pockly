import { Component, inject } from '@angular/core';
import { LanguageService } from '@pockly/shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.html',
})
export class Terms {
  readonly lang = inject(LanguageService).language;
}
