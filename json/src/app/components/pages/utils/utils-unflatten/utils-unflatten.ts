import { Component, computed, inject, signal } from '@angular/core';
import { OutputBox } from '@pockly/shared';
import type { Translations } from '../../../../translations';
import { IconComponent } from '../../../ui/icon/icon';
import { unflattenJson } from '../utils.service';
import { LanguageService } from '@pockly/shared';

@Component({
  selector: 'app-utils-unflatten',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './utils-unflatten.html',
})
export class UtilsUnflatten {
  private languageService = inject(LanguageService);

  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.error.set(this.t().pleaseEnterJson); return; }
      this.output.set(unflattenJson(val));
    } catch (err: any) { this.error.set(err.message); }
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
