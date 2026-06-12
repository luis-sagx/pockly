import { Component, signal, computed, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCode, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { OutputBox } from '@pockly/shared';
import { LanguageService } from '@pockly/shared';

@Component({
  selector: 'app-url-encoder',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox],
  templateUrl: './url-encoder.html',
})
export class UrlEncoder {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  input = signal('');
  output = signal('');
  error = signal('');

  constructor() {
    this.library.addIcons(faCode, faTrashCan, faCircleExclamation);
  }

  encode(): void {
    const text = this.input().trim();
    if (!text) {
      this.error.set(this.t().encodeError);
      this.output.set('');
      return;
    }
    this.error.set('');
    this.output.set(encodeURIComponent(text));
  }

  onInputChange(value: string): void {
    this.input.set(value);
    this.error.set('');
  }

  clear(): void {
    this.input.set('');
    this.output.set('');
    this.error.set('');
  }
}
