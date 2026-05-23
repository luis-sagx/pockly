import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../ui/icon/icon';
import { LanguageService } from '../../../../services/language.service';

interface ConvertTool {
  id: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-convert-index',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './convert-index.html',
})
export class ConvertIndex {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations());

  readonly tools: ConvertTool[] = [
    { id: 'csvToJson', path: '/convert/csv-to-json', icon: 'shuffle' },
    { id: 'tsvToJson', path: '/convert/tsv-to-json', icon: 'shuffle' },
    { id: 'jsonToCsv', path: '/convert/json-to-csv', icon: 'shuffle' },
    { id: 'jsonToTsv', path: '/convert/json-to-tsv', icon: 'shuffle' },
    { id: 'jsonToXml', path: '/convert/json-to-xml', icon: 'shuffle' },
    { id: 'jsonToYaml', path: '/convert/json-to-yaml', icon: 'shuffle' },
  ];

  getToolLabel(toolId: string): string {
    const tr = this.t() as unknown as Record<string, string>;
    return tr[toolId] || toolId;
  }

  getToolDesc(toolId: string): string {
    const tr = this.t() as unknown as Record<string, string>;
    return tr[toolId + 'Desc'] || '';
  }
}
