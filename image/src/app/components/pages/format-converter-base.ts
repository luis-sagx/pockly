import { computed, inject, signal } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faCircleExclamation,
  faDownload,
  faImage,
  faRepeat,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormatConverterService } from '../../services/format-converter.service';
import { LanguageService } from '../../services/language.service';

export abstract class BaseFormatConverter {
  protected abstract outputFormat: string;
  protected abstract pageTitle: string;
  protected abstract pageDescription: string;

  protected languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  readonly pageTitleText = computed(() => {
    return (this.t() as unknown as Record<string, string>)[this.pageTitle] ?? this.pageTitle;
  });
  readonly pageDescriptionText = computed(() => {
    return (this.t() as unknown as Record<string, string>)[this.pageDescription] ?? this.pageDescription;
  });

  selectedFiles = signal<File[]>([]);
  originalPreview = signal('');
  originalSizeKb = signal(0);
  resultDataUrl = signal('');
  loading = signal(false);
  error = signal('');
  resultBlobs: { name: string; blob: Blob }[] = [];
  convertedCount = signal(0);

  constructor() {
    const library = inject(FaIconLibrary);
    library.addIcons(faDownload, faImage, faSpinner, faTrash, faCircleExclamation, faRepeat);
  }

  onFilesSelected(files: File[]): void {
    this.loadFiles(files);
  }

  onFileSelectedFromInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.loadFiles(Array.from(input.files));
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.loadFiles(Array.from(event.dataTransfer?.files ?? []));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  async convert(): Promise<void> {
    const files = this.selectedFiles();
    if (!files.length) {
      this.error.set('Choose at least one image.');
      return;
    }
    const maxSize = 50 * 1024 * 1024; // 50 MB
    const oversized = files.find((f) => f.size > maxSize);
    if (oversized) {
      this.error.set(`${oversized.name} exceeds the 50 MB size limit.`);
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.resultDataUrl.set('');
    this.convertedCount.set(0);
    this.resultBlobs = [];
    try {
      const settledResults = await Promise.allSettled(
        files.map(async (file) => ({
          name: file.name,
          blob: await FormatConverterService.convertFileToFormat(file, this.outputFormat),
        })),
      );
      const successfulResults = settledResults
        .filter(
          (result): result is PromiseFulfilledResult<{ name: string; blob: Blob }> =>
            result.status === 'fulfilled',
        )
        .map((result) => result.value);
      if (!successfulResults.length) throw new Error('all-conversions-failed');
      this.resultBlobs = successfulResults;
      this.convertedCount.set(successfulResults.length);
      this.resultDataUrl.set(
        await FormatConverterService.blobToDataUrl(successfulResults[0].blob),
      );
      this.downloadAll();
    } catch {
      this.error.set('Failed to convert the selected images.');
    } finally {
      this.loading.set(false);
    }
  }

  downloadAll(): void {
    if (!this.resultBlobs.length) return;
    const ext = FormatConverterService.extensionFromFormat(this.outputFormat);
    if (this.resultBlobs.length > 1) {
      this.downloadAsZip(ext);
      return;
    }
    const result = this.resultBlobs[0];
    const name = result.name.replace(/\.[^.]+$/, '') || 'image';
    this.downloadBlob(result.blob, `${name}.${ext}`);
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  private async downloadAsZip(ext: string): Promise<void> {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    for (const result of this.resultBlobs) {
      const name = result.name.replace(/\.[^.]+$/, '') || 'image';
      zip.file(`${name}.${ext}`, result.blob);
    }
    const content = await zip.generateAsync({ type: 'blob' });
    this.downloadBlob(content, `converted_images_${Date.now()}.zip`);
  }

  clear(): void {
    this.selectedFiles.set([]);
    this.originalPreview.set('');
    this.originalSizeKb.set(0);
    this.resultDataUrl.set('');
    this.convertedCount.set(0);
    this.resultBlobs = [];
    this.error.set('');
  }

  private loadFiles(files: File[]): void {
    if (!files.length) return;
    this.selectedFiles.set(files);
    this.originalSizeKb.set(Math.round(files[0].size / 1024));
    this.resultDataUrl.set('');
    this.convertedCount.set(0);
    this.resultBlobs = [];
    this.error.set('');
    const reader = new FileReader();
    reader.onload = (e) => this.originalPreview.set(e.target?.result as string);
    reader.readAsDataURL(files[0]);
  }
}
