import { Component, computed, inject, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { jsonToYaml, getDownloadInfo, downloadFile, validateInputSize } from '../convert.service';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-convert-json2yaml',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './convert-json2yaml.html',
})
export class ConvertJson2Yaml {
  private languageService = inject(LanguageService);

  input = signal('');
  output = signal('');
  error = signal<string | null>(null);
  processing = signal(false);

  t = computed(() => this.languageService.getTranslations());

  convert() {
    this.error.set(null);
    const val = this.input();
    if (!val.trim()) { this.output.set(''); return; }
    const sizeErr = validateInputSize(val);
    if (sizeErr) { this.error.set(sizeErr); return; }
    this.processing.set(true);
    try {
      // Use setTimeout to allow UI to update before heavy computation
      setTimeout(() => {
        try {
          this.output.set(jsonToYaml(val));
        } catch (err: any) {
          this.error.set(err.message);
        } finally {
          this.processing.set(false);
        }
      }, 50);
    } catch (err: any) {
      this.error.set(err.message);
      this.processing.set(false);
    }
  }

  download() {
    const out = this.output();
    if (!out) return;
    const info = getDownloadInfo(out, 'json2yaml');
    downloadFile(info.content, `converted.${info.extension}`, info.mimeType);
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
