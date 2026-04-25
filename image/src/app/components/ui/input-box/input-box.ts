import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-box.html',
  styleUrl: './input-box.css',
})
export class InputBox implements OnChanges {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholder: string = '';
  @Input() rows: number = 5;
  @Input() multiline: boolean = true;
  @Input() inputClass: string = 'w-full p-4 bg-white border shadow-sm border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500';
  @ViewChild('textareaRef') textareaRef?: ElementRef<HTMLTextAreaElement>;
  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['value'] || changes['multiline']) && this.multiline) {
      queueMicrotask(() => this.adjustTextareaHeight());
    }
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.valueChange.emit(target.value);
    if (this.multiline) this.adjustTextareaHeight(target as HTMLTextAreaElement);
  }
  private adjustTextareaHeight(textarea?: HTMLTextAreaElement): void {
    const element = textarea ?? this.textareaRef?.nativeElement;
    if (!element) return;
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;
  }
}