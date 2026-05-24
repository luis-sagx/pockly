import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-licenses-attributions',
  imports: [RouterLink],
  templateUrl: './licenses-attributions.html',
  styleUrl: './licenses-attributions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicensesAttributions {
  private languageService = inject(LanguageService);

  language = this.languageService.language;
  updatedAt = '2026-05-24';
  t = computed(() => this.languageService.getTranslations());

  get title(): string {
    return this.language() === 'es' ? 'Licencias y atribuciones' : 'Licenses & Attributions';
  }

  get summary(): string {
    return this.language() === 'es'
      ? 'Este proyecto utiliza software de terceros. Esta página resume licencias y atribuciones relevantes para distribución pública.'
      : 'This project uses third-party software. This page summarizes licenses and attributions relevant for public distribution.';
  }
}
