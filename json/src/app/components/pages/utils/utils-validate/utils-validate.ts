import { Component, signal } from '@angular/core';
import { IconComponent } from '../../../ui/icon/icon';

@Component({
  selector: 'app-utils-validate',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './utils-validate.html',
})
export class UtilsValidate {
  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  apply() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.error.set('Please enter some JSON'); return; }
      JSON.parse(val);
      this.output.set('✓ Valid JSON');
      this.error.set(null);
    } catch (err: any) {
      this.output.set('');
      this.error.set(`Invalid JSON: ${err.message}`);
    }
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
