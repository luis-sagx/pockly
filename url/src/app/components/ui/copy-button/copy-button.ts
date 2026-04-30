import { Component, Input, signal, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.css'
})
export class CopyButton {
  private library = inject(FaIconLibrary);
  copied = signal(false);

  @Input() textToCopy: string = '';

  constructor() {
    this.library.addIcons(faCopy, faCheck);
  }

  copyText() {
    navigator.clipboard.writeText(this.textToCopy).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}