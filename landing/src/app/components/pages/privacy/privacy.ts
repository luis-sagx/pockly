import { Component, inject } from '@angular/core';
import { LanguageService } from '@pockly/shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
})
export class Privacy {
  readonly lang = inject(LanguageService).language;
}
