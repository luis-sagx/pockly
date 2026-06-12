import { Component, Input, signal, OnDestroy } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { inject } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './copy-button.html',
})
export class CopyButton implements OnDestroy {
  private library = inject(FaIconLibrary);

  copied = signal(false);
  error = signal(false);

  @Input() textToCopy: string = '';
  @Input() copyLabel: string = 'Copy';
  @Input() copiedLabel: string = 'Copied';

  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.library.addIcons(faCopy, faCheck);
  }

  ngOnDestroy() {
    if (this.copyTimer) clearTimeout(this.copyTimer);
  }

  copyText() {
    navigator.clipboard.writeText(this.textToCopy).then(() => {
      this.copied.set(true);
      this.error.set(false);
      this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {
      this.error.set(true);
    });
  }
}
