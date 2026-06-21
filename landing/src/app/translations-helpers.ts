import type { Translations } from './translations';

export const CATEGORY_TITLE_KEYS: Record<string, keyof Translations> = {
  json: 'catTitleJson',
  text: 'catTitleText',
  image: 'catTitleImage',
  url: 'catTitleUrl',
  calculator: 'catTitleCalculator',
  productivity: 'catTitleProductivity',
};

export const LABEL_TO_SUFFIX: Record<string, Record<string, string>> = {
  json: {
    Generator: 'generator',
    Templates: 'templates',
    Convert: 'convert',
    Utils: 'utils',
    'CSV to JSON': 'csvtojson',
    'TSV to JSON': 'tsvtojson',
    'JSON to CSV': 'jsontocsv',
    'JSON to TSV': 'jsontotsv',
    'JSON to XML': 'jsontoxml',
    'JSON to YAML': 'jsontoyaml',
    'Format JSON': 'formatjson',
    'Minify JSON': 'minifyjson',
    'Sort JSON': 'sortjson',
    'Validate JSON': 'validatejson',
    'Flatten JSON': 'flattenjson',
    'Unflatten JSON': 'unflattenjson',
    'Diff JSON': 'diffjson',
    'Query JSON': 'queryjson',
  },
  text: {
    'Text Case': 'case',
    'Word Counter': 'wordcount',
    'Diff Checker': 'diff',
    'Password Generator': 'password',
    'Quick Notes': 'notes',
    'Spell Checker': 'spell',
  },
  productivity: {
    Board: 'board',
    Habits: 'habits',
    Scratchpad: 'scratchpad',
  },
  image: {
    'Image to Base64': 'base64to',
    'Base64 to Image': 'base64from',
    'Remove Background': 'bgremove',
    Resize: 'resize',
    Compress: 'compress',
    Crop: 'crop',
    'Format Converter': 'format',
    'PNG Converter': 'png',
    'JPEG Converter': 'jpeg',
    'WebP Converter': 'webp',
    'BMP Converter': 'bmp',
    'SVG Converter': 'svg',
    'PDF Converter': 'pdf',
  },
  calculator: {
    'Percent of Y': 'percentof',
    'What Percent': 'whatpercent',
    'Percentage Change': 'percentchange',
    'Currency Converter': 'currency',
    'Length Converter': 'length',
    'Weight Converter': 'weight',
    'Temperature Converter': 'temp',
    'Volume Converter': 'volume',
    'Speed Converter': 'speed',
  },
  url: {
    'QR Generator': 'qr',
    'URL Encoder': 'encode',
    'URL Decoder': 'decode',
    'UTM Builder': 'utm',
    'URL Cleaner': 'clean',
  },
};

/** Maps a category key to its title translation property name. */
export function getCategoryTitleKey(categoryKey: string): keyof Translations {
  return CATEGORY_TITLE_KEYS[categoryKey] ?? 'catTitleJson';
}

/** Maps (category key, original English label) to the link-label translation property name. */
export function getLinkLabelKey(
  categoryKey: string,
  originalLabel: string,
): keyof Translations {
  const suffix = LABEL_TO_SUFFIX[categoryKey]?.[originalLabel];
  if (!suffix) return 'catTitleJson';
  return `linkLabel_${categoryKey}_${suffix}` as keyof Translations;
}

/** Maps (category key, original English label) to the link-description translation property name. */
export function getLinkDescriptionKey(
  categoryKey: string,
  originalLabel: string,
): keyof Translations {
  const suffix = LABEL_TO_SUFFIX[categoryKey]?.[originalLabel];
  if (!suffix) return 'catTitleJson';
  return `linkDesc_${categoryKey}_${suffix}` as keyof Translations;
}
