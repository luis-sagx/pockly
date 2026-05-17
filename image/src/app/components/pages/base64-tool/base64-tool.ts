import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCheck,
  faCircleExclamation,
  faImage,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CopyButton } from '../../ui/copy-button/copy-button';
import { DropZone } from '../../ui/drop-zone/drop-zone';
import { InputBox } from '../../ui/input-box/input-box';

@Component({
  selector: 'app-base64-tool',
  standalone: true,
  imports: [InputBox, FormsModule, FaIconComponent, DropZone, CopyButton],
  templateUrl: './base64-tool.html',
  styleUrl: './base64-tool.css',
})
export class Base64Tool {
  constructor(
    library: FaIconLibrary,
    private ngZone: NgZone,
  ) {
    library.addIcons(faImage, faTrash, faSpinner, faCircleExclamation, faCheck);
  }

  mode: 'image-to-base64' | 'base64-to-image' = 'image-to-base64';
  selectedFile: File | null = null;
  selectedImagePreviewUrl = '';
  selectedImageDataUrl = '';
  base64Input = '';
  base64Result = '';
  outputFormat = 'png';
  resultImageDataUrl = '';
  loading = false;
  hasError = false;
  errorMessage = '';

  setMode(mode: 'image-to-base64' | 'base64-to-image'): void {
    if (this.mode === mode) return;
    this.mode = mode;
    this.clearResults();
    this.hasError = false;
    this.errorMessage = '';
  }

  onFilesSelected(files: File[]): void {
    this.revokePreviewUrl();
    this.selectedFile = files[0] ?? null;
    this.selectedImagePreviewUrl = '';
    this.selectedImageDataUrl = '';
    this.clearResults();
    this.hasError = false;
    this.errorMessage = '';

    if (!this.selectedFile) {
      this.selectedImagePreviewUrl = '';
      this.selectedImageDataUrl = '';
      return;
    }

    this.selectedImagePreviewUrl = URL.createObjectURL(this.selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      this.ngZone.run(() => {
        this.selectedImageDataUrl = (reader.result as string) ?? '';
      });
    };
    reader.onerror = () => {
      this.ngZone.run(() => {
        this.selectedImageDataUrl = '';
        this.hasError = true;
        this.errorMessage = 'Could not read the selected image.';
      });
    };
    reader.readAsDataURL(this.selectedFile);
  }

  async convertImageToBase64(): Promise<void> {
    if (!this.selectedFile) {
      this.hasError = true;
      this.errorMessage = 'Select an image.';
      return;
    }
    this.loading = true;
    this.clearResults();
    try {
      const dataUrl =
        this.selectedImageDataUrl || (await this.readFileAsDataUrl(this.selectedFile));
      this.selectedImageDataUrl = dataUrl;
      const commaIndex = dataUrl.indexOf(',');
      this.base64Result = commaIndex > -1 ? dataUrl.slice(commaIndex + 1) : dataUrl;
      this.resultImageDataUrl = '';
    } catch {
      this.hasError = true;
      this.errorMessage = 'Could not convert image to Base64.';
    } finally {
      this.loading = false;
    }
  }

  async convertBase64ToImage(): Promise<void> {
    if (!this.base64Input.trim()) {
      this.hasError = true;
      this.errorMessage = 'Paste a valid Base64 string.';
      return;
    }
    this.loading = true;
    this.clearResults();
    try {
      const normalized = this.normalizeBase64(this.base64Input);
      const converted = await this.convertDataUrlFormat(
        normalized,
        this.mimeFromFormat(this.outputFormat),
      );
      this.resultImageDataUrl = converted;
    } catch {
      this.hasError = true;
      this.errorMessage = 'Could not convert Base64. Verify that it is valid.';
    } finally {
      this.loading = false;
    }
  }

  clear(): void {
    this.revokePreviewUrl();
    this.selectedFile = null;
    this.selectedImagePreviewUrl = '';
    this.selectedImageDataUrl = '';
    this.base64Input = '';
    this.clearResults();
    this.outputFormat = 'png';
    this.hasError = false;
    this.errorMessage = '';
  }

  selectAnotherImage(): void {
    this.revokePreviewUrl();
    this.selectedFile = null;
    this.selectedImagePreviewUrl = '';
    this.selectedImageDataUrl = '';
    this.base64Result = '';
    this.errorMessage = '';
    this.hasError = false;
  }

  private clearResults(): void {
    this.base64Result = '';
    this.resultImageDataUrl = '';
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
