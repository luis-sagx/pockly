import { Component, inject } from '@angular/core';
import { LanguageService } from '@pockly/shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
})
export class About {
  readonly lang = inject(LanguageService).language;
}
