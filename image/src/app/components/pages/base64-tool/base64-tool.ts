import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faCircleExclamation,
  faImage,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { CopyButton } from '@pockly/shared';
import { DropZone } from '../../ui/drop-zone/drop-zone';

@Component({
  selector: 'app-base64-tool',
  standalone: true,
  imports: [FormsModule, FaIconComponent, DropZone, CopyButton],
  templateUrl: './base64-tool.html',
  styleUrl: './base64-tool.css',
})
export class Base64Tool {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  constructor(library: FaIconLibrary) {
    library.addIcons(faImage, faTrash, faSpinner, faCircleExclamation, faCheck);
  }

  // This page only implements Image -> Base64
  selectedFile: File | null = null;
  selectedImagePreviewUrl = '';
  selectedImageDataUrl = '';
  outputFormat = 'png';

  // Updated after async work (FileReader / await) → signals so the zoneless
  // scheduler re-renders. Plain fields set post-`await` never trigger change
  // detection, leaving the button stuck on "processing".
  base64Result = signal('');
  loading = signal(false);
  hasError = signal(false);
  errorMessage = signal('');

  // Removed mode switching: this component is Image -> Base64 only

  onFilesSelected(files: File[]): void {
    this.revokePreviewUrl();
    this.selectedFile = files[0] ?? null;
    this.selectedImagePreviewUrl = '';
    this.selectedImageDataUrl = '';
    this.clearResults();
    this.hasError.set(false);
    this.errorMessage.set('');

    if (!this.selectedFile) {
      this.selectedImagePreviewUrl = '';
      this.selectedImageDataUrl = '';
      return;
    }

    this.selectedImagePreviewUrl = URL.createObjectURL(this.selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImageDataUrl = (reader.result as string) ?? '';
    };
    reader.onerror = () => {
      this.selectedImageDataUrl = '';
      this.hasError.set(true);
      this.errorMessage.set('Could not read the selected image.');
    };
    reader.readAsDataURL(this.selectedFile);
  }

  async convertImageToBase64(): Promise<void> {
    if (!this.selectedFile) {
      this.hasError.set(true);
      this.errorMessage.set('Select an image.');
      return;
    }
    this.loading.set(true);
    this.clearResults();
    try {
      const dataUrl =
        this.selectedImageDataUrl || (await this.readFileAsDataUrl(this.selectedFile));
      this.selectedImageDataUrl = dataUrl;
      const commaIndex = dataUrl.indexOf(',');
      this.base64Result.set(commaIndex > -1 ? dataUrl.slice(commaIndex + 1) : dataUrl);
      // Only base64 result is kept on this page
    } catch {
      this.hasError.set(true);
      this.errorMessage.set('Could not convert image to Base64.');
    } finally {
      this.loading.set(false);
    }
  }

  // Base64 -> Image removed from this page (moved to text-image page)

  clear(): void {
    this.revokePreviewUrl();
    this.selectedFile = null;
    this.selectedImagePreviewUrl = '';
    this.selectedImageDataUrl = '';
    this.clearResults();
    this.outputFormat = 'png';
    this.hasError.set(false);
    this.errorMessage.set('');
  }

  selectAnotherImage(): void {
    this.revokePreviewUrl();
    this.selectedFile = null;
    this.selectedImagePreviewUrl = '';
    this.selectedImageDataUrl = '';
    this.base64Result.set('');
    this.errorMessage.set('');
    this.hasError.set(false);
  }

  private clearResults(): void {
    this.base64Result.set('');
  }

  private revokePreviewUrl(): void {
    if (this.selectedImagePreviewUrl) {
      URL.revokeObjectURL(this.selectedImagePreviewUrl);
    }
  }

  private readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string) ?? '');
      reader.onerror = () => reject(new Error('file-read-failed'));
      reader.readAsDataURL(file);
    });
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
  private convertDataUrlFormat(dataUrl: string, outputMime: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext('2d');
        if (!context) {
          reject(new Error('canvas-not-supported'));
          return;
        }
        if (outputMime === 'image/jpeg') {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
        context.drawImage(image, 0, 0);
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error('format-not-supported'));
              return;
            }
            resolve(await this.readBlobAsDataUrl(blob));
          },
          outputMime,
          outputMime === 'image/jpeg' ? 0.92 : undefined,
        );
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
