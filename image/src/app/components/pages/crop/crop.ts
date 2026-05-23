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
import { LanguageService } from '../../../services/language.service';
import { DropZone } from '../../ui/drop-zone/drop-zone';

@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [CommonModule, FaIconComponent, DropZone],
  templateUrl: './crop.html',
  styleUrl: './crop.css',
})
export class Crop implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
  private languageService = inject(LanguageService);

  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

  t = computed(() => this.languageService.getTranslations());

  // --- state ---
  originalSrc = signal('');
  originalFileName = signal('');
  cropper: Cropper | null = null;
  private objectUrl: string | null = null;

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

    this.zone.runOutsideAngular(() => {
      const cropper = new Cropper(img);
      this.cropper = cropper;

      // Wait for the cropper-image element to be ready
      const cropperImage = cropper.getCropperImage();
      if (!cropperImage) return;

      cropperImage.$ready(() => {
        const selection = cropper.getCropperSelection();
        if (!selection) return;

        // Configure selection: initial crop area at 80% coverage, centered
        const naturalW = cropperImage.$image.naturalWidth || img.naturalWidth;
        const naturalH = cropperImage.$image.naturalHeight || img.naturalHeight;
        const cropW = Math.round(naturalW * 0.8);
        const cropH = Math.round(naturalH * 0.8);
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
    const cropperCanvas = this.cropper.getCropperCanvas();
    if (!cropperCanvas) return;

    cropperCanvas
      .$toCanvas({
        width: this.width() || undefined,
        height: this.height() || undefined,
      })
      .then((canvas: HTMLCanvasElement) => {
        canvas.toBlob(
          (blob: Blob | null) => {
            if (!blob) return;
            const name = this.originalFileName()
              ? this.originalFileName().replace(/\.\w+$/, '_cropped.png')
              : 'cropped.png';
            this.downloadBlob(blob, name);
          },
          'image/png',
          1,
        );
      })
      .catch(() => {
        /* silently ignore canvas generation errors */
      });
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
