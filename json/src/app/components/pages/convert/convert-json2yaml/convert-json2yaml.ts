import { Component, computed, inject, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { jsonToYaml, getDownloadInfo, downloadFile } from '../convert.service';
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

  t = computed(() => this.languageService.getTranslations());

  convert() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.output.set(''); return; }
      this.output.set(jsonToYaml(val));
    } catch (err: any) { this.error.set(err.message); }
  }

  download() {
    const out = this.output();
    if (!out) return;
    const info = getDownloadInfo(out, 'json2yaml');
    downloadFile(info.content, `converted.${info.extension}`, info.mimeType);
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
