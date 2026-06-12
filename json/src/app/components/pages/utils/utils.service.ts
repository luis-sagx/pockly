/**
 * Shared JSON utility logic extracted from json-utils.
 * All methods are pure functions — no Angular deps needed.
 *
 * Fixes applied:
 *  - flatten: uses Object.keys() instead of for...in, handles arrays, null, and
 *    falsy values correctly
 *  - unflatten: handles numeric keys in dotted paths, avoids prototype pollution
 *  - diff: returns a human-readable side-by-side diff with "added", "removed",
 *    and "changed" sections
 */

/** Maximum input size (500 kB) to prevent main-thread freezes. */
export const MAX_INPUT_SIZE = 500 * 1024;

export function validateInputSize(input: string): string | null {
  if (input.length > MAX_INPUT_SIZE) {
    return `Input exceeds ${MAX_INPUT_SIZE / 1024} kB limit. Please reduce the size.`;
  }
  return null;
}

export function formatJson(jsonStr: string): string {
  return JSON.stringify(JSON.parse(jsonStr), null, 2);
}

export function minifyJson(jsonStr: string): string {
  return JSON.stringify(JSON.parse(jsonStr));
}

export function sortJsonKeys(jsonStr: string): string {
  const obj = JSON.parse(jsonStr);
  return JSON.stringify(sortObjectKeys(obj), null, 2);
}

function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map((item) => sortObjectKeys(item));
  if (obj && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = sortObjectKeys(obj[key]);
          return acc;
        },
        {} as Record<string, any>,
      );
  }
  return obj;
}

// ---- flatten ----

export function flattenJson(jsonStr: string): string {
  const obj = JSON.parse(jsonStr);
  return JSON.stringify(flattenObject(obj), null, 2);
}

function flattenObject(obj: any, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};

  if (obj === null || obj === undefined) {
    result[prefix] = obj;
    return result;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const newKey = prefix ? `${prefix}.${i}` : String(i);
      if (item !== null && typeof item === 'object') {
        Object.assign(result, flattenObject(item, newKey));
      } else {
        result[newKey] = item;
      }
    });
    return result;
  }

  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      result[prefix] = {};
      return result;
    }
    for (const key of keys) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const val = obj[key];
      if (val !== null && typeof val === 'object') {
        Object.assign(result, flattenObject(val, newKey));
      } else {
        result[newKey] = val;
      }
    }
    return result;
  }

  // primitive
  result[prefix] = obj;
  return result;
}

// ---- unflatten ----

export function unflattenJson(jsonStr: string): string {
  const flat = JSON.parse(jsonStr);
  const result: Record<string, any> = {};

  for (const key of Object.keys(flat)) {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      // Protect against prototype pollution
      if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
        break;
      }
      if (!current[k] || typeof current[k] !== 'object') {
        // If next key looks numeric, use array; otherwise object
        const nextKey = keys[i + 1];
        current[k] = /^\d+$/.test(nextKey) ? [] : {};
      }
      current = current[k];
    }
    const lastKey = keys[keys.length - 1];
    if (lastKey !== '__proto__' && lastKey !== 'constructor' && lastKey !== 'prototype') {
      current[lastKey] = flat[key];
    }
  }

  return JSON.stringify(result, null, 2);
}

// ---- diff (improved) ----

export function compareJson(json1: string, json2: string): string {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);

  const added: Record<string, any> = {};
  const removed: Record<string, any> = {};
  const changed: Record<string, { from: any; to: any }> = {};

  diffObjects(obj1, obj2, '', added, removed, changed);

  const lines: string[] = [];

  if (Object.keys(removed).length > 0) {
    lines.push('--- Removed ---');
    for (const [path, value] of Object.entries(removed)) {
      lines.push(`  ${path}: ${formatDiffValue(value)}`);
    }
    lines.push('');
  }

  if (Object.keys(added).length > 0) {
    lines.push('+++ Added +++');
    for (const [path, value] of Object.entries(added)) {
      lines.push(`  ${path}: ${formatDiffValue(value)}`);
    }
    lines.push('');
  }

  if (Object.keys(changed).length > 0) {
    lines.push('*** Changed ***');
    for (const [path, delta] of Object.entries(changed)) {
      lines.push(`  ${path}:`);
      lines.push(`    from: ${formatDiffValue(delta.from)}`);
      lines.push(`    to:   ${formatDiffValue(delta.to)}`);
    }
    lines.push('');
  }

  if (lines.length === 0) return 'JSON objects are identical';

  return lines.join('\n');
}

function formatDiffValue(val: any): string {
  if (val === undefined) return '<undefined>';
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

function diffObjects(
  a: any,
  b: any,
  path: string,
  added: Record<string, any>,
  removed: Record<string, any>,
  changed: Record<string, { from: any; to: any }>,
): void {
  const keysA = a !== null && typeof a === 'object' ? Object.keys(a) : [];
  const keysB = b !== null && typeof b === 'object' ? Object.keys(b) : [];
  const allKeys = [...new Set([...keysA, ...keysB])];

  for (const key of allKeys) {
    // Protect against prototype pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;

    const fullPath = path ? `${path}.${key}` : key;
    const inA = a !== null && typeof a === 'object' && key in a;
    const inB = b !== null && typeof b === 'object' && key in b;

    if (!inA && inB) {
      added[fullPath] = b[key];
    } else if (inA && !inB) {
      removed[fullPath] = a[key];
    } else if (inA && inB) {
      const valA = a[key];
      const valB = b[key];
      if (
        typeof valA === 'object' &&
        valA !== null &&
        typeof valB === 'object' &&
        valB !== null
      ) {
        diffObjects(valA, valB, fullPath, added, removed, changed);
      } else if (JSON.stringify(valA) !== JSON.stringify(valB)) {
        changed[fullPath] = { from: valA, to: valB };
      }
    }
  }
}

// ---- query ----

export function queryJson(jsonStr: string, query: string): string {
  const obj = JSON.parse(jsonStr);
  return JSON.stringify(jsonPath(obj, query), null, 2);
}

function jsonPath(obj: any, path: string): any {
  const keys = path
    .replace(/^\.?\/?/, '')
    .split('.')
    .filter(Boolean);
  let current: any = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return undefined;
    if (key === '*') return current;
    if (key.startsWith('[') && key.endsWith(']')) {
      const idx = key.slice(1, -1);
      if (idx === '*') return current;
      current = current[parseInt(idx)];
    } else {
      current = current[key];
    }
  }
  return current;
}
