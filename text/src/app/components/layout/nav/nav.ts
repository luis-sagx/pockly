import { Component, inject, computed } from '@angular/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());
}