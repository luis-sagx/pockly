import { Component, Input, signal, computed, inject, OnDestroy } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './copy-button.html',
})
export class CopyButton implements OnDestroy {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  copied = signal(false);
  error = signal(false);
  t = computed(() => this.languageService.getTranslations());

  @Input() textToCopy: string = '';

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
