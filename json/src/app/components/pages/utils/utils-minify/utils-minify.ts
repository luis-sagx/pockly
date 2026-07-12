import { Component, computed, inject, signal } from '@angular/core';
import { OutputBox, ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../../config/tool-content';
import type { Translations } from '../../../../translations';
import { IconComponent } from '../../../ui/icon/icon';
import { minifyJson } from '../utils.service';
import { LanguageService } from '@pockly/shared';

@Component({
  selector: 'app-utils-minify',
  standalone: true,
  imports: [OutputBox, IconComponent, ToolContent],
  templateUrl: './utils-minify.html',
})
export class UtilsMinify {
  private languageService = inject(LanguageService);

  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => SUB_CONTENT[this.languageService.language()]['minify']);

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.error.set(this.t().pleaseEnterJson); return; }
      this.output.set(minifyJson(val));
    } catch (err: any) { this.error.set(err.message); }
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
