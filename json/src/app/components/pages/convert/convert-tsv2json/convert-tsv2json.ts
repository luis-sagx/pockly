import { Component, computed, inject, signal } from '@angular/core';
import { OutputBox } from '@pockly/shared';
import type { Translations } from '../../../../translations';
import { IconComponent } from '../../../ui/icon/icon';
import { csvToJson, getDownloadInfo, downloadFile } from '../convert.service';
import { LanguageService } from '@pockly/shared';

@Component({
  selector: 'app-convert-tsv2json',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './convert-tsv2json.html',
})
export class ConvertTsv2Json {
  private languageService = inject(LanguageService);

  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  convert() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.output.set(''); return; }
      this.output.set(csvToJson(val, '\t'));
    } catch (err: any) { this.error.set(err.message); }
  }

  download() {
    const out = this.output();
    if (!out) return;
    const info = getDownloadInfo(out, 'tsv2json');
    downloadFile(info.content, `converted.${info.extension}`, info.mimeType);
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
