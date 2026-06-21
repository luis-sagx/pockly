export interface ProjectLink {
  label: string;
  url: string;
  description?: string;
}

export interface ProjectCategory {
  key: string;
  title: string;
  links: ProjectLink[];
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    key: 'json',
    title: 'JSON Tools',
    links: [
      {
        label: 'Generator',
        url: 'https://pockly-json.vercel.app/generator',
        description: 'Build JSON interactively from scratch',
      },
      {
        label: 'Templates',
        url: 'https://pockly-json.vercel.app/templates',
        description: 'Ready-to-use datasets for testing and prototyping',
      },
      {
        label: 'CSV to JSON',
        url: 'https://pockly-json.vercel.app/convert/csv-to-json',
        description: 'Convert CSV rows into JSON arrays',
      },
      {
        label: 'TSV to JSON',
        url: 'https://pockly-json.vercel.app/convert/tsv-to-json',
        description: 'Convert TSV tables into JSON arrays',
      },
      {
        label: 'JSON to CSV',
        url: 'https://pockly-json.vercel.app/convert/json-to-csv',
        description: 'Export JSON arrays as CSV',
      },
      {
        label: 'JSON to TSV',
        url: 'https://pockly-json.vercel.app/convert/json-to-tsv',
        description: 'Export JSON arrays as TSV',
      },
      {
        label: 'JSON to XML',
        url: 'https://pockly-json.vercel.app/convert/json-to-xml',
        description: 'Transform JSON into XML markup',
      },
      {
        label: 'JSON to YAML',
        url: 'https://pockly-json.vercel.app/convert/json-to-yaml',
        description: 'Transform JSON into YAML documents',
      },
      {
        label: 'Format JSON',
        url: 'https://pockly-json.vercel.app/utils/format',
        description: 'Pretty-print and indent JSON',
      },
      {
        label: 'Minify JSON',
        url: 'https://pockly-json.vercel.app/utils/minify',
        description: 'Remove whitespace from JSON payloads',
      },
      {
        label: 'Sort JSON',
        url: 'https://pockly-json.vercel.app/utils/sort',
        description: 'Sort JSON object keys recursively',
      },
      {
        label: 'Validate JSON',
        url: 'https://pockly-json.vercel.app/utils/validate',
        description: 'Validate JSON syntax instantly',
      },
      {
        label: 'Flatten JSON',
        url: 'https://pockly-json.vercel.app/utils/flatten',
        description: 'Flatten nested JSON into dotted paths',
      },
      {
        label: 'Unflatten JSON',
        url: 'https://pockly-json.vercel.app/utils/unflatten',
        description: 'Rebuild nested JSON from flat keys',
      },
      {
        label: 'Diff JSON',
        url: 'https://pockly-json.vercel.app/utils/diff',
        description: 'Compare two JSON documents side by side',
      },
      {
        label: 'Query JSON',
        url: 'https://pockly-json.vercel.app/utils/query',
        description: 'Query JSON data with JSONPath',
      },
    ],
  },
  {
    key: 'text',
    title: 'Text Tools',
    links: [
      {
        label: 'Text Case',
        url: 'https://pockly-text.vercel.app/text-case',
        description: 'Convert between UPPER, lower, Title, Sentence and more',
      },
      {
        label: 'Word Counter',
        url: 'https://pockly-text.vercel.app/word-count',
        description: 'Count words, characters, sentences and paragraphs',
      },
      {
        label: 'Diff Checker',
        url: 'https://pockly-text.vercel.app/diff-checker',
        description: 'Compare two blocks of text side by side',
      },
      {
        label: 'Password Generator',
        url: 'https://pockly-text.vercel.app/password-generator',
        description: 'Create strong, customisable passwords',
      },
    ],
  },
  {
    key: 'productivity',
    title: 'Productivity Tools',
    links: [
      {
        label: 'Board',
        url: 'https://productivity.pockly.vercel.app/board',
        description: 'Organize tasks by Today, This week and Someday',
      },
      {
        label: 'Habits',
        url: 'https://productivity.pockly.vercel.app/habits',
        description: 'Track recurring routines and daily streaks',
      },
      {
        label: 'Scratchpad',
        url: 'https://productivity.pockly.vercel.app/scratchpad',
        description: 'Capture loose thoughts in a fast autosaving pad',
      },
    ],
  },
  {
    key: 'image',
    title: 'Image Tools',
    links: [
      {
        label: 'Image to Base64',
        url: 'https://pockly-image.vercel.app/image-to-base64',
        description: 'Encode any image to a Base64 data URI',
      },
      {
        label: 'Base64 to Image',
        url: 'https://pockly-image.vercel.app/base64-to-image',
        description: 'Decode a Base64 string back to an image',
      },
      {
        label: 'Remove Background',
        url: 'https://pockly-image.vercel.app/remove-background',
        description: 'Remove image backgrounds automatically',
      },
      {
        label: 'Resize',
        url: 'https://pockly-image.vercel.app/resize-dimensions',
        description: 'Resize images by exact dimensions or percentage',
      },
      {
        label: 'Compress',
        url: 'https://pockly-image.vercel.app/compress-by-weight',
        description: 'Reduce file size while preserving visual quality',
      },
      {
        label: 'Crop',
        url: 'https://pockly-image.vercel.app/crop-image',
        description: 'Crop images to a selected region',
      },
      {
        label: 'PNG Converter',
        url: 'https://pockly-image.vercel.app/convert-to-png',
        description: 'Convert images to PNG format',
      },
      {
        label: 'JPEG Converter',
        url: 'https://pockly-image.vercel.app/convert-to-jpeg',
        description: 'Convert images to JPEG format',
      },
      {
        label: 'WebP Converter',
        url: 'https://pockly-image.vercel.app/convert-to-webp',
        description: 'Convert images to WebP format',
      },
      {
        label: 'BMP Converter',
        url: 'https://pockly-image.vercel.app/convert-to-bmp',
        description: 'Convert images to BMP format',
      },
      {
        label: 'SVG Converter',
        url: 'https://pockly-image.vercel.app/convert-to-svg',
        description: 'Convert images to SVG format',
      },
      {
        label: 'PDF Converter',
        url: 'https://pockly-image.vercel.app/convert-to-pdf',
        description: 'Convert images to PDF format',
      },
    ],
  },
  {
    key: 'calculator',
    title: 'Calculator Tools',
    links: [
      {
        label: 'Percent of Y',
        url: 'https://pockly-calculator.vercel.app/percent-of-y',
        description: 'Calculate what is X% of a given number',
      },
      {
        label: 'What Percent',
        url: 'https://pockly-calculator.vercel.app/what-percent',
        description: 'Find what percentage X is of Y',
      },
      {
        label: 'Percentage Change',
        url: 'https://pockly-calculator.vercel.app/percentage-change',
        description: 'Calculate increase or decrease between two values',
      },
      {
        label: 'Currency Converter',
        url: 'https://pockly-calculator.vercel.app/currency-converter',
        description: 'Convert between currencies with live exchange rates',
      },
      {
        label: 'Length Converter',
        url: 'https://pockly-calculator.vercel.app/length-converter',
        description: 'Convert between meters, feet, inches and more',
      },
      {
        label: 'Weight Converter',
        url: 'https://pockly-calculator.vercel.app/weight-converter',
        description: 'Convert between kg, lbs, oz and more',
      },
      {
        label: 'Temperature Converter',
        url: 'https://pockly-calculator.vercel.app/temperature-converter',
        description: 'Convert between Celsius, Fahrenheit and Kelvin',
      },
      {
        label: 'Volume Converter',
        url: 'https://pockly-calculator.vercel.app/volume-converter',
        description: 'Convert between liters, gallons, cups and more',
      },
      {
        label: 'Speed Converter',
        url: 'https://pockly-calculator.vercel.app/speed-converter',
        description: 'Convert between km/h, mph, knots and more',
      },
    ],
  },
  {
    key: 'url',
    title: 'URL Tools',
    links: [
      {
        label: 'QR Generator',
        url: 'https://pockly-qr.vercel.app/qr-generator',
        description: 'Generate QR codes from text, URLs and more',
      },
      {
        label: 'URL Encoder',
        url: 'https://pockly-qr.vercel.app/url-encoder',
        description: 'Encode special characters for safe URLs',
      },
      {
        label: 'URL Decoder',
        url: 'https://pockly-qr.vercel.app/url-decoder',
        description: 'Decode percent-encoded URLs back to readable text',
      },
      {
        label: 'UTM Builder',
        url: 'https://pockly-qr.vercel.app/utm-builder',
        description: 'Build UTM parameters for campaign tracking',
      },
      {
        label: 'URL Cleaner',
        url: 'https://pockly-qr.vercel.app/url-cleaner',
        description: 'Remove tracking parameters and clean up URLs',
      },
    ],
  },
];
