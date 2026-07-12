import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBox, LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCodeCompare, faTrash } from '@fortawesome/free-solid-svg-icons';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
}

@Component({
  selector: 'app-diff-checker',
  standalone: true,
  imports: [CommonModule, InputBox, FaIconComponent, ToolContent],
  templateUrl: './diff-checker.html',
})
export class DiffChecker {
  readonly faCodeCompare = faCodeCompare;
  readonly faTrash = faTrash;

  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].diffChecker);

  leftText = signal('');
  rightText = signal('');

  diffLines = signal<DiffLine[]>([]);
  processing = signal(false);
  error = signal('');

  /** Max combined input length before O(m×n) LCS becomes too slow. */
  private readonly MAX_DIFF_INPUT = 50000;

  addedCount = computed(() => this.diffLines().filter((l) => l.type === 'added').length);
  removedCount = computed(() => this.diffLines().filter((l) => l.type === 'removed').length);
  unchangedCount = computed(() => this.diffLines().filter((l) => l.type === 'unchanged').length);
  hasDiff = computed(() => this.diffLines().length > 0);

  computeDiff() {
    this.error.set('');
    const left = this.leftText();
    const right = this.rightText();
    if (left.length + right.length > this.MAX_DIFF_INPUT) {
      this.error.set(`Input too large (${((left.length + right.length) / 1024).toFixed(0)} kB). Max is ${this.MAX_DIFF_INPUT / 1024} kB.`);
      return;
    }
    this.processing.set(true);
    // Use setTimeout to let the UI render the processing state
    setTimeout(() => {
      try {
        const leftLines = left.split('\n');
        const rightLines = right.split('\n');
        const m = leftLines.length, n = rightLines.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            dp[i][j] = leftLines[i - 1] === rightLines[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
          }
        }

        const result: DiffLine[] = [];
        let i = m, j = n;
        while (i > 0 || j > 0) {
          if (i > 0 && j > 0 && leftLines[i - 1] === rightLines[j - 1]) { result.unshift({ type: 'unchanged', text: leftLines[i - 1] }); i--; j--; }
          else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { result.unshift({ type: 'added', text: rightLines[j - 1] }); j--; }
          else { result.unshift({ type: 'removed', text: leftLines[i - 1] }); i--; }
        }
        this.diffLines.set(result);
      } finally {
        this.processing.set(false);
      }
    }, 50);
  }

  clear() { this.leftText.set(''); this.rightText.set(''); this.diffLines.set([]); this.error.set(''); }
}