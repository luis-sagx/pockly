import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-percentage-change',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './percentage-change.html',
  styleUrl: './percentage-change.css',
})
export class PercentageChange {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  x = signal(0);
  y = signal(0);

  result = computed(() => {
    const xVal = this.x();
    const yVal = this.y();
    if (!xVal) return 0;
    return ((yVal - xVal) / xVal) * 100;
  });

  changeLabel = computed(() => {
    const val = this.result();
    if (val > 0) return this.t().increase;
    if (val < 0) return this.t().decrease;
    return this.t().noChange;
  });

  onXChange(value: number): void {
    this.x.set(value);
  }
  onYChange(value: number): void {
    this.y.set(value);
  }
}
