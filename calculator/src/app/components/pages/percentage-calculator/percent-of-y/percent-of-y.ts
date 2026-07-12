import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LanguageService, ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../../config/tool-content';
import type { Translations } from '../../../../translations';

@Component({
  selector: 'app-percent-of-y',
  standalone: true,
  imports: [CommonModule, DecimalPipe, ToolContent],
  templateUrl: './percent-of-y.html',
  styleUrl: './percent-of-y.css',
})
export class PercentOfY {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => SUB_CONTENT[this.languageService.language()]['percentOfY']);

  x = signal(0);
  y = signal(0);

  result = computed(() => {
    const xVal = this.x();
    const yVal = this.y();
    if (!yVal) return 0;
    return (xVal / 100) * yVal;
  });

  onXChange(value: number): void {
    this.x.set(value);
  }
  onYChange(value: number): void {
    this.y.set(value);
  }
}
