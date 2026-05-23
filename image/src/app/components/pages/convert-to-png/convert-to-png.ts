import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';

@Component({
  selector: 'app-convert-to-png',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone],
  templateUrl: './convert-to-png.html',
  styleUrl: './convert-to-png.css',
})
export class ConvertToPng extends BaseFormatConverter {
  protected override outputFormat = 'png';
  protected override pageTitle = 'convertToPng';
  protected override pageDescription = 'convertToPngDesc';
}
