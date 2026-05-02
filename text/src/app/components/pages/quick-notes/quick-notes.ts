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
}