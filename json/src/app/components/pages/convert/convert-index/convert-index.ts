import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../ui/icon/icon';

interface ConvertTool {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-convert-index',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './convert-index.html',
})
export class ConvertIndex {
  readonly tools: ConvertTool[] = [
    {
      id: 'csv2json',
      label: 'CSV → JSON',
      path: '/convert/csv-to-json',
      icon: 'shuffle',
      description: 'Convert CSV data to JSON format',
    },
    {
      id: 'tsv2json',
      label: 'TSV → JSON',
      path: '/convert/tsv-to-json',
      icon: 'shuffle',
      description: 'Convert TSV (tab-separated) data to JSON',
    },
    {
      id: 'json2csv',
      label: 'JSON → CSV',
      path: '/convert/json-to-csv',
      icon: 'shuffle',
      description: 'Convert JSON array to CSV format',
    },
    {
      id: 'json2tsv',
      label: 'JSON → TSV',
      path: '/convert/json-to-tsv',
      icon: 'shuffle',
      description: 'Convert JSON array to TSV format',
    },
    {
      id: 'json2xml',
      label: 'JSON → XML',
      path: '/convert/json-to-xml',
      icon: 'shuffle',
      description: 'Convert JSON to XML format',
    },
    {
      id: 'json2yaml',
      label: 'JSON → YAML',
      path: '/convert/json-to-yaml',
      icon: 'shuffle',
      description: 'Convert JSON to YAML format',
    },
  ];
}
