import { Component, NgZone, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCircleExclamation,
  faDownload,
  faImage,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../../services/language.service';
import { InputBox } from '../../ui/input-box/input-box';

@Component({
  selector: 'app-text-image',
  standalone: true,
  imports: [FormsModule, FaIconComponent, InputBox],
  templateUrl: './text-image.html',
  styleUrl: './text-image.css',
})
export class TextImage {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());
  constructor(
    library: FaIconLibrary,
    private ngZone: NgZone,
  ) {
    library.addIcons(faImage, faSpinner, faTrash, faDownload, faCircleExclamation);
  }

  base64Input = '';
  outputFormat: 'png' | 'jpeg' | 'webp' | 'bmp' = 'png';
  resultImageDataUrl = '';
  loading = false;
  hasError = false;
  errorMessage = '';

  async convert(): Promise<void> {
    if (!this.base64Input.trim()) {
      this.hasError = true;
      this.errorMessage = 'Pega un Base64 válido.';
      return;
    }
    this.loading = true;
    this.hasError = false;
    this.errorMessage = '';
    this.resultImageDataUrl = '';
    try {
      const normalized = this.normalizeBase64(this.base64Input);
      const converted = await this.convertDataUrlFormat(
        normalized,
        this.mimeFromFormat(this.outputFormat),
      );
      this.ngZone.run(() => (this.resultImageDataUrl = converted));
    } catch (e) {
      this.hasError = true;
      this.errorMessage = 'No se pudo convertir. Verifica el Base64.';
    } finally {
      this.loading = false;
    }
  }

  clear(): void {
    this.base64Input = '';
    this.resultImageDataUrl = '';
    this.hasError = false;
    this.errorMessage = '';
  }

  download(): void {
    if (!this.resultImageDataUrl) return;
    const a = document.createElement('a');
    a.href = this.resultImageDataUrl;
    a.download = `image.${this.extensionFromFormat(this.outputFormat)}`;
    a.click();
    URL.revokeObjectURL(a.href);
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
        canvas.toBlob(async (blob) => {
          if (!blob) return reject(new Error('format-not-supported'));
          const dataUrl = await this.readBlobAsDataUrl(blob);
          resolve(dataUrl);
        }, outputMime);
      };
      image.onerror = () => reject(new Error('invalid-base64'));
      image.src = dataUrl;
    });
  }

  private readBlobAsDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) ?? '');
      reader.onerror = () => reject(new Error('blob-read-failed'));
      reader.readAsDataURL(blob);
    });
  }
}
