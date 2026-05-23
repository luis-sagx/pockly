import { Component, Input, computed, inject, signal } from '@angular/core';
import { IconComponent } from '../icon/icon';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-copy-button',
  imports: [IconComponent],
  templateUrl: './copy-button.html',
  styleUrl: './copy-button.css'
})
export class CopyButton {
  @Input() textToCopy: string = '';

  private languageService = inject(LanguageService);

  copied = signal(false);

  t = computed(() => this.languageService.getTranslations());

  copyText() {
    navigator.clipboard.writeText(this.textToCopy).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
