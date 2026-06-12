import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../../translations';

interface UnitDef {
  key: string;
  name: string;
  symbol: string;
}

const TEMP_UNITS: UnitDef[] = [
  { key: 'celsius', name: 'Celsius', symbol: '°C' },
  { key: 'fahrenheit', name: 'Fahrenheit', symbol: '°F' },
  { key: 'kelvin', name: 'Kelvin', symbol: 'K' },
];

type UnitTranslationKey = 'unit_celsius' | 'unit_fahrenheit' | 'unit_kelvin';

const unitKeyMap: Record<string, UnitTranslationKey> = {
  celsius: 'unit_celsius',
  fahrenheit: 'unit_fahrenheit',
  kelvin: 'unit_kelvin',
};

@Component({
  selector: 'app-temperature-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, FaIconComponent],
  templateUrl: './temperature-converter.html',
  styleUrl: './temperature-converter.css',
})
export class TemperatureConverter implements OnInit {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  fromUnit = signal('celsius');
  toUnit = signal('fahrenheit');
  amount = signal(1);
  decimals = signal(2);
  result = signal(0);

  units = computed(() => {
    const t = this.t();
    return TEMP_UNITS.map((u) => {
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
    const value = this.amount();
    const from = this.fromUnit();
    const to = this.toUnit();
    let celsius: number;
    if (from === 'celsius') celsius = value;
    else if (from === 'fahrenheit') celsius = (value - 32) * (5 / 9);
    else celsius = value - 273.15;
    if (to === 'celsius') this.result.set(celsius);
    else if (to === 'fahrenheit') this.result.set(celsius * (9 / 5) + 32);
    else this.result.set(celsius + 273.15);
  }

  getDecimals(): string {
    return `1.${this.decimals()}-${this.decimals()}`;
  }
}
