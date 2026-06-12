import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../../translations';

@Component({
  selector: 'app-what-percent',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './what-percent.html',
  styleUrl: './what-percent.css',
})
export class WhatPercent {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

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
