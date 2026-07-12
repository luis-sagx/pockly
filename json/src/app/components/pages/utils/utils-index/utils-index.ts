import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../ui/icon/icon';
import { LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../../config/tool-content';
import type { Translations } from '../../../../translations';

interface UtilTool {
  id: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-utils-index',
  standalone: true,
  imports: [RouterLink, IconComponent, ToolContent],
  templateUrl: './utils-index.html',
})
export class UtilsIndex {
  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].utils);

  readonly tools: UtilTool[] = [
    { id: 'format', path: '/utils/format', icon: 'settings' },
    { id: 'minify', path: '/utils/minify', icon: 'settings' },
    { id: 'sortKeys', path: '/utils/sort', icon: 'settings' },
    { id: 'validate', path: '/utils/validate', icon: 'settings' },
    { id: 'flatten', path: '/utils/flatten', icon: 'settings' },
    { id: 'unflatten', path: '/utils/unflatten', icon: 'settings' },
    { id: 'diff', path: '/utils/diff', icon: 'settings' },
    { id: 'query', path: '/utils/query', icon: 'settings' },
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
