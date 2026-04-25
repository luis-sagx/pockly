import { Component, Input } from '@angular/core';
import { CopyButton } from '../copy-button/copy-button';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-output-box',
  standalone: true,
  imports: [CopyButton, IconComponent],
  templateUrl: './output-box.html',
  styleUrl: './output-box.css',
})
export class OutputBox {
  @Input() text: string = '';
}