import { Component, Input } from '@angular/core';
import { CopyButton } from '../copy-button/copy-button';

@Component({
  selector: 'app-output-box',
  standalone: true,
  imports: [CopyButton],
  templateUrl: './output-box.html',
  styleUrl: './output-box.css',
})
export class OutputBox {
  @Input() text: string = '';
}