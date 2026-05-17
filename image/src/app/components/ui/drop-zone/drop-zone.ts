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
  @Output() fileSelected = new EventEmitter<File[]>();

  isDragOver = signal(false);

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
    const validFiles = this.multiple
      ? files.filter((file) => this.isAcceptedFile(file))
      : files.filter((file) => this.isAcceptedFile(file)).slice(0, 1);
    if (validFiles.length) this.fileSelected.emit(validFiles);
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
