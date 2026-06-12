/**
 * Shared conversion logic extracted from json-convert.
 * All methods are pure functions — no Angular deps needed.
 */

/** Maximum input size (500 kB) to prevent main-thread freezes. */
export const MAX_INPUT_SIZE = 500 * 1024;

export function validateInputSize(input: string): string | null {
  if (input.length > MAX_INPUT_SIZE) {
    return `Input exceeds ${MAX_INPUT_SIZE / 1024} kB limit. Please reduce the size.`;
  }
  return null;
}

export function csvToJson(csv: string, delimiter: string): string {
  const lines = csv.trim().split('\n');
  if (!lines.length) return '[]';
  const headers = lines[0].split(delimiter).map((h) => unquote(h.trim()));
  const result = lines.slice(1).map((line) => {
    const values = parseCsvLine(line, delimiter);
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || '';
    });
    return obj;
  });
  return JSON.stringify(result, null, 2);
}

export function jsonToDelimited(jsonStr: string, delimiter: string): string {
  const data = JSON.parse(jsonStr);
  const arr = Array.isArray(data) ? data : [data];
  if (!arr.length) return '';
  const headers = Object.keys(arr[0]);
  const rows = arr.map((obj) =>
    headers
      .map((h) => {
        const val = obj[h];
        const str = val === null ? '' : String(val);
        return str.includes(delimiter) || str.includes('"')
          ? `"${str.replace(/"/g, '""')}"`
          : str;
      })
      .join(delimiter),
  );
  return [headers.join(delimiter), ...rows].join('\n');
}

export function jsonToXml(jsonStr: string): string {
  const data = JSON.parse(jsonStr);
  const arr = Array.isArray(data) ? data : [data];
  const convert = (obj: any, tag: string): string => {
    if (obj === null || obj === undefined) return '';
    if (typeof obj !== 'object')
      return `  <${tag}>${escapeXml(String(obj))}</${tag}>`;
    if (Array.isArray(obj))
      return obj.map((item) => convert(item, 'item')).join('\n');
    return Object.entries(obj)
      .map(([key, value]) => convert(value, key))
      .join('\n');
  };
  const xml = arr.map((item, i) => convert(item, `item${i}`)).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<root>\n${xml}\n</root>`;
}

export function jsonToYaml(jsonStr: string): string {
  const data = JSON.parse(jsonStr);
  return toYaml(data, 0);
}

export function getDownloadInfo(
  output: string,
  mode: string,
): { extension: string; mimeType: string; content: string } {
  switch (mode) {
    case 'csv2json':
    case 'json2csv':
      return { extension: 'csv', mimeType: 'text/csv', content: output };
    case 'tsv2json':
    case 'json2tsv':
      return {
        extension: 'tsv',
        mimeType: 'text/tab-separated-values',
        content: output,
      };
    case 'json2xml':
      return { extension: 'xml', mimeType: 'application/xml', content: output };
    case 'json2yaml':
      return { extension: 'yaml', mimeType: 'text/yaml', content: output };
    default:
      return { extension: 'txt', mimeType: 'text/plain', content: output };
  }
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string,
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// -- private helpers --

function toYaml(obj: any, indent: number): string {
  const spaces = '  '.repeat(indent);
  if (obj === null) return 'null';
  if (obj === undefined) return '';
  if (typeof obj === 'boolean') return obj ? 'true' : 'false';
  if (typeof obj === 'number') return String(obj);
  if (typeof obj === 'string') {
    // Quote strings that contain YAML-significant characters or look like special values
    if (
      obj.includes('\n') ||
      obj.includes(':') ||
      obj.includes('#') ||
      /^[\-\[\]\{\}\*\&\!\|>%@`'"]/.test(obj) ||
      /^\s/.test(obj) ||
      /^(true|false|yes|no|on|off|null|~)$/i.test(obj) ||
      /^[0-9.eE+\-]+$/.test(obj)
    )
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    return obj
      .map((item) => `${spaces}- ${toYaml(item, indent + 1)}`)
      .join('\n');
  }
  if (typeof obj === 'object') {
    if (Object.keys(obj).length === 0) return '{}';
    return Object.entries(obj)
      .map(([key, value]) => `${spaces}${key}: ${toYaml(value, indent + 1)}`)
      .join('\n');
  }
  return String(obj);
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') inQuotes = !inQuotes;
    else if (char === delimiter && !inQuotes) {
      result.push(unquote(current));
      current = '';
    } else current += char;
  }
  result.push(unquote(current));
  return result;
}

function unquote(str: string): string {
  return str.replace(/^"|"$/g, '').trim();
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
