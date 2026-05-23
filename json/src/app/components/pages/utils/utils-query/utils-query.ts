import { Component, computed, inject, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { queryJson } from '../utils.service';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-utils-query',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './utils-query.html',
})
export class UtilsQuery {
  private languageService = inject(LanguageService);

  input = signal('');
  query = signal('');
  output = signal('');
  error = signal<string | null>(null);

  t = computed(() => this.languageService.getTranslations());

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      const q = this.query();
      if (!val.trim()) { this.error.set(this.t().pleaseEnterJson); return; }
      if (!q.trim()) { this.error.set(this.t().pleaseEnterJsonPath); return; }
      this.output.set(queryJson(val, q));
    } catch (err: any) { this.error.set(err.message); }
  }

  clear() { this.input.set(''); this.query.set(''); this.output.set(''); this.error.set(null); }
}
