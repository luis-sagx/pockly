import { Component, signal, computed, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLockOpen, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '../../ui/input-box/input-box';
import { OutputBox } from '../../ui/output-box/output-box';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-url-decoder',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox],
  templateUrl: './url-decoder.html',
})
export class UrlDecoder {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  input = signal('');
  output = signal('');
  error = signal('');

  constructor() {
    this.library.addIcons(faLockOpen, faTrashCan, faCircleExclamation);
  }

  decode(): void {
    const text = this.input().trim();
    if (!text) {
      this.error.set(this.t().decodeError);
      this.output.set('');
      return;
    }
    this.error.set('');
    try {
      this.output.set(decodeURIComponent(text));
    } catch {
      this.error.set(this.t().invalidEncodedSeq);
      this.output.set('');
    }
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
