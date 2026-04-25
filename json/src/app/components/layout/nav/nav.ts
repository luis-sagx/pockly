import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {}