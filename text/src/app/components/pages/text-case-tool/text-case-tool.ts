import { Component, inject, computed } from '@angular/core';
import { OutputBox, InputBox, LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faExclamationTriangle,
  faArrowUpAZ,
  faArrowDownAZ,
  faA,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-text-case-tool',
  standalone: true,
  imports: [OutputBox, InputBox, FaIconComponent, ToolContent],
  templateUrl: './text-case-tool.html',
  styleUrl: './text-case-tool.css',
})
export class TextCaseTool {
  readonly faExclamationTriangle = faExclamationTriangle;
  readonly faArrowUpAZ = faArrowUpAZ;
  readonly faArrowDownAZ = faArrowDownAZ;
  readonly faA = faA;
  readonly faTrash = faTrash;

  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].textCase);

  inputText = '';
  outputText = '';
  hasError = false;

  toUpper() {
    if (this.verifyInput()) this.outputText = this.inputText.toUpperCase();
  }

  toLower() {
    if (this.verifyInput()) this.outputText = this.inputText.toLowerCase();
  }

  toCapital() {
    if (this.verifyInput()) {
      this.outputText = this.inputText.toLowerCase().replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    }
  }

  verifyInput(): boolean {
    if (/[a-zA-Z]/.test(this.inputText)) {
      this.hasError = false;
      return true;
    } else {
      this.hasError = true;
      this.outputText = '';
      return false;
    }
  }

  clear() {
    this.inputText = '';
    this.outputText = '';
    this.hasError = false;
  }
}