import { Component, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-what-percent',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './what-percent.html',
  styleUrl: './what-percent.css',
})
export class WhatPercent {
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
