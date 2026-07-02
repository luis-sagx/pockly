import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://image.pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const imageSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  pageConfigs: {
  '': {
    title: 'Image Tools - Free Online Image Utilities',
    description:
      'Free online image tools: background remover, resize, crop, compress, base64 encoder/decoder, and format converter (PNG, JPEG, WEBP, BMP, SVG, PDF).',
    keywords: 'image tools, background remover, image resize, base64, format converter',
    ogImage: OG_IMAGE,
    canonicalUrl: BASE_URL,
  },
  'image-to-base64': {
    title: 'Image to Base64 - Encode Images Online Free',
    description:
      'Encode images to Base64 online. Copy or download the result. Free online Base64 encoder.',
    keywords: 'base64 encoder, image to base64, base64 converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/image-to-base64`,
  },
  'base64-to-image': {
    title: 'Base64 to Image - Decode Base64 Online Free',
    description:
      'Decode Base64 strings back to images online. Preview and download the decoded image. Free Base64 decoder.',
    keywords: 'base64 decoder, base64 to image, decode base64',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/base64-to-image`,
  },
  'remove-background': {
    title: 'Background Remover - Remove Image Backgrounds Free',
    description:
      'Remove image backgrounds online for free. One-click AI background removal with clean edges. Download as PNG with transparent background.',
    keywords: 'background remover, remove background, transparent background, image editor',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/remove-background`,
  },
  'resize-dimensions': {
    title: 'Image Resizer - Resize Images Online Free',
    description:
      'Resize images online for free. Set exact pixel dimensions, percentage, or preset sizes. Fast preview and instant download.',
    keywords: 'image resize, resize image, photo resizer, pixels',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/resize-dimensions`,
  },
  'compress-by-weight': {
    title: 'Image Compressor - Compress Images Online Free',
    description:
      'Compress images by file size online. Reduce image weight while maintaining quality. Free image compressor.',
    keywords: 'image compress, compress image, reduce image size',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/compress-by-weight`,
  },
  'crop-image': {
    title: 'Image Cropper - Crop Images Online Free',
    description:
      'Crop images online for free. Set exact crop dimensions with live preview. Free image cropping tool.',
    keywords: 'image crop, crop image, image cropper',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/crop-image`,
  },
  'convert-to-png': {
    title: 'Convert to PNG - PNG Converter Online Free',
    description:
      'Convert images to PNG format online. JPEG, WEBP, BMP to PNG. Fast and free PNG converter.',
    keywords: 'convert to png, png converter, jpeg to png',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert-to-png`,
  },
  'convert-to-jpeg': {
    title: 'Convert to JPEG - JPEG Converter Online Free',
    description:
      'Convert images to JPEG format online. PNG, WEBP, BMP to JPEG. Fast and free JPEG converter.',
    keywords: 'convert to jpeg, jpeg converter, png to jpg',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert-to-jpeg`,
  },
  'convert-to-webp': {
    title: 'Convert to WebP - WebP Converter Online Free',
    description:
      'Convert images to WebP format online. PNG, JPEG, BMP to WebP. Fast and free WebP converter.',
    keywords: 'convert to webp, webp converter, png to webp',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert-to-webp`,
  },
  'convert-to-bmp': {
    title: 'Convert to BMP - BMP Converter Online Free',
    description:
      'Convert images to BMP format online. PNG, JPEG, WebP to BMP. Free BMP converter.',
    keywords: 'convert to bmp, bmp converter',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert-to-bmp`,
  },
  'convert-to-svg': {
    title: 'Convert to SVG - SVG Converter Online Free',
    description:
      'Convert raster images to SVG vector format online. PNG, JPEG to SVG. Free SVG converter.',
    keywords: 'convert to svg, svg converter, png to svg',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert-to-svg`,
  },
  'convert-to-pdf': {
    title: 'Convert to PDF - PDF Converter Online Free',
    description:
      'Convert images to PDF format online. PNG, JPEG to PDF. Free PDF converter.',
    keywords: 'convert to pdf, pdf converter, image to pdf',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/convert-to-pdf`,
  },
  'licenses-attributions': {
    title: 'Licenses & Attributions - Image Tools',
    description:
      'Open source licenses and attributions for libraries used in the Image Tools app.',
    noindex: true,
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/licenses-attributions`,
  },
  },
};
