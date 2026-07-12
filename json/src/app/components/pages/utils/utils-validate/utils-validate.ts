import { Component, computed, inject, signal } from '@angular/core';
import { IconComponent } from '../../../ui/icon/icon';
import { LanguageService, ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../../config/tool-content';
import type { Translations } from '../../../../translations';

@Component({
  selector: 'app-utils-validate',
  standalone: true,
  imports: [IconComponent, ToolContent],
  templateUrl: './utils-validate.html',
})
export class UtilsValidate {
  private languageService = inject(LanguageService);

  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => SUB_CONTENT[this.languageService.language()]['validate']);

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.error.set(this.t().pleaseEnterJson); return; }
      JSON.parse(val);
      this.output.set(this.t().validJson);
      this.error.set(null);
    } catch (err: any) {
      this.output.set('');
      this.error.set(`${this.t().invalidJson}: ${err.message}`);
    }
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
