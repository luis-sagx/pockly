import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
})
export class NavComponent {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());
}
