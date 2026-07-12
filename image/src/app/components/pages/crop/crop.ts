import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  signal,
  ViewChild,
} from '@angular/core';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCropSimple, faDownload, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import Cropper from 'cropperjs';
import { LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { DropZone } from '../../ui/drop-zone/drop-zone';

@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DropZone, ToolContent],
  templateUrl: './crop.html',
  styleUrl: './crop.css',
})
export class Crop implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
  private languageService = inject(LanguageService);

  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].crop);

  // --- state ---
  originalSrc = signal('');
  originalFileName = signal('');
  cropper: Cropper | null = null;
  private objectUrl: string | null = null;
  processing = signal(false);

  width = signal(0);
  height = signal(0);
  x = signal(0);
  y = signal(0);

  labels = computed(() => {
    const lang = this.languageService.getCurrentLanguage();
    return lang === 'es'
      ? {
          cropImage: 'Recortar imagen',
          cropSubtitle: 'Recorta definiendo un rectángulo en píxeles. Recorta tu imagen online.',
          cropOptions: 'Opciones de recorte',
          width: 'Ancho (px)',
          height: 'Altura (px)',
          positionX: 'Posición X (px)',
          positionY: 'Posición Y (px)',
          selectImage: 'Seleccionar imagen',
          cropBtn: 'Recortar imagen',
          changeImage: 'Cambiar imagen',
        }
      : {
          cropImage: 'Crop image',
          cropSubtitle: 'Crop by defining a rectangle in pixels. Crop your image online.',
          cropOptions: 'Crop options',
          width: 'Width (px)',
          height: 'Height (px)',
          positionX: 'Position X (px)',
          positionY: 'Position Y (px)',
          selectImage: 'Select image',
          cropBtn: 'Crop image',
          changeImage: 'Change image',
        };
  });

  constructor(library: FaIconLibrary) {
    library.addIcons(faCropSimple, faDownload, faImage, faTrash);
  }

  ngAfterViewInit(): void {}

  onFileSelected(files: File[]): void {
    const file = files[0];
    if (!file) return;
    this.clearCropper();
    this.originalFileName.set(file.name);
    const url = URL.createObjectURL(file);
    this.objectUrl = url;
    this.originalSrc.set(url);
  }

  /* Called when the <img> element finishes loading the new src */
  onImageLoad(): void {
    this.initCropper();
  }

  /* ------------------ CropperJS v2 (Web Components) ------------------ */
  private initCropper(): void {
    const img = this.imageRef?.nativeElement;
    if (!img) return;

    this.destroyCropper();

    // Grab the container dimensions *before* CropperJS replaces the DOM.
    // We need these because cropper-canvas (a Web Component) does not
    // automatically inherit the parent height from CSS.
    const parentEl = img.parentElement;
    const containerWidth = parentEl?.clientWidth ?? 0;
    const containerHeight = parentEl?.clientHeight ?? 0;

    this.zone.runOutsideAngular(() => {
      const cropper = new Cropper(img);
      this.cropper = cropper;

      // Force the canvas to fill the parent by setting inline styles.
      // CSS alone can't win against the shadow DOM min-height defaults.
      const canvas = cropper.getCropperCanvas();
      if (canvas) {
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
      }

      const cropperImage = cropper.getCropperImage();
      if (!cropperImage) return;

      cropperImage.$ready(() => {
        const selection = cropper.getCropperSelection();
        if (!selection) return;

        // Ensure the image is properly centered and scaled.
        // We temporarily enable movement so $center can do its job.
        cropperImage.translatable = true;
        cropperImage.scalable = true;
        cropperImage.$center('contain');

        // Now lock the image — only the selection box is interactive.
        cropperImage.translatable = false;
        cropperImage.scalable = false;
        cropperImage.rotatable = false;
        cropperImage.skewable = false;

        // Configure initial crop area at 50% coverage, centered
        const naturalW = cropperImage.$image.naturalWidth || img.naturalWidth;
        const naturalH = cropperImage.$image.naturalHeight || img.naturalHeight;
        const cropW = Math.round(naturalW * 0.5);
        const cropH = Math.round(naturalH * 0.5);
        const cropX = Math.round((naturalW - cropW) / 2);
        const cropY = Math.round((naturalH - cropH) / 2);

        selection.$change(cropX, cropY, cropW, cropH);

        // Sync inputs whenever the selection changes (drag, resize)
        selection.addEventListener('change', () => this.syncFromCropper());

        // Initial sync
        this.syncFromCropper();
      });
    });
  }

  private syncFromCropper(): void {
    if (!this.cropper) return;
    const selection = this.cropper.getCropperSelection();
    if (!selection) return;

    this.zone.run(() => {
      this.width.set(Math.round(selection.width));
      this.height.set(Math.round(selection.height));
      this.x.set(Math.round(selection.x));
      this.y.set(Math.round(selection.y));
    });
  }

  onOptionInput(value: number, field: 'width' | 'height' | 'x' | 'y'): void {
    if (!Number.isFinite(value)) return;
    switch (field) {
      case 'width':
        this.width.set(value);
        break;
      case 'height':
        this.height.set(value);
        break;
      case 'x':
        this.x.set(value);
        break;
      case 'y':
        this.y.set(value);
        break;
    }
    this.applyInputsToCropper();
  }

  private applyInputsToCropper(): void {
    if (!this.cropper) return;
    const selection = this.cropper.getCropperSelection();
    if (!selection) return;
    selection.$change(this.x(), this.y(), this.width(), this.height());
  }

  /* --------------- Crop & download --------------- */
  cropImage(): void {
    if (!this.cropper) return;
    this.processing.set(true);

    const selection = this.cropper.getCropperSelection();
    const cropperImage = this.cropper.getCropperImage();
    const cropperCanvas = this.cropper.getCropperCanvas();
    if (!selection || !cropperImage || !cropperCanvas) {
      this.processing.set(false);
      return;
    }

    const img = cropperImage.$image;
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;
    if (!naturalW || !naturalH) {
      this.processing.set(false);
      return;
    }

    // Read the ACTUAL visual geometry from the DOM instead of trusting
    // the transform matrix (which can be stale or incorrectly composed).
    const canvasRect = cropperCanvas.getBoundingClientRect();
    const imageRect = cropperImage.getBoundingClientRect();

    const canvasW = canvasRect.width;
    const canvasH = canvasRect.height;
    if (!canvasW || !canvasH) {
      this.processing.set(false);
      return;
    }

    // Where the image sits inside the canvas (CSS pixels)
    const imageLeft = imageRect.left - canvasRect.left;
    const imageTop = imageRect.top - canvasRect.top;
    const displayedW = imageRect.width;
    const displayedH = imageRect.height;

    // Scale from CSS-displayed size to natural image size
    const scaleX = displayedW ? naturalW / displayedW : 1;
    const scaleY = displayedH ? naturalH / displayedH : 1;

    // Selection bounds in CSS pixels (relative to the canvas)
    const selX = selection.x;
    const selY = selection.y;
    const selW = selection.width;
    const selH = selection.height;

    // Map selection to natural-image coordinates
    const cropX = Math.round((selX - imageLeft) * scaleX);
    const cropY = Math.round((selY - imageTop) * scaleY);
    const cropW = Math.round(selW * scaleX);
    const cropH = Math.round(selH * scaleY);

    // Clamp to image bounds
    const cx = Math.max(0, Math.min(cropX, naturalW - 1));
    const cy = Math.max(0, Math.min(cropY, naturalH - 1));
    const cw = Math.max(1, Math.min(cropW, naturalW - cx));
    const ch = Math.max(1, Math.min(cropH, naturalH - cy));

    // Render at native resolution
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, cw, ch);

    canvas.toBlob(
      (blob: Blob | null) => {
        this.processing.set(false);
        if (!blob) return;
        const name = this.originalFileName()
          ? this.originalFileName().replace(/\.\w+$/, '_cropped.png')
          : 'cropped.png';
        this.downloadBlob(blob, name);
      },
      'image/png',
      1,
    );
  }

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.onFileSelected([file]);
    input.value = '';
  }

  /* --------------- Download helper --------------- */
  private downloadBlob(blob: Blob, name: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  /* --------------- Clear / destroy --------------- */
  clear(): void {
    this.clearCropper();
    this.originalSrc.set('');
    this.originalFileName.set('');
    this.width.set(0);
    this.height.set(0);
    this.x.set(0);
    this.y.set(0);
  }

  private clearCropper(): void {
    this.destroyCropper();
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }

  private destroyCropper(): void {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
  }

  ngOnDestroy(): void {
    this.destroyCropper();
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
  }
}
