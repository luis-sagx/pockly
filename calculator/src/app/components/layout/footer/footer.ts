import { Component } from '@angular/core';
import { IconComponent } from '../../ui/icon/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}