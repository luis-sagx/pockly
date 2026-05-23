import { Component, Input, computed, inject } from '@angular/core';
import { CopyButton } from '../copy-button/copy-button';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-output-box',
  standalone: true,
  imports: [CopyButton],
  templateUrl: './output-box.html',
  styleUrl: './output-box.css',
})
export class OutputBox {
  @Input() text: string = '';

  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());
}
