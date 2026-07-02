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
        url: 'https://json.pockly.uk/generator',
        description: 'Build JSON interactively from scratch',
      },
      {
        label: 'Templates',
        url: 'https://json.pockly.uk/templates',
        description: 'Ready-to-use datasets for testing and prototyping',
      },
      {
        label: 'Convert',
        url: 'https://json.pockly.uk/convert',
        description: 'Convert between CSV, TSV, XML and YAML',
      },
      {
        label: 'Utils',
        url: 'https://json.pockly.uk/utils',
        description:
          'Format, minify, sort, validate, flatten, diff and query JSON',
      },
    ],
  },
  {
    key: 'text',
    title: 'Text Tools',
    links: [
      {
        label: 'Text Case',
        url: 'https://text.pockly.uk/text-case',
        description: 'Convert between UPPER, lower, Title, Sentence and more',
      },
      {
        label: 'Word Counter',
        url: 'https://text.pockly.uk/word-count',
        description: 'Count words, characters, sentences and paragraphs',
      },
      {
        label: 'Diff Checker',
        url: 'https://text.pockly.uk/diff-checker',
        description: 'Compare two blocks of text side by side',
      },
      {
        label: 'Password Generator',
        url: 'https://text.pockly.uk/password-generator',
        description: 'Create strong, customisable passwords',
      },
    ],
  },
  {
    key: 'productivity',
    title: 'Flow',
    links: [
      {
        label: 'Board',
        url: 'https://flow.pockly.uk/board',
        description: 'Organize tasks by Today, This week and Someday',
      },
      {
        label: 'Habits',
        url: 'https://flow.pockly.uk/habits',
        description: 'Track recurring routines and daily streaks',
      },
      {
        label: 'Scratchpad',
        url: 'https://flow.pockly.uk/scratchpad',
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
        url: 'https://image.pockly.uk/image-to-base64',
        description: 'Encode any image to a Base64 data URI',
      },
      {
        label: 'Base64 to Image',
        url: 'https://image.pockly.uk/base64-to-image',
        description: 'Decode a Base64 string back to an image',
      },
      {
        label: 'Remove Background',
        url: 'https://image.pockly.uk/remove-background',
        description: 'Remove image backgrounds automatically',
      },
      {
        label: 'Resize',
        url: 'https://image.pockly.uk/resize-dimensions',
        description: 'Resize images by exact dimensions or percentage',
      },
      {
        label: 'Compress',
        url: 'https://image.pockly.uk/compress-by-weight',
        description: 'Reduce file size while preserving visual quality',
      },
      {
        label: 'Crop',
        url: 'https://image.pockly.uk/crop-image',
        description: 'Crop images to a selected region',
      },
      {
        label: 'Format Converter',
        url: 'https://image.pockly.uk/convert-to-png',
        description: 'Convert between PNG, JPEG, WebP, BMP, SVG and PDF',
      },
    ],
  },
  {
    key: 'calculator',
    title: 'Calculator Tools',
    links: [
      {
        label: 'Percent of Y',
        url: 'https://calculator.pockly.uk/percent-of-y',
        description: 'Calculate what is X% of a given number',
      },
      {
        label: 'What Percent',
        url: 'https://calculator.pockly.uk/what-percent',
        description: 'Find what percentage X is of Y',
      },
      {
        label: 'Percentage Change',
        url: 'https://calculator.pockly.uk/percentage-change',
        description: 'Calculate increase or decrease between two values',
      },
      {
        label: 'Currency Converter',
        url: 'https://calculator.pockly.uk/currency-converter',
        description: 'Convert between currencies with live exchange rates',
      },
      {
        label: 'Length Converter',
        url: 'https://calculator.pockly.uk/length-converter',
        description: 'Convert between meters, feet, inches and more',
      },
      {
        label: 'Weight Converter',
        url: 'https://calculator.pockly.uk/weight-converter',
        description: 'Convert between kg, lbs, oz and more',
      },
      {
        label: 'Temperature Converter',
        url: 'https://calculator.pockly.uk/temperature-converter',
        description: 'Convert between Celsius, Fahrenheit and Kelvin',
      },
      {
        label: 'Volume Converter',
        url: 'https://calculator.pockly.uk/volume-converter',
        description: 'Convert between liters, gallons, cups and more',
      },
      {
        label: 'Speed Converter',
        url: 'https://calculator.pockly.uk/speed-converter',
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
        url: 'https://url.pockly.uk/qr-generator',
        description: 'Generate QR codes from text, URLs and more',
      },
      {
        label: 'URL Encoder',
        url: 'https://url.pockly.uk/url-encoder',
        description: 'Encode special characters for safe URLs',
      },
      {
        label: 'URL Decoder',
        url: 'https://url.pockly.uk/url-decoder',
        description: 'Decode percent-encoded URLs back to readable text',
      },
      {
        label: 'UTM Builder',
        url: 'https://url.pockly.uk/utm-builder',
        description: 'Build UTM parameters for campaign tracking',
      },
      {
        label: 'URL Cleaner',
        url: 'https://url.pockly.uk/url-cleaner',
        description: 'Remove tracking parameters and clean up URLs',
      },
    ],
  },
];
