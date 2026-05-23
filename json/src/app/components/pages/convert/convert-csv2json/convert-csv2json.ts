import { Component, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { csvToJson, getDownloadInfo, downloadFile } from '../convert.service';

@Component({
  selector: 'app-convert-csv2json',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './convert-csv2json.html',
})
export class ConvertCsv2Json {
  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  convert() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.output.set(''); return; }
      this.output.set(csvToJson(val, ','));
    } catch (err: any) { this.error.set(err.message); }
  }

  download() {
    const out = this.output();
    if (!out) return;
    const info = getDownloadInfo(out, 'csv2json');
    downloadFile(info.content, `converted.${info.extension}`, info.mimeType);
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
