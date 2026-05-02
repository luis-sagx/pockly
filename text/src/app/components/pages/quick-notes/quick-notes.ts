import { Component, signal, effect, OnInit, OnDestroy, inject, computed, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from '../../../services/language.service';

const STORAGE_KEY = 'pockly-quick-notes';
const DEBOUNCE_MS = 500;

@Component({
  selector: 'app-quick-notes',
  standalone: true,
  templateUrl: './quick-notes.html',
  styleUrl: './quick-notes.css',
})
export class QuickNotes implements OnInit, OnDestroy {
  private languageService = inject(LanguageService);
  private isBrowser: boolean;
  t = computed(() => this.languageService.getTranslations());

  content = signal('');
  saved = signal(false);
  showConfirm = signal(false);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    effect(() => { const text = this.content(); this.debouncedSave(text); });
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) this.content.set(saved);
    }
  }

  ngOnDestroy(): void { if (this.debounceTimer) clearTimeout(this.debounceTimer); }

  onInputChange(value: string): void { this.content.set(value); this.saved.set(false); }

  private debouncedSave(text: string): void {
    if (!this.isBrowser) return;
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, text);
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2000);
    }, DEBOUNCE_MS);
  }

  clear(): void {
    if (!this.showConfirm()) { this.showConfirm.set(true); return; }
    this.content.set('');
    if (this.isBrowser) {
      localStorage.removeItem(STORAGE_KEY);
    }
    this.saved.set(true);
    this.showConfirm.set(false);
    setTimeout(() => this.saved.set(false), 2000);
  }

  cancelClear(): void { this.showConfirm.set(false); }

  exportToPdf(): void {
    if (!this.isBrowser) return;
    
    const content = this.content();
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quick Notes - Export</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 12pt;
            line-height: 1.6;
            color: #1a1a1a;
            padding: 20mm;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            font-size: 18pt;
            margin-bottom: 16pt;
            color: #2d3e2d;
            border-bottom: 1px solid #8b9b8b;
            padding-bottom: 8pt;
          }
          .content { white-space: pre-wrap; word-wrap: break-word; }
          .footer {
            margin-top: 24pt;
            font-size: 9pt;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 8pt;
          }
        </style>
      </head>
      <body>
        <h1>Quick Notes</h1>
        <div class="content">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        <div class="footer">
          <p>Exported from Pockly on ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}