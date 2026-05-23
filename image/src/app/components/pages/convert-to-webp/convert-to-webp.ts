import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';

@Component({
  selector: 'app-convert-to-webp',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone],
  templateUrl: './convert-to-webp.html',
  styleUrl: './convert-to-webp.css',
})
export class ConvertToWebp extends BaseFormatConverter {
  protected override outputFormat = 'webp';
  protected override pageTitle = 'convertToWebp';
  protected override pageDescription = 'convertToWebpDesc';
}
