import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import { ScratchpadService } from '../../../services/scratchpad.service';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-scratchpad',
  imports: [FormsModule, TextFieldModule, ToolContent],
  templateUrl: './scratchpad.html',
  styleUrl: './scratchpad.css',
})
export class Scratchpad {
  private scratchpad = inject(ScratchpadService);
  private languageService = inject(LanguageService);
  private destroyRef = inject(DestroyRef);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);

 seoContent = computed(() => TOOL_CONTENT[this.languageService.language()].scratchpad);
  readonly content = this.scratchpad.content;
  readonly updatedAt = this.scratchpad.updatedAt;
  private textarea = viewChild<ElementRef<HTMLTextAreaElement>>('ta');
  private autosize = viewChild(CdkTextareaAutosize);
  private resizeFrame: number | null = null;

  constructor() {
    effect(() => {
      this.content();
      this.scheduleResize();
    });

    afterNextRender(() => this.scheduleResize());

    if (typeof window !== 'undefined') {
      const onPageShow = () => this.scheduleResize();
      window.addEventListener('pageshow', onPageShow);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('pageshow', onPageShow);
        if (this.resizeFrame !== null) cancelAnimationFrame(this.resizeFrame);
      });
    }
  }

  private scheduleResize(): void {
    if (typeof window === 'undefined') return;
    if (this.resizeFrame !== null) return;
    this.resizeFrame = requestAnimationFrame(() => {
      this.resizeFrame = null;
      this.resizeTextarea();
    });
  }

  private resizeTextarea(): void {
    const autosize = this.autosize();
    const textarea = this.textarea()?.nativeElement;
    if (!autosize || !textarea) return;

    const isFocused = document.activeElement === textarea;
    const topBeforeResize = isFocused ? textarea.getBoundingClientRect().top : 0;
    autosize.resizeToFitContent(true);

    if (isFocused) {
      const topDelta = textarea.getBoundingClientRect().top - topBeforeResize;
      if (topDelta !== 0) window.scrollBy({ top: topDelta });
    }
  }

  setContent(value: string): void { this.scratchpad.setContent(value); }
  saveNow(): void { this.scratchpad.flush(); }
  lastUpdated(): string { return this.updatedAt() ? new Date(this.updatedAt()!).toLocaleString() : '—'; }
}
