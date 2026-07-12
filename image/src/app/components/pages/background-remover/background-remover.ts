import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faDownload,
  faImage,
  faScissors,
  faSpinner,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { DropZone } from '../../ui/drop-zone/drop-zone';

// MIT-licensed background removal via transformers.js + BiRefNet_lite (onnx-community, MIT).
// Runs entirely client-side. Model is loaded once and cached by the browser.
const BG_MODEL_ID = 'onnx-community/BiRefNet_lite-ONNX';

type BgSegmenter = {
  model: any;
  processor: any;
  RawImage: any;
};

let bgSegmenterPromise: Promise<BgSegmenter> | null = null;

async function loadBgSegmenter(
  onProgress: (message: string) => void,
): Promise<BgSegmenter> {
  if (bgSegmenterPromise) return bgSegmenterPromise;

  bgSegmenterPromise = (async () => {
    const { AutoModel, AutoProcessor, RawImage, env } = await import(
      '@huggingface/transformers'
    );
    // Only fetch models from the Hugging Face hub, never look for local files.
    env.allowLocalModels = false;

    const hasWebGPU =
      typeof navigator !== 'undefined' && 'gpu' in navigator;

    const progress_callback = (data: any) => {
      if (data?.status === 'progress' && typeof data.progress === 'number') {
        onProgress(`Downloading AI model: ${Math.round(data.progress)}%`);
      }
    };

    const model = await AutoModel.from_pretrained(BG_MODEL_ID, {
      device: hasWebGPU ? 'webgpu' : 'wasm',
      dtype: hasWebGPU ? 'fp16' : 'fp32',
      progress_callback,
    });
    const processor = await AutoProcessor.from_pretrained(BG_MODEL_ID, {
      progress_callback,
    });

    return { model, processor, RawImage };
  })();

  // Reset on failure so a later attempt can retry the download.
  bgSegmenterPromise.catch(() => {
    bgSegmenterPromise = null;
  });

  return bgSegmenterPromise;
}

@Component({
  selector: 'app-background-remover',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './background-remover.html',
  styleUrl: './background-remover.css',
})
export class BackgroundRemover implements OnDestroy {
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].backgroundRemover);

  constructor(library: FaIconLibrary) {
    library.addIcons(faScissors, faDownload, faImage, faTrash, faSpinner);
  }

  originalPreview = signal('');
  resultDataUrl = signal('');
  originalName = signal('');
  originalSizeKb = signal(0);
  loading = signal(false);
  progressMessage = signal('');
  error = signal('');
  resultBlob: Blob | null = null;
  private originalFile: File | null = null;
  private resultObjectUrl: string | null = null;

  onFilesSelected(files: File[]) {
    const file = files[0];
    if (!file) return;
    this.originalFile = file;
    this.originalName.set(file.name);
    this.originalSizeKb.set(Math.round(file.size / 1024));
    this.resultDataUrl.set('');
    this.resultBlob = null;
    this.error.set('');
    this.progressMessage.set('');
    const reader = new FileReader();
    reader.onload = (e) => this.originalPreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  onFileSelectedFromInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.onFilesSelected([file]);
  }

  async removeBackground() {
    if (!this.originalFile) {
      this.error.set(this.languageService.getCurrentLanguage() === 'es' ? 'Por favor selecciona una imagen primero.' : 'Please select an image first.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.resultDataUrl.set('');
    this.progressMessage.set('Loading AI model (first time may take a moment)...');
    try {
      const { model, processor, RawImage } = await loadBgSegmenter((msg) =>
        this.progressMessage.set(msg),
      );

      this.progressMessage.set('Processing image...');

      // Decode the source image and run the segmentation model.
      const image = await RawImage.fromBlob(this.originalFile);
      const { pixel_values } = await processor(image);
      const output = await model({ input_image: pixel_values });

      // BiRefNet outputs a single-channel logit map; sigmoid -> [0,255] alpha.
      const maskTensor = (output.output_image ?? Object.values(output)[0])[0]
        .sigmoid()
        .mul(255)
        .to('uint8');
      const mask = await RawImage.fromTensor(maskTensor).resize(
        image.width,
        image.height,
      );

      const resultBlob = await this.compositeMask(
        this.originalFile,
        mask,
        image.width,
        image.height,
      );

      this.resultBlob = resultBlob;
      // Revoke previous object URL before creating a new one
      this.revokeObjectUrl();
      const url = URL.createObjectURL(resultBlob);
      this.resultObjectUrl = url;
      this.resultDataUrl.set(url);
      this.progressMessage.set('');
    } catch (e: any) {
      this.error.set(e.message ?? 'Background removal failed');
      this.progressMessage.set('');
    } finally {
      this.loading.set(false);
    }
  }

  // Draw the original image and use the mask as its alpha channel -> transparent PNG.
  private async compositeMask(
    file: File,
    mask: { data: Uint8Array | Uint8ClampedArray },
    width: number,
    height: number,
  ): Promise<Blob> {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas not supported');

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const alpha = mask.data;
    for (let i = 0; i < alpha.length; i++) {
      pixels[i * 4 + 3] = alpha[i];
    }
    ctx.putImageData(imageData, 0, 0);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Export failed'))),
        'image/png',
      );
    });
  }

  download() {
    if (!this.resultBlob) return;
    const base = this.originalName().replace(/\.[^.]+$/, '');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(this.resultBlob);
    a.download = `${base}_no-bg.png`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  clear() {
    this.revokeObjectUrl();
    this.originalPreview.set('');
    this.resultDataUrl.set('');
    this.originalFile = null;
    this.resultBlob = null;
    this.error.set('');
    this.progressMessage.set('');
  }

  ngOnDestroy() {
    this.revokeObjectUrl();
  }

  private revokeObjectUrl() {
    if (this.resultObjectUrl) {
      URL.revokeObjectURL(this.resultObjectUrl);
      this.resultObjectUrl = null;
    }
  }
}
