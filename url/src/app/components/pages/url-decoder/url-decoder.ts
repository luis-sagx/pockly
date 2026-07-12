import { Component, signal, computed, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLockOpen, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { OutputBox } from '@pockly/shared';
import { LanguageService } from '@pockly/shared';

@Component({
  selector: 'app-url-decoder',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox, ToolContent],
  templateUrl: './url-decoder.html',
})
export class UrlDecoder {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].decoder);

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
