import { Component, signal, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faLockOpen, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '../../ui/input-box/input-box';
import { OutputBox } from '../../ui/output-box/output-box';

@Component({
  selector: 'app-url-decoder',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox],
  templateUrl: './url-decoder.html',
  styleUrl: './url-decoder.css',
})
export class UrlDecoder {
  private library = inject(FaIconLibrary);

  input = signal('');
  output = signal('');
  error = signal('');

  constructor() {
    this.library.addIcons(faLockOpen, faTrashCan, faCircleExclamation);
  }

  decode(): void {
    const text = this.input().trim();
    if (!text) {
      this.error.set('Please enter text to decode');
      this.output.set('');
      return;
    }
    this.error.set('');
    try {
      this.output.set(decodeURIComponent(text));
    } catch {
      this.error.set('Failed to decode. The input may contain invalid encoded sequences.');
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
