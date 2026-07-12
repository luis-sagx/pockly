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

// Apache-2.0 background removal via transformers.js + ormbg (onnx-community, Apache-2.0,
// upstream schirrmacher/ormbg, based on the IS-Net/DIS architecture — a CNN, much lighter
// to run on CPU than a transformer backbone). Runs entirely client-side; the model is
// loaded once and cached by the browser.
//
// Uses the library's own `pipeline('background-removal', ...)` helper rather than calling
// AutoModel/AutoProcessor by hand: it auto-detects each model's actual input/output tensor
// names and whether sigmoid is still needed, which is what the model's authors test against
// — hand-rolled code that hardcodes tensor names only works for the one model it was written
// against.
const BG_MODEL_ID = 'onnx-community/ormbg-ONNX';

type BgSegmenter = (image: Blob) => Promise<{ toBlob(type?: string): Promise<Blob> }>;

let bgSegmenterPromise: Promise<BgSegmenter> | null = null;

async function loadBgSegmenter(
  onProgress: (message: string) => void,
): Promise<BgSegmenter> {
  if (bgSegmenterPromise) return bgSegmenterPromise;

  bgSegmenterPromise = (async () => {
    const { pipeline, env } = await import('@huggingface/transformers');
    // Serve everything from our own origin — no third-party CDN at runtime.
    // Assets are placed under public/ by scripts/fetch-bg-assets.mjs at build.
    env.allowLocalModels = true;
    env.allowRemoteModels = false;
    env.localModelPath = '/models/';
    if (env.backends?.onnx?.wasm) {
      env.backends.onnx.wasm.wasmPaths = '/ort/';
    }

    const progress_callback = (data: any) => {
      if (data?.status === 'progress' && typeof data.progress === 'number') {
        onProgress(`Loading AI model: ${Math.round(data.progress)}%`);
      }
    };

    // WASM (CPU) backend: works on every browser, unlike WebGPU which has a
    // per-shader storage-buffer limit some models exceed on some GPUs.
    // dtype 'q8' is transformers.js's own recommended default for WASM — an
    // 8-bit quantized model that uses far less memory than fp32 during
    // inference, which is what avoids out-of-memory crashes on this backend.
    return (await pipeline('background-removal', BG_MODEL_ID, {
      device: 'wasm',
      dtype: 'q8',
      progress_callback,
    })) as unknown as BgSegmenter;
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
      const segmenter = await loadBgSegmenter((msg) => this.progressMessage.set(msg));

      this.progressMessage.set('Processing image...');

      // Runs segmentation and composites the cutout with a transparent
      // background in one step; toBlob() encodes it as a PNG.
      const cutout = await segmenter(this.originalFile);
      const resultBlob = await cutout.toBlob('image/png');

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
