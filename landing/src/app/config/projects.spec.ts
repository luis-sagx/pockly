import { PROJECT_CATEGORIES } from './projects';

describe('PROJECT_CATEGORIES', () => {
  it('should expose every current public tool route in landing', () => {
    const byKey = Object.fromEntries(
      PROJECT_CATEGORIES.map((category) => [category.key, category]),
    );

    expect(byKey['text']?.links.map((link) => link.url)).toEqual([
      'https://pockly-text.vercel.app/text-case',
      'https://pockly-text.vercel.app/word-count',
      'https://pockly-text.vercel.app/diff-checker',
      'https://pockly-text.vercel.app/password-generator',
    ]);

    expect(byKey['productivity']?.links.map((link) => link.url)).toEqual([
      'https://productivity.pockly.vercel.app/board',
      'https://productivity.pockly.vercel.app/habits',
      'https://productivity.pockly.vercel.app/scratchpad',
    ]);

    expect(byKey['image']?.links.map((link) => link.url)).toEqual([
      'https://pockly-image.vercel.app/image-to-base64',
      'https://pockly-image.vercel.app/base64-to-image',
      'https://pockly-image.vercel.app/remove-background',
      'https://pockly-image.vercel.app/resize-dimensions',
      'https://pockly-image.vercel.app/compress-by-weight',
      'https://pockly-image.vercel.app/crop-image',
      'https://pockly-image.vercel.app/convert-to-png',
      'https://pockly-image.vercel.app/convert-to-jpeg',
      'https://pockly-image.vercel.app/convert-to-webp',
      'https://pockly-image.vercel.app/convert-to-bmp',
      'https://pockly-image.vercel.app/convert-to-svg',
      'https://pockly-image.vercel.app/convert-to-pdf',
    ]);

    expect(byKey['json']?.links.map((link) => link.url)).toEqual([
      'https://pockly-json.vercel.app/generator',
      'https://pockly-json.vercel.app/templates',
      'https://pockly-json.vercel.app/convert/csv-to-json',
      'https://pockly-json.vercel.app/convert/tsv-to-json',
      'https://pockly-json.vercel.app/convert/json-to-csv',
      'https://pockly-json.vercel.app/convert/json-to-tsv',
      'https://pockly-json.vercel.app/convert/json-to-xml',
      'https://pockly-json.vercel.app/convert/json-to-yaml',
      'https://pockly-json.vercel.app/utils/format',
      'https://pockly-json.vercel.app/utils/minify',
      'https://pockly-json.vercel.app/utils/sort',
      'https://pockly-json.vercel.app/utils/validate',
      'https://pockly-json.vercel.app/utils/flatten',
      'https://pockly-json.vercel.app/utils/unflatten',
      'https://pockly-json.vercel.app/utils/diff',
      'https://pockly-json.vercel.app/utils/query',
    ]);

    expect(byKey['url']?.links.map((link) => link.url)).toEqual([
      'https://pockly-qr.vercel.app/qr-generator',
      'https://pockly-qr.vercel.app/url-encoder',
      'https://pockly-qr.vercel.app/url-decoder',
      'https://pockly-qr.vercel.app/utm-builder',
      'https://pockly-qr.vercel.app/url-cleaner',
    ]);

    expect(byKey['calculator']?.links.map((link) => link.url)).toEqual([
      'https://pockly-calculator.vercel.app/percent-of-y',
      'https://pockly-calculator.vercel.app/what-percent',
      'https://pockly-calculator.vercel.app/percentage-change',
      'https://pockly-calculator.vercel.app/currency-converter',
      'https://pockly-calculator.vercel.app/length-converter',
      'https://pockly-calculator.vercel.app/weight-converter',
      'https://pockly-calculator.vercel.app/temperature-converter',
      'https://pockly-calculator.vercel.app/volume-converter',
      'https://pockly-calculator.vercel.app/speed-converter',
    ]);
  });
});
