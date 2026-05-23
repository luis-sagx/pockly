import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';

@Component({
  selector: 'app-convert-to-bmp',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone],
  templateUrl: './convert-to-bmp.html',
  styleUrl: './convert-to-bmp.css',
})
export class ConvertToBmp extends BaseFormatConverter {
  protected override outputFormat = 'bmp';
  protected override pageTitle = 'convertToBmp';
  protected override pageDescription = 'convertToBmpDesc';
}
