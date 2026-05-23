import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../ui/icon/icon';

interface UtilTool {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-utils-index',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './utils-index.html',
})
export class UtilsIndex {
  readonly tools: UtilTool[] = [
    {
      id: 'format',
      label: 'Format',
      path: '/utils/format',
      icon: 'settings',
      description: 'Pretty print with indentation',
    },
    {
      id: 'minify',
      label: 'Minify',
      path: '/utils/minify',
      icon: 'settings',
      description: 'Remove whitespace',
    },
    {
      id: 'sort',
      label: 'Sort Keys',
      path: '/utils/sort',
      icon: 'settings',
      description: 'Sort object keys alphabetically',
    },
    {
      id: 'validate',
      label: 'Validate',
      path: '/utils/validate',
      icon: 'settings',
      description: 'Check if valid JSON',
    },
    {
      id: 'flatten',
      label: 'Flatten',
      path: '/utils/flatten',
      icon: 'settings',
      description: 'Convert nested to flat (key.subkey)',
    },
    {
      id: 'unflatten',
      label: 'Unflatten',
      path: '/utils/unflatten',
      icon: 'settings',
      description: 'Convert flat to nested object',
    },
    {
      id: 'diff',
      label: 'Diff',
      path: '/utils/diff',
      icon: 'settings',
      description: 'Compare two JSON objects',
    },
    {
      id: 'query',
      label: 'Query',
      path: '/utils/query',
      icon: 'settings',
      description: 'Extract values with JSONPath',
    },
  ];
}
