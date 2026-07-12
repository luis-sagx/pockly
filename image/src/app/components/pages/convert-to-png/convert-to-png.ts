import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';
import { ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../config/tool-content';

@Component({
  selector: 'app-convert-to-png',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './convert-to-png.html',
  styleUrl: './convert-to-png.css',
})
export class ConvertToPng extends BaseFormatConverter {
  content = computed(() => SUB_CONTENT[this.languageService.language()]['png']);
  protected override outputFormat = 'png';
  protected override pageTitle = 'convertToPng';
  protected override pageDescription = 'convertToPngDesc';
}
