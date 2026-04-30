import { Component, signal, OnDestroy, inject } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faQrcode, faDownload, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { InputBox } from '../../ui/input-box/input-box';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [FaIconComponent, InputBox],
  templateUrl: './qr-generator.html',
  styleUrl: './qr-generator.css',
})
export class QrGenerator implements OnDestroy {
  private library = inject(FaIconLibrary);

  inputText = signal('');
  qrDataUrl = signal('');
  size = signal<'small' | 'medium' | 'large'>('medium');
  fgColor = signal('#1a1a2e');
  loading = signal(false);
  error = signal('');
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.library.addIcons(faQrcode, faDownload, faCircleExclamation);
  }

  ngOnDestroy(): void { if (this.debounceTimer) clearTimeout(this.debounceTimer); }

  onInputChange(value: string): void { this.inputText.set(value); this.debouncedGenerate(); }
  onSizeChange(value: string): void { this.size.set(value as 'small' | 'medium' | 'large'); if (this.inputText()) this.generate(); }
  onColorChange(color: string): void { this.fgColor.set(color); if (this.inputText()) this.generate(); }

  private debouncedGenerate(): void { if (this.debounceTimer) clearTimeout(this.debounceTimer); this.debounceTimer = setTimeout(() => this.generate(), 300); }

  private async generate(): Promise<void> {
    const text = this.inputText();
    if (!text.trim()) { this.qrDataUrl.set(''); return; }
    this.loading.set(true);
    this.error.set('');
    try {
      const QRCode = (await import('qrcode')).default;
      const sizePx = this.size() === 'small' ? 128 : this.size() === 'medium' ? 256 : 512;
      const dataUrl = await QRCode.toDataURL(text, { width: sizePx, color: { dark: this.fgColor(), light: '#ffffff' }, margin: 2 });
      this.qrDataUrl.set(dataUrl);
    } catch (e) { this.error.set('Failed to generate QR code'); this.qrDataUrl.set(''); }
    finally { this.loading.set(false); }
  }

  download(): void { const dataUrl = this.qrDataUrl(); if (!dataUrl) return; const link = document.createElement('a'); link.download = 'qrcode.png'; link.href = dataUrl; link.click(); }
}