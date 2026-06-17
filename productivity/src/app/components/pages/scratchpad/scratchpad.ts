import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '@pockly/shared';
import { ScratchpadService } from '../../../services/scratchpad.service';
import type { Translations } from '../../../translations';

@Component({ selector: 'app-scratchpad', imports: [FormsModule], templateUrl: './scratchpad.html', styleUrl: './scratchpad.css' })
export class Scratchpad {
  private scratchpad = inject(ScratchpadService);
  private languageService = inject(LanguageService);
  readonly t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  readonly content = this.scratchpad.content;
  readonly updatedAt = this.scratchpad.updatedAt;
  setContent(value: string): void { this.scratchpad.setContent(value); }
  saveNow(): void { this.scratchpad.flush(); }
  lastUpdated(): string { return this.updatedAt() ? new Date(this.updatedAt()!).toLocaleString() : '—'; }
}
