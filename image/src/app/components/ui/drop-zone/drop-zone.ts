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
      ? files.filter(f => f.type.startsWith('image/'))
      : files.filter(f => f.type.startsWith('image/')).slice(0, 1);
    if (validFiles.length) this.fileSelected.emit(validFiles);
  }
}