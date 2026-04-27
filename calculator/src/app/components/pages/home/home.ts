import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../../services/seo.service';
import { IconComponent } from '../../ui/icon/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private seo = inject(SeoService);

  toolList = [
    { label: 'Percentage', path: '/percentage-calculator', icon: 'percent', description: 'Calculate percentages instantly' },
    { label: 'Currency', path: '/currency-converter', icon: 'dollar-sign', description: 'Convert currencies with live rates' },
    { label: 'Unit Converter', path: '/unit-converter', icon: 'ruler', description: 'Length, weight, temperature, and more' },
  ];

  ngOnInit() {
    this.seo.setMeta({
      title: 'Calculator Tools - Free Online Calculators',
      description: 'Free online calculators: percentage, currency, and unit converter.',
    });
  }

  navigate(path: string) {
    window.location.href = path;
  }
}