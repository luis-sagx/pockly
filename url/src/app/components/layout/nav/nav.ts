import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
})
export class NavComponent {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());
}
