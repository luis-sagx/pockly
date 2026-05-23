import { Component, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { flattenJson } from '../utils.service';

@Component({
  selector: 'app-utils-flatten',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './utils-flatten.html',
})
export class UtilsFlatten {
  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.error.set('Please enter some JSON'); return; }
      this.output.set(flattenJson(val));
    } catch (err: any) { this.error.set(err.message); }
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
