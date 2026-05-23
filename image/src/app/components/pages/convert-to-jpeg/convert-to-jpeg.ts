import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';

@Component({
  selector: 'app-convert-to-jpeg',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone],
  templateUrl: './convert-to-jpeg.html',
  styleUrl: './convert-to-jpeg.css',
})
export class ConvertToJpeg extends BaseFormatConverter {
  protected override outputFormat = 'jpeg';
  protected override pageTitle = 'convertToJpeg';
  protected override pageDescription = 'convertToJpegDesc';
}
