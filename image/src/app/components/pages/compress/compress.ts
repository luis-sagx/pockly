import { CommonModule } from '@angular/common';
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
import imageCompression from 'browser-image-compression';
import { LanguageService } from '../../../services/language.service';
import { DropZone } from '../../ui/drop-zone/drop-zone';

@Component({
  selector: 'app-compress',
  standalone: true,
  imports: [CommonModule, FormsModule, FaIconComponent, DropZone],
  templateUrl: './compress.html',
  styleUrl: './compress.css',
})
export class Compress {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  constructor(library: FaIconLibrary) {
    library.addIcons(faDownload, faImage, faSpinner, faTrash, faCircleExclamation);
  }

  originalFile: File | null = null;
  originalPreview = signal('');
  originalSizeKb = signal(0);
  outputFormat = signal<'jpeg' | 'webp' | 'png'>('jpeg');
  loading = signal(false);
  error = signal('');
  resultDataUrl = signal('');
  resultBlob: Blob | null = null;
  resultSizeKb = signal(0);
  resultFileName = signal('');

  compressionLevel = signal<'low' | 'medium' | 'high'>('medium');

  computedTargetKb = computed(() => {
    const originalKb = this.originalSizeKb();
    if (!originalKb) return 200;

    switch (this.compressionLevel()) {
      case 'low':
        return Math.max(50, Math.round(originalKb * 0.6));
      case 'medium':
        return Math.max(30, Math.round(originalKb * 0.35));
      case 'high':
        return Math.max(10, Math.round(originalKb * 0.1));
    }
  });

  onFileSelected(files: File[]) {
    const file = files[0];
    if (!file) return;
    this.originalFile = file;
    this.originalSizeKb.set(Math.round(file.size / 1024));
    this.resultDataUrl.set('');
    this.resultBlob = null;
    this.error.set('');
    const reader = new FileReader();
    reader.onload = (e) => this.originalPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  async process() {
    if (!this.originalFile) {
      this.error.set('Please select an image first.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    try {
      const compressed = await imageCompression(this.originalFile, {
        maxSizeMB: this.computedTargetKb() / 1024,
        fileType: this.mimeFromFormat(this.outputFormat()),
        useWebWorker: true,
      });
      this.resultBlob = compressed;
      this.resultSizeKb.set(Math.round(compressed.size / 1024));
      this.resultFileName.set(
        this.buildName(`compressed.${this.extensionFromFormat(this.outputFormat())}`),
      );
      this.resultDataUrl.set(await this.blobToDataUrl(compressed));
    } catch (e: any) {
      this.error.set(e.message ?? 'Compress failed');
    } finally {
      this.loading.set(false);
    }
  }

  private blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  private buildName(suffix: string): string {
    const name = this.originalFile?.name ?? 'image';
    const dot = name.lastIndexOf('.');
    return dot > -1 ? `${name.slice(0, dot)}_${suffix}` : `${name}_${suffix}`;
  }
  private mimeFromFormat(format: 'jpeg' | 'webp' | 'png'): string {
    if (format === 'webp') return 'image/webp';
    if (format === 'png') return 'image/png';
    return 'image/jpeg';
  }
  private extensionFromFormat(format: 'jpeg' | 'webp' | 'png'): string {
    if (format === 'jpeg') return 'jpg';
    return format;
  }

  download() {
    if (!this.resultBlob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(this.resultBlob);
    a.download = this.resultFileName();
    a.click();
    URL.revokeObjectURL(a.href);
  }
  clear() {
    this.originalFile = null;
    this.originalPreview.set('');
    this.resultDataUrl.set('');
    this.originalSizeKb.set(0);
    this.resultBlob = null;
    this.resultSizeKb.set(0);
    this.resultFileName.set('');
    this.error.set('');
    this.outputFormat.set('jpeg');
    this.compressionLevel.set('medium');
  }
}
