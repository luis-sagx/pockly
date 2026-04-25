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
        url: 'https://json.pockly.dev/generator',
        description: 'Build JSON interactively',
      },
      {
        label: 'Templates',
        url: 'https://json.pockly.dev/templates',
        description: 'Copy & paste datasets for testing',
      },
      {
        label: 'Convert',
        url: 'https://json.pockly.dev/convert',
        description: 'Convert between CSV, XML and YAML',
      },
      {
        label: 'Utils',
        url: 'https://json.pockly.dev/utils',
        description: 'Format, minify and validate JSON',
      },
    ],
  },
  {
    key: 'text',
    title: 'Text Tools',
    links: [
      {
        label: 'Text Case',
        url: 'https://text.pockly.dev/text-case',
        description: 'UPPER, lower and title case in one click',
      },
      {
        label: 'Word Counter',
        url: 'https://text.pockly.dev/word-count',
        description: 'Count words, chars and sentences',
      },
      {
        label: 'Diff Checker',
        url: 'https://text.pockly.dev/diff-checker',
        description: 'Compare two blocks of text',
      },
      {
        label: 'Password Generator',
        url: 'https://text.pockly.dev/password-generator',
        description: 'Create secure passwords',
      },
      {
        label: 'Quick Notes',
        url: 'https://text.pockly.dev/quick-notes',
        description: 'Private notes with auto-save',
      },
    ],
  },
  {
    key: 'calculator',
    title: 'Calculator Tools',
    links: [
      {
        label: 'Percentage',
        url: 'https://calc.pockly.dev/percentage-calculator',
        description: 'Calculate percentages quickly',
      },
      {
        label: 'Currency',
        url: 'https://calc.pockly.dev/currency-converter',
        description: 'Convert currencies with live rates',
      },
      {
        label: 'Unit',
        url: 'https://calc.pockly.dev/unit-converter',
        description: 'Length, weight and more',
      },
    ],
  },
  {
    key: 'image',
    title: 'Image Tools',
    links: [
      {
        label: 'Base64 Image',
        url: 'https://image.pockly.dev/base64',
        description: 'Image to Base64 and back',
      },
      {
        label: 'Remove BG',
        url: 'https://image.pockly.dev/background-remover',
        description: 'Remove image backgrounds',
      },
      {
        label: 'Resize',
        url: 'https://image.pockly.dev/image-resize',
        description: 'Resize images by dimensions',
      },
      {
        label: 'Format',
        url: 'https://image.pockly.dev/format-converter',
        description: 'Convert PNG, JPEG, WEBP and BMP',
      },
    ],
  },
  {
    key: 'utilities',
    title: 'Utilities',
    links: [
      {
        label: 'QR Generator',
        url: 'https://utils.pockly.dev/qr-generator',
        description: 'Generate QR codes from text and URLs',
      },
      {
        label: 'URL Shortener',
        url: 'https://utils.pockly.dev/url-shortener',
        description: 'Create short URLs for sharing',
      },
    ],
  },
];
