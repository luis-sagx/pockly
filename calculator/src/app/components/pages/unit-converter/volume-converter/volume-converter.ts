import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LanguageService, ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../../config/tool-content';
import type { Translations } from '../../../../translations';

interface UnitDef {
  key: string;
  name: string;
  symbol: string;
  toBase: number;
}

const VOLUME_UNITS: UnitDef[] = [
  { key: 'ml', name: 'Milliliter', symbol: 'mL', toBase: 0.001 },
  { key: 'l', name: 'Liter', symbol: 'L', toBase: 1 },
  { key: 'floz', name: 'Fluid Ounce', symbol: 'fl oz', toBase: 0.0295735 },
  { key: 'cup', name: 'Cup', symbol: 'cup', toBase: 0.236588 },
  { key: 'pint', name: 'Pint', symbol: 'pt', toBase: 0.473176 },
  { key: 'gallon', name: 'Gallon (US)', symbol: 'gal', toBase: 3.78541 },
];

type UnitTranslationKey = 'unit_ml' | 'unit_l' | 'unit_floz' | 'unit_cup' | 'unit_pint' | 'unit_gallon';

const unitKeyMap: Record<string, UnitTranslationKey> = {
  ml: 'unit_ml', l: 'unit_l', floz: 'unit_floz',
  cup: 'unit_cup', pint: 'unit_pint', gallon: 'unit_gallon',
};

@Component({
  selector: 'app-volume-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, FaIconComponent, ToolContent],
  templateUrl: './volume-converter.html',
  styleUrl: './volume-converter.css',
})
export class VolumeConverter implements OnInit {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => SUB_CONTENT[this.languageService.language()]['volume']);

  fromUnit = signal('ml');
  toUnit = signal('cup');
  amount = signal(1);
  decimals = signal(2);
  result = signal(0);

  units = computed(() => {
    const t = this.t();
    return VOLUME_UNITS.map((u) => {
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
    const fromDef = VOLUME_UNITS.find((u) => u.key === from);
    const toDef = VOLUME_UNITS.find((u) => u.key === to);
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
