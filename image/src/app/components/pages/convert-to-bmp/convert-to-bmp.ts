import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';
import { ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../config/tool-content';

@Component({
  selector: 'app-convert-to-bmp',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './convert-to-bmp.html',
  styleUrl: './convert-to-bmp.css',
})
export class ConvertToBmp extends BaseFormatConverter {
  content = computed(() => SUB_CONTENT[this.languageService.language()]['bmp']);
  protected override outputFormat = 'bmp';
  protected override pageTitle = 'convertToBmp';
  protected override pageDescription = 'convertToBmpDesc';
}
