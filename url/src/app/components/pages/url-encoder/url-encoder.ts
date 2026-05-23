import { Component, signal, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCode, faTrashCan, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '../../ui/input-box/input-box';
import { OutputBox } from '../../ui/output-box/output-box';

@Component({
  selector: 'app-url-encoder',
  standalone: true,
  imports: [FaIconComponent, InputBox, OutputBox],
  templateUrl: './url-encoder.html',
  styleUrl: './url-encoder.css',
})
export class UrlEncoder {
  private library = inject(FaIconLibrary);

  input = signal('');
  output = signal('');
  error = signal('');

  constructor() {
    this.library.addIcons(faCode, faTrashCan, faCircleExclamation);
  }

  encode(): void {
    const text = this.input().trim();
    if (!text) {
      this.error.set('Please enter text to encode');
      this.output.set('');
      return;
    }
    this.error.set('');
    this.output.set(encodeURIComponent(text));
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
