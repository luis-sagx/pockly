import { Component, signal } from '@angular/core';
import { OutputBox } from '../../../ui/output-box/output-box';
import { IconComponent } from '../../../ui/icon/icon';
import { jsonToXml, getDownloadInfo, downloadFile } from '../convert.service';

@Component({
  selector: 'app-convert-json2xml',
  standalone: true,
  imports: [OutputBox, IconComponent],
  templateUrl: './convert-json2xml.html',
})
export class ConvertJson2Xml {
  input = signal('');
  output = signal('');
  error = signal<string | null>(null);

  convert() {
    this.error.set(null);
    try {
      const val = this.input();
      if (!val.trim()) { this.output.set(''); return; }
      this.output.set(jsonToXml(val));
    } catch (err: any) { this.error.set(err.message); }
  }

  download() {
    const out = this.output();
    if (!out) return;
    const info = getDownloadInfo(out, 'json2xml');
    downloadFile(info.content, `converted.${info.extension}`, info.mimeType);
  }

  clear() { this.input.set(''); this.output.set(''); this.error.set(null); }
}
