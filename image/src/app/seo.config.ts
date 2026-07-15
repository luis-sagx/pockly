import type { SeoConfig } from '@pockly/shared';

const BASE_URL = 'https://image.pockly.uk';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const imageSeoConfig: SeoConfig = {
  baseUrl: BASE_URL,
  ogImage: OG_IMAGE,
  siteName: 'Pockly Image Tools',
  applicationCategory: 'MultimediaApplication',
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
  '404': {
    title: 'Page Not Found - Pockly Image Tools',
    description: 'The page you are looking for does not exist.',
    noindex: true,
  },
  // Spanish pages (/es/...)
  'es': {
    title: 'Herramientas de Imagen Online Gratis - Editar y Convertir',
    description: 'Herramientas de imagen online gratis: quitar fondo, redimensionar, recortar, comprimir, Base64 y conversor de formatos (PNG, JPEG, WEBP, BMP, SVG, PDF).',
    keywords: 'herramientas de imagen, quitar fondo, redimensionar imagen, base64, convertir imagen',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es`,
  },
  'es/image-to-base64': {
    title: 'Imagen a Base64 - Codificar Imágenes Online Gratis',
    description: 'Codifica imágenes a Base64 online. Copia o descarga el resultado. Codificador Base64 gratis.',
    keywords: 'imagen a base64, codificador base64, convertir a base64',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/image-to-base64`,
  },
  'es/base64-to-image': {
    title: 'Base64 a Imagen - Decodificar Base64 Online Gratis',
    description: 'Decodifica cadenas Base64 a imágenes online. Previsualiza y descarga la imagen. Decodificador Base64 gratis.',
    keywords: 'base64 a imagen, decodificar base64, decodificador base64',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/base64-to-image`,
  },
  'es/remove-background': {
    title: 'Quitar Fondo de Imagen - Eliminar Fondos Online Gratis',
    description: 'Quita el fondo de tus imágenes online gratis. Eliminación de fondo con IA en un clic. Descarga en PNG con fondo transparente.',
    keywords: 'quitar fondo, eliminar fondo de imagen, fondo transparente',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/remove-background`,
  },
  'es/resize-dimensions': {
    title: 'Redimensionar Imágenes Online Gratis - Cambiar Tamaño',
    description: 'Redimensiona imágenes online gratis. Define píxeles exactos, porcentaje o tamaños predefinidos. Vista previa y descarga instantánea.',
    keywords: 'redimensionar imagen, cambiar tamaño de imagen, redimensionar foto',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/resize-dimensions`,
  },
  'es/compress-by-weight': {
    title: 'Comprimir Imágenes Online Gratis - Reducir Peso',
    description: 'Comprime imágenes por tamaño de archivo online. Reduce el peso manteniendo la calidad. Compresor de imágenes gratis.',
    keywords: 'comprimir imagen, reducir peso de imagen, compresor de imagenes',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/compress-by-weight`,
  },
  'es/crop-image': {
    title: 'Recortar Imágenes Online Gratis',
    description: 'Recorta imágenes online gratis. Define dimensiones exactas con vista previa en vivo. Herramienta de recorte gratis.',
    keywords: 'recortar imagen, cortar imagen, recorte de fotos',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/crop-image`,
  },
  'es/convert-to-png': {
    title: 'Convertir a PNG - Conversor PNG Online Gratis',
    description: 'Convierte imágenes a formato PNG online. JPEG, WEBP, BMP a PNG. Conversor PNG rápido y gratis.',
    keywords: 'convertir a png, conversor png, jpeg a png',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/convert-to-png`,
  },
  'es/convert-to-jpeg': {
    title: 'Convertir a JPEG - Conversor JPEG Online Gratis',
    description: 'Convierte imágenes a formato JPEG online. PNG, WEBP, BMP a JPEG. Conversor JPEG rápido y gratis.',
    keywords: 'convertir a jpeg, conversor jpeg, png a jpg',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/convert-to-jpeg`,
  },
  'es/convert-to-webp': {
    title: 'Convertir a WebP - Conversor WebP Online Gratis',
    description: 'Convierte imágenes a formato WebP online. PNG, JPEG, BMP a WebP. Conversor WebP rápido y gratis.',
    keywords: 'convertir a webp, conversor webp, png a webp',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/convert-to-webp`,
  },
  'es/convert-to-bmp': {
    title: 'Convertir a BMP - Conversor BMP Online Gratis',
    description: 'Convierte imágenes a formato BMP online. PNG, JPEG, WebP a BMP. Conversor BMP gratis.',
    keywords: 'convertir a bmp, conversor bmp',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/convert-to-bmp`,
  },
  'es/convert-to-svg': {
    title: 'Convertir a SVG - Conversor SVG Online Gratis',
    description: 'Convierte imágenes ráster a formato vectorial SVG online. PNG, JPEG a SVG. Conversor SVG gratis.',
    keywords: 'convertir a svg, conversor svg, png a svg',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/convert-to-svg`,
  },
  'es/convert-to-pdf': {
    title: 'Convertir a PDF - Conversor PDF Online Gratis',
    description: 'Convierte imágenes a formato PDF online. PNG, JPEG a PDF. Conversor PDF gratis.',
    keywords: 'convertir a pdf, conversor pdf, imagen a pdf',
    ogImage: OG_IMAGE,
    canonicalUrl: `${BASE_URL}/es/convert-to-pdf`,
  },
  'es/licenses-attributions': {
    title: 'Licencias y Atribuciones - Image Tools',
    description: 'Licencias de código abierto y atribuciones de las librerías usadas en Image Tools.',
    noindex: true,
  },
  'es/404': {
    title: 'Página No Encontrada - Pockly Image Tools',
    description: 'La página que buscas no existe.',
    noindex: true,
  },
  },
};
