import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LanguageService, Translations } from '../../../../services/language.service';

interface UnitDef {
  key: string;
  name: string;
  symbol: string;
  toBase: number;
}

const LENGTH_UNITS: UnitDef[] = [
  { key: 'mm', name: 'Millimeter', symbol: 'mm', toBase: 0.001 },
  { key: 'cm', name: 'Centimeter', symbol: 'cm', toBase: 0.01 },
  { key: 'm', name: 'Meter', symbol: 'm', toBase: 1 },
  { key: 'km', name: 'Kilometer', symbol: 'km', toBase: 1000 },
  { key: 'in', name: 'Inch', symbol: 'in', toBase: 0.0254 },
  { key: 'ft', name: 'Foot', symbol: 'ft', toBase: 0.3048 },
  { key: 'yd', name: 'Yard', symbol: 'yd', toBase: 0.9144 },
  { key: 'mi', name: 'Mile', symbol: 'mi', toBase: 1609.344 },
];

type UnitTranslationKey = 'unit_mm' | 'unit_cm' | 'unit_m' | 'unit_km' | 'unit_in' | 'unit_ft' | 'unit_yd' | 'unit_mi';

const unitKeyMap: Record<string, UnitTranslationKey> = {
  mm: 'unit_mm', cm: 'unit_cm', m: 'unit_m', km: 'unit_km',
  in: 'unit_in', ft: 'unit_ft', yd: 'unit_yd', mi: 'unit_mi',
};

@Component({
  selector: 'app-length-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, FaIconComponent],
  templateUrl: './length-converter.html',
  styleUrl: './length-converter.css',
})
export class LengthConverter implements OnInit {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  fromUnit = signal('cm');
  toUnit = signal('in');
  amount = signal(1);
  decimals = signal(2);
  result = signal(0);

  units = computed(() => {
    const t = this.t();
    return LENGTH_UNITS.map((u) => {
      const tk = unitKeyMap[u.key];
      return { ...u, name: tk ? t[tk] : u.name };
    });
  });

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
    const fromDef = LENGTH_UNITS.find((u) => u.key === from);
    const toDef = LENGTH_UNITS.find((u) => u.key === to);
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
