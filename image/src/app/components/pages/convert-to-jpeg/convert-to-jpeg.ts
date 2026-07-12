import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';
import { ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../config/tool-content';

@Component({
  selector: 'app-convert-to-jpeg',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './convert-to-jpeg.html',
  styleUrl: './convert-to-jpeg.css',
})
export class ConvertToJpeg extends BaseFormatConverter {
  content = computed(() => SUB_CONTENT[this.languageService.language()]['jpeg']);
  protected override outputFormat = 'jpeg';
  protected override pageTitle = 'convertToJpeg';
  protected override pageDescription = 'convertToJpegDesc';
}
