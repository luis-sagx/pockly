import { Component, signal, computed, inject } from '@angular/core';
import { InputBox } from '../../ui/input-box/input-box';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-word-count',
  standalone: true,
  imports: [InputBox],
  templateUrl: './word-count.html',
  styleUrl: './word-count.css',
})
export class WordCount {
  private languageService = inject(LanguageService);

  inputText = signal('');
  fileName = signal<string | null>(null);

  t = computed(() => this.languageService.getTranslations());

  wordCount = computed(() => this.inputText().trim() ? this.inputText().trim().split(/\s+/).length : 0);
  charCount = computed(() => this.inputText().length);

  clear() { 
    this.inputText.set(''); 
    this.fileName.set(null);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileName.set(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      this.inputText.set(content);
    };
    reader.readAsText(file);
  }
}