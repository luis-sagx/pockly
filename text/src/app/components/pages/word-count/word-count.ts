import { Component, signal, computed, inject } from '@angular/core';
import { InputBox, LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-word-count',
  standalone: true,
  imports: [InputBox, FaIconComponent, ToolContent],
  templateUrl: './word-count.html',
  styleUrl: './word-count.css',
})
export class WordCount {
  readonly faTrash = faTrash;

  private languageService = inject(LanguageService);

  inputText = signal('');

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].wordCount);

  wordCount = computed(() => this.inputText().trim() ? this.inputText().trim().split(/\s+/).length : 0);
  charCount = computed(() => this.inputText().length);

  clear() {
    this.inputText.set('');
  }
}