import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LanguageService, ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../../config/tool-content';
import type { Translations } from '../../../../translations';

@Component({
  selector: 'app-what-percent',
  standalone: true,
  imports: [CommonModule, DecimalPipe, ToolContent],
  templateUrl: './what-percent.html',
  styleUrl: './what-percent.css',
})
export class WhatPercent {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => SUB_CONTENT[this.languageService.language()]['whatPercent']);

  x = signal(0);
  y = signal(0);

  result = computed(() => {
    const xVal = this.x();
    const yVal = this.y();
    if (!yVal) return 0;
    return (xVal / yVal) * 100;
  });

  onXChange(value: number): void {
    this.x.set(value);
  }
  onYChange(value: number): void {
    this.y.set(value);
  }
}
