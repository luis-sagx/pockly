import { Component, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { queryJson } from '../utils.service';

@Component({
  selector: 'app-utils-query',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './utils-query.html',
})
export class UtilsQuery {
  input = signal('');
  query = signal('');
  output = signal('');
  error = signal<string | null>(null);

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      const q = this.query();
      if (!val.trim()) { this.error.set('Please enter some JSON'); return; }
      if (!q.trim()) { this.error.set('Please enter a JSONPath query'); return; }
      this.output.set(queryJson(val, q));
    } catch (err: any) { this.error.set(err.message); }
  }

  clear() { this.input.set(''); this.query.set(''); this.output.set(''); this.error.set(null); }
}
