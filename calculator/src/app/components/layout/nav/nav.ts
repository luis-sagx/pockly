import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, FaIconComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  mobileOpen = signal(false);
  percentOpen = signal(false);
  unitOpen = signal(false);

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }
  closeMobile(): void {
    this.mobileOpen.set(false);
  }
  togglePercent(): void {
    this.percentOpen.update((v) => !v);
    this.unitOpen.set(false);
  }
  toggleUnit(): void {
    this.unitOpen.update((v) => !v);
    this.percentOpen.set(false);
  }
}
