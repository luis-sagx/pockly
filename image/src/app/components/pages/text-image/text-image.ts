import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCircleExclamation,
  faDownload,
  faImage,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { InputBox } from '@pockly/shared';

@Component({
  selector: 'app-text-image',
  standalone: true,
  imports: [FormsModule, FaIconComponent, InputBox],
  templateUrl: './text-image.html',
  styleUrl: './text-image.css',
})
export class TextImage {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);
  constructor(library: FaIconLibrary) {
    library.addIcons(faImage, faSpinner, faTrash, faDownload, faCircleExclamation);
  }

  // Two-way bound via user events (safe to keep as plain fields in zoneless).
  base64Input = '';
  outputFormat: 'png' | 'jpeg' | 'webp' | 'bmp' = 'png';

  // Updated after async work → must be signals so the zoneless scheduler
  // re-renders. Plain fields mutated post-`await` never trigger change
  // detection and leave the UI stuck on the loading state.
  resultImageDataUrl = signal('');
  loading = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  async convert(): Promise<void> {
    if (!this.base64Input.trim()) {
      this.hasError.set(true);
      this.errorMessage.set('Pega un Base64 válido.');
      return;
    }
    this.loading.set(true);
    this.hasError.set(false);
    this.errorMessage.set('');
    this.resultImageDataUrl.set('');
    try {
      const normalized = this.normalizeBase64(this.base64Input);
      const converted = await this.convertDataUrlFormat(
        normalized,
        this.mimeFromFormat(this.outputFormat),
      );
      this.resultImageDataUrl.set(converted);
    } catch (e) {
      this.hasError.set(true);
      this.errorMessage.set('No se pudo convertir. Verifica el Base64.');
    } finally {
      this.loading.set(false);
    }
  }

  clear(): void {
    this.base64Input = '';
    this.resultImageDataUrl.set('');
    this.hasError.set(false);
    this.errorMessage.set('');
  }

  download(): void {
    const dataUrl = this.resultImageDataUrl();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `image.${this.extensionFromFormat(this.outputFormat)}`;
    a.click();
  }

  private normalizeBase64(value: string): string {
    const trimmed = value.trim();
    if (trimmed.startsWith('data:')) return trimmed;
    return `data:image/png;base64,${trimmed.replace(/\s/g, '')}`;
  }

  private mimeFromFormat(format: string): string {
    switch (format) {
      case 'jpeg':
        return 'image/jpeg';
      case 'webp':
        return 'image/webp';
      case 'bmp':
        return 'image/bmp';
      default:
        return 'image/png';
    }
  }

  private extensionFromFormat(format: string): string {
    return format === 'jpeg' ? 'jpg' : format;
  }

  private convertDataUrlFormat(dataUrl: string, outputMime: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('canvas-not-supported'));
        if (outputMime === 'image/jpeg') {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(image, 0, 0);
        resolve(canvas.toDataURL(outputMime));
      };
      image.onerror = () => reject(new Error('invalid-base64'));
      image.src = dataUrl;
    });
  }
}
