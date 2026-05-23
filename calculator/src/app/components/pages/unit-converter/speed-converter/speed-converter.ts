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

const SPEED_UNITS: UnitDef[] = [
  { key: 'ms', name: 'Meters/second', symbol: 'm/s', toBase: 1 },
  { key: 'kmh', name: 'Kilometers/hour', symbol: 'km/h', toBase: 0.277778 },
  { key: 'mph', name: 'Miles/hour', symbol: 'mph', toBase: 0.44704 },
  { key: 'knot', name: 'Knot', symbol: 'kn', toBase: 0.514444 },
];

@Component({
  selector: 'app-speed-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, FaIconComponent],
  templateUrl: './speed-converter.html',
  styleUrl: './speed-converter.css',
})
export class SpeedConverter implements OnInit {
  fromUnit = signal('kmh');
  toUnit = signal('mph');
  amount = signal(1);
  decimals = signal(2);
  result = signal(0);

  units = SPEED_UNITS;

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
    const fromDef = SPEED_UNITS.find((u) => u.key === from);
    const toDef = SPEED_UNITS.find((u) => u.key === to);
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
