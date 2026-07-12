import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';
import { ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../config/tool-content';

@Component({
  selector: 'app-convert-to-pdf',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './convert-to-pdf.html',
  styleUrl: './convert-to-pdf.css',
})
export class ConvertToPdf extends BaseFormatConverter {
  content = computed(() => SUB_CONTENT[this.languageService.language()]['pdf']);
  protected override outputFormat = 'pdf';
  protected override pageTitle = 'convertToPdf';
  protected override pageDescription = 'convertToPdfDesc';
}
