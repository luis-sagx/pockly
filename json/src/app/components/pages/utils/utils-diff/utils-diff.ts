import { Component, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { compareJson } from '../utils.service';

@Component({
  selector: 'app-utils-diff',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './utils-diff.html',
})
export class UtilsDiff {
  input1 = signal('');
  input2 = signal('');
  output = signal('');
  error = signal<string | null>(null);

  apply() {
    this.error.set(null);
    try {
      const v1 = this.input1();
      const v2 = this.input2();
      if (!v1.trim() || !v2.trim()) {
        this.error.set('Please enter JSON in both fields');
        return;
      }
      this.output.set(compareJson(v1, v2));
    } catch (err: any) { this.error.set(err.message); }
  }

  clear() {
    this.input1.set('');
    this.input2.set('');
    this.output.set('');
    this.error.set(null);
  }
}
