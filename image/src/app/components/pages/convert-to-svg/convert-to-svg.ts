import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { BaseFormatConverter } from '../format-converter-base';
import { ToolContent } from '@pockly/shared';
import { SUB_CONTENT } from '../../../config/tool-content';

@Component({
  selector: 'app-convert-to-svg',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './convert-to-svg.html',
  styleUrl: './convert-to-svg.css',
})
export class ConvertToSvg extends BaseFormatConverter {
  content = computed(() => SUB_CONTENT[this.languageService.language()]['svg']);
  protected override outputFormat = 'svg';
  protected override pageTitle = 'convertToSvg';
  protected override pageDescription = 'convertToSvgDesc';
}
