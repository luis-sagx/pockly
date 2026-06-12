import { Component, Input, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-copy-button',
  imports: [FaIconComponent],
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.css'
})
export class CopyButton {
  @Input() textToCopy: string = '';
  @Input() copyLabel: string = 'Copy';
  @Input() copiedLabel: string = 'Copied';

  copied = signal(false);

  copyText() {
    navigator.clipboard.writeText(this.textToCopy).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}