import { Component, Input, signal, computed, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './copy-button.html',
})
export class CopyButton {
  private library = inject(FaIconLibrary);
  private languageService = inject(LanguageService);

  copied = signal(false);
  t = computed(() => this.languageService.getTranslations());

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
