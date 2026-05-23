import { Component, signal, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface UnitDef {
  key: string;
  name: string;
  symbol: string;
  toBase: number;
}

const WEIGHT_UNITS: UnitDef[] = [
  { key: 'mg', name: 'Milligram', symbol: 'mg', toBase: 0.000001 },
  { key: 'g', name: 'Gram', symbol: 'g', toBase: 0.001 },
  { key: 'kg', name: 'Kilogram', symbol: 'kg', toBase: 1 },
  { key: 'lb', name: 'Pound', symbol: 'lb', toBase: 0.453592 },
  { key: 'oz', name: 'Ounce', symbol: 'oz', toBase: 0.0283495 },
  { key: 'ton', name: 'Metric Ton', symbol: 't', toBase: 1000 },
];

@Component({
  selector: 'app-weight-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, FaIconComponent],
  templateUrl: './weight-converter.html',
  styleUrl: './weight-converter.css',
})
export class WeightConverter implements OnInit {
  fromUnit = signal('g');
  toUnit = signal('lb');
  amount = signal(1);
  decimals = signal(2);
  result = signal(0);

  units = WEIGHT_UNITS;

  ngOnInit(): void {
    this.calculate();
  }

  onFromUnitChange(unit: string): void {
    this.fromUnit.set(unit);
    this.calculate();
  }
  onToUnitChange(unit: string): void {
    this.toUnit.set(unit);
    this.calculate();
  }
  onAmountChange(value: number): void {
    this.amount.set(value);
    this.calculate();
  }
  onDecimalsChange(value: number): void {
    this.decimals.set(value);
    this.calculate();
  }
  swap(): void {
    const from = this.fromUnit();
    const to = this.toUnit();
    this.fromUnit.set(to);
    this.toUnit.set(from);
    this.calculate();
  }

  calculate(): void {
    const amount = this.amount();
    const from = this.fromUnit();
    const to = this.toUnit();
    if (amount === 0) {
      this.result.set(0);
      return;
    }
    const fromDef = WEIGHT_UNITS.find((u) => u.key === from);
    const toDef = WEIGHT_UNITS.find((u) => u.key === to);
    if (!fromDef || !toDef) {
      this.result.set(0);
      return;
    }
    this.result.set((amount * fromDef.toBase) / toDef.toBase);
  }

  getDecimals(): string {
    return `1.${this.decimals()}-${this.decimals()}`;
  }
}
