import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';

@Component({
  selector: 'app-convert-to-pdf',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone],
  templateUrl: './convert-to-pdf.html',
  styleUrl: './convert-to-pdf.css',
})
export class ConvertToPdf extends BaseFormatConverter {
  protected override outputFormat = 'pdf';
  protected override pageTitle = 'convertToPdf';
  protected override pageDescription = 'convertToPdfDesc';
}
