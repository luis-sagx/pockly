import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-zone.html',
})
export class DropZone {
  @Input() labelText: string = 'Drag and drop an image here';
  @Input() subText: string = 'or click to browse (PNG, JPG, WEBP)';
  @Input() accept: string = 'image/*';
  @Input() multiple: boolean = false;
  @Input() maxFileSize: number = 50 * 1024 * 1024; // 50 MB default
  @Input() maxFileSizeError: string = 'File is too large. Maximum size is 50 MB.';
  @Output() fileSelected = new EventEmitter<File[]>();

  isDragOver = signal(false);
  error = signal('');

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(false);
    const files = event.dataTransfer?.files;
    if (files?.length) this.emitFiles(Array.from(files));
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver.set(true);
  }

  onDragLeave(): void {
    this.isDragOver.set(false);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files?.length) this.emitFiles(Array.from(files));
    input.value = ''; // Reset for same file selection
  }

  private emitFiles(files: File[]): void {
    this.error.set('');
    const validFiles = files.filter((file) => {
      if (!this.isAcceptedFile(file)) return false;
      if (file.size > this.maxFileSize) {
        this.error.set(this.maxFileSizeError);
        return false;
      }
      return true;
    });
    const selected = this.multiple ? validFiles : validFiles.slice(0, 1);
    if (selected.length) this.fileSelected.emit(selected);
  }

  private isAcceptedFile(file: File): boolean {
    const accepted = this.accept
      .split(',')
      .map((rule) => rule.trim().toLowerCase())
      .filter(Boolean);

    if (!accepted.length || accepted.includes('*/*')) return true;

    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    return accepted.some((rule) => {
      if (rule.startsWith('.')) {
        return fileName.endsWith(rule);
      }

      if (rule.endsWith('/*')) {
        const typePrefix = rule.slice(0, -1);
        if (fileType) return fileType.startsWith(typePrefix);
        return rule === 'image/*' ? this.isCommonImageExtension(fileName) : false;
      }

      if (fileType) return fileType === rule;
      return false;
    });
  }

  private isCommonImageExtension(fileName: string): boolean {
    return /\.(png|jpe?g|webp|gif|bmp|svg|avif|heic|heif)$/i.test(fileName);
  }
}
