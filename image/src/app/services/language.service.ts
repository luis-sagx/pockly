import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  // Nav
  navHome: string;
  navImageToBase64: string;
  navBase64ToImage: string;
  navCrop: string;
  navRemoveBackground: string;
  navResize: string;
  navConvertFormats: string;
  navCompress: string;
  navTextImage: string;

  // Footer
  freeOnlineTools: string;
  noSignupNoAds: string;
  languageLabel: string;

  // Home
  yourImageToolsAllInOnePlace: string;
  homeSubtitle: string;
  allTools: string;
  conversionTools: string;
  processingTools: string;
  generationTools: string;

  // Tool labels
  imageToBase64: string;
  imageToBase64Desc: string;
  base64ToImage: string;
  base64ToImageDesc: string;
  backgroundRemover: string;
  backgroundRemoverDesc: string;
  imageResize: string;
  imageResizeDesc: string;
  formatConverter: string;
  formatConverterDesc: string;
  imageCompress: string;
  imageCompressDesc: string;
  textToImage: string;
  textToImageDesc: string;
  cropImage: string;
  cropImageDesc: string;

  // Common
  uploadImage: string;
  uploadFile: string;
  fileLoaded: string;
  download: string;
  clear: string;
  results: string;
  result: string;
  error: string;
  processing: string;
  success: string;

  // Image to Base64
  convertImageToBase64: string;
  selectImage: string;
  base64Output: string;
  copyBase64: string;
  copied: string;

  // Base64 to Image
  convertBase64ToImage: string;
  pasteBase64Here: string;
  decodeBase64: string;
  invalidBase64: string;

  // Background Remover
  removeImageBackground: string;
  selectImageForRemoval: string;
  removing: string;
  backgroundRemoved: string;
  failedToRemoveBackground: string;

  // Image Resize
  resizeImage: string;
  width: string;
  height: string;
  maintainAspectRatio: string;
  resizeBtn: string;
  pixels: string;
  percent: string;

  // Format Converter
  convertImageFormat: string;
  selectFormat: string;
  selectImageFormat: string;
  quality: string;
  convertBtn: string;
  supportedFormats: string;

  // Format converter pages (individual format pages)
  convertToPng: string;
  convertToPngDesc: string;
  convertToJpeg: string;
  convertToJpegDesc: string;
  convertToWebp: string;
  convertToWebpDesc: string;
  convertToBmp: string;
  convertToBmpDesc: string;
  convertToSvg: string;
  convertToSvgDesc: string;
  convertToPdf: string;
  convertToPdfDesc: string;

  // Image Compress
  compressImageBySize: string;
  outputFormat: string;
  targetSize: string;
  mb: string;
  compressingImage: string;
  compressionFailed: string;
  originalSize: string;
  compressedSize: string;
  compression: string;

  // Compress levels
  compressionLevel: string;
  lowCompression: string;
  lowCompressionDesc: string;
  mediumCompression: string;
  mediumCompressionDesc: string;
  highCompression: string;
  highCompressionDesc: string;
  estimatedSize: string;

  // Text to Image
  convertTextToImage: string;
  enterTextHere: string;
  fontSize: string;
  fontColor: string;
  backgroundColor: string;
  generateImage: string;
  textImageGenerated: string;
  failedToGenerateImage: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Nav
    navHome: 'Home',
    navImageToBase64: 'Image to Base64',
    navBase64ToImage: 'Base64 to Image',
    navCrop: 'Crop',
    navRemoveBackground: 'Remove Background',
    navResize: 'Resize',
    navConvertFormats: 'Convert Format',
    navCompress: 'Compress',
    navTextImage: 'Text to Image',

    // Footer
    freeOnlineTools: 'Free online tools to boost your productivity.',
    noSignupNoAds: '',
    languageLabel: 'Language',

    // Home
    yourImageToolsAllInOnePlace: 'Your image tools, all in one place',
    homeSubtitle:
      'Powerful and simple image utilities to boost your productivity. Convert formats, resize images, remove backgrounds, compress files, and create text images. Completely free, no registration required.',
    allTools: 'All Tools',
    conversionTools: 'Conversion',
    processingTools: 'Processing',
    generationTools: 'Generation',

    // Tool labels
    imageToBase64: 'Image to Base64',
    imageToBase64Desc: 'Convert any image to Base64 encoded text',
    base64ToImage: 'Base64 to Image',
    base64ToImageDesc: 'Convert Base64 text back to viewable images',
    backgroundRemover: 'Background Remover',
    backgroundRemoverDesc: 'Remove background from images automatically',
    imageResize: 'Image Resize',
    imageResizeDesc: 'Resize images to custom dimensions',
    formatConverter: 'Format Converter',
    formatConverterDesc: 'Convert images between different formats',
    imageCompress: 'Image Compress',
    imageCompressDesc: 'Compress images to a specific file size',
    textToImage: 'Text to Image',
    textToImageDesc: 'Convert text into image format',
    cropImage: 'Crop Image',
    cropImageDesc: 'Crop images to exact dimensions',

    // Common
    uploadImage: 'Upload image',
    uploadFile: 'Upload file',
    fileLoaded: 'File loaded',
    download: 'Download',
    clear: 'Clear',
    results: 'Results:',
    result: 'Result:',
    error: 'Error',
    processing: 'Processing...',
    success: 'Success',

    // Image to Base64
    convertImageToBase64: 'Convert image to Base64',
    selectImage: 'Select an image',
    base64Output: 'Base64 Output:',
    copyBase64: 'Copy Base64',
    copied: 'Copied!',

    // Base64 to Image
    convertBase64ToImage: 'Convert Base64 to image',
    pasteBase64Here: 'Paste Base64 text here...',
    decodeBase64: 'Decode Base64',
    invalidBase64: 'Invalid Base64 format',

    // Background Remover
    removeImageBackground: 'Remove image background',
    selectImageForRemoval: 'Select image for removal',
    removing: 'Removing background...',
    backgroundRemoved: 'Background removed successfully',
    failedToRemoveBackground: 'Failed to remove background',

    // Image Resize
    resizeImage: 'Resize image',
    width: 'Width',
    height: 'Height',
    maintainAspectRatio: 'Maintain aspect ratio',
    resizeBtn: 'Resize',
    pixels: 'px',
    percent: '%',

    // Format Converter
    convertImageFormat: 'Convert image format',
    selectFormat: 'Select format',
    selectImageFormat: 'Select image format',
    quality: 'Quality',
    convertBtn: 'Convert',
    supportedFormats: 'Supported formats: JPG, PNG, WebP, GIF',

    // Format converter pages (individual format pages)
    convertToPng: 'Convert to PNG',
    convertToPngDesc: 'Convert any image to PNG format',
    convertToJpeg: 'Convert to JPEG',
    convertToJpegDesc: 'Convert any image to JPEG format',
    convertToWebp: 'Convert to WebP',
    convertToWebpDesc: 'Convert any image to WebP format',
    convertToBmp: 'Convert to BMP',
    convertToBmpDesc: 'Convert any image to BMP format',
    convertToSvg: 'Convert to SVG',
    convertToSvgDesc: 'Convert raster images to vector SVG',
    convertToPdf: 'Convert to PDF',
    convertToPdfDesc: 'Convert images to PDF document',

    // Image Compress
    compressImageBySize: 'Compress image by size',
    outputFormat: 'Output format',
    targetSize: 'Target size',
    mb: 'MB',
    compressingImage: 'Compressing image...',
    compressionFailed: 'Compression failed',
    originalSize: 'Original size',
    compressedSize: 'Compressed size',
    compression: 'Compression',

    // Compress levels
    compressionLevel: 'Compression Level',
    lowCompression: 'Low (Best Quality)',
    lowCompressionDesc:
      'Minimal compression. Keeps the highest visual quality. Best for archiving or printing.',
    mediumCompression: 'Medium (Balanced)',
    mediumCompressionDesc: 'Good balance between quality and file size. Ideal for general use.',
    highCompression: 'High (Smallest File)',
    highCompressionDesc:
      'Maximum compression. May have visible quality loss. Best for web or email.',
    estimatedSize: 'Estimated size',

    // Text to Image
    convertTextToImage: 'Convert text to image',
    enterTextHere: 'Enter text here...',
    fontSize: 'Font size',
    fontColor: 'Font color',
    backgroundColor: 'Background color',
    generateImage: 'Generate Image',
    textImageGenerated: 'Image generated successfully',
    failedToGenerateImage: 'Failed to generate image',
  },
  es: {
    // Nav
    navHome: 'Inicio',
    navImageToBase64: 'Imagen a Base64',
    navBase64ToImage: 'Base64 a imagen',
    navCrop: 'Recortar',
    navRemoveBackground: 'Quitar fondo',
    navResize: 'Redimensionar',
    navConvertFormats: 'Convertir formato',
    navCompress: 'Comprimir',
    navTextImage: 'Texto a imagen',

    // Footer
    freeOnlineTools: 'Herramientas online gratuitas para tu productividad.',
    noSignupNoAds: '',
    languageLabel: 'Idioma',

    // Home
    yourImageToolsAllInOnePlace: 'Tus herramientas de imagen, todo en un solo lugar',
    homeSubtitle:
      'Utilidades de imagen potentes y simples para aumentar tu productividad. Convierte formatos, redimensiona imágenes, elimina fondos, comprime archivos y crea imágenes de texto. Completamente gratis, sin registro requerido.',
    allTools: 'Todas',
    conversionTools: 'Conversión',
    processingTools: 'Procesamiento',
    generationTools: 'Generación',

    // Tool labels
    imageToBase64: 'Imagen a Base64',
    imageToBase64Desc: 'Convierte cualquier imagen a texto codificado en Base64',
    base64ToImage: 'Base64 a imagen',
    base64ToImageDesc: 'Convierte texto Base64 de vuelta a imágenes visibles',
    backgroundRemover: 'Removedor de fondo',
    backgroundRemoverDesc: 'Elimina el fondo de imágenes automáticamente',
    imageResize: 'Redimensionar imagen',
    imageResizeDesc: 'Redimensiona imágenes a dimensiones personalizadas',
    formatConverter: 'Convertidor de formato',
    formatConverterDesc: 'Convierte imágenes entre diferentes formatos',
    imageCompress: 'Comprimir imagen',
    imageCompressDesc: 'Comprime imágenes a un tamaño de archivo específico',
    textToImage: 'Texto a imagen',
    textToImageDesc: 'Convierte texto en formato de imagen',
    cropImage: 'Recortar imagen',
    cropImageDesc: 'Recorta imágenes a dimensiones exactas',

    // Common
    uploadImage: 'Subir imagen',
    uploadFile: 'Subir archivo',
    fileLoaded: 'Archivo cargado',
    download: 'Descargar',
    clear: 'Limpiar',
    results: 'Resultados:',
    result: 'Resultado:',
    error: 'Error',
    processing: 'Procesando...',
    success: 'Éxito',

    // Image to Base64
    convertImageToBase64: 'Convertir imagen a Base64',
    selectImage: 'Selecciona una imagen',
    base64Output: 'Salida Base64:',
    copyBase64: 'Copiar Base64',
    copied: '¡Copiado!',

    // Base64 to Image
    convertBase64ToImage: 'Convertir Base64 a imagen',
    pasteBase64Here: 'Pega el texto Base64 aquí...',
    decodeBase64: 'Decodificar Base64',
    invalidBase64: 'Formato Base64 inválido',

    // Background Remover
    removeImageBackground: 'Eliminar fondo de imagen',
    selectImageForRemoval: 'Selecciona imagen para eliminar fondo',
    removing: 'Eliminando fondo...',
    backgroundRemoved: 'Fondo eliminado exitosamente',
    failedToRemoveBackground: 'Error al eliminar el fondo',

    // Image Resize
    resizeImage: 'Redimensionar imagen',
    width: 'Ancho',
    height: 'Alto',
    maintainAspectRatio: 'Mantener relación de aspecto',
    resizeBtn: 'Redimensionar',
    pixels: 'px',
    percent: '%',

    // Format Converter
    convertImageFormat: 'Convertir formato de imagen',
    selectFormat: 'Selecciona formato',
    selectImageFormat: 'Selecciona formato de imagen',
    quality: 'Calidad',
    convertBtn: 'Convertir',
    supportedFormats: 'Formatos soportados: JPG, PNG, WebP, GIF',

    // Format converter pages (individual format pages)
    convertToPng: 'Convertir a PNG',
    convertToPngDesc: 'Convierte cualquier imagen a formato PNG',
    convertToJpeg: 'Convertir a JPEG',
    convertToJpegDesc: 'Convierte cualquier imagen a formato JPEG',
    convertToWebp: 'Convertir a WebP',
    convertToWebpDesc: 'Convierte cualquier imagen a formato WebP',
    convertToBmp: 'Convertir a BMP',
    convertToBmpDesc: 'Convierte cualquier imagen a formato BMP',
    convertToSvg: 'Convertir a SVG',
    convertToSvgDesc: 'Convierte imágenes raster a vector SVG',
    convertToPdf: 'Convertir a PDF',
    convertToPdfDesc: 'Convierte imágenes a documento PDF',

    // Image Compress
    compressImageBySize: 'Comprimir imagen por tamaño',
    outputFormat: 'Formato de salida',
    targetSize: 'Tamaño objetivo',
    mb: 'MB',
    compressingImage: 'Comprimiendo imagen...',
    compressionFailed: 'Error en compresión',
    originalSize: 'Tamaño original',
    compressedSize: 'Tamaño comprimido',
    compression: 'Compresión',

    // Compress levels
    compressionLevel: 'Nivel de compresión',
    lowCompression: 'Baja (Mejor Calidad)',
    lowCompressionDesc:
      'Compresión mínima. Mantiene la mayor calidad visual. Ideal para archivar o imprimir.',
    mediumCompression: 'Media (Balanceada)',
    mediumCompressionDesc: 'Buen balance entre calidad y tamaño. Ideal para uso general.',
    highCompression: 'Alta (Archivo más pequeño)',
    highCompressionDesc: 'Compresión máxima. Puede perder calidad visible. Ideal para web o email.',
    estimatedSize: 'Tamaño estimado',

    // Text to Image
    convertTextToImage: 'Convertir texto a imagen',
    enterTextHere: 'Escribe el texto aquí...',
    fontSize: 'Tamaño de fuente',
    fontColor: 'Color de fuente',
    backgroundColor: 'Color de fondo',
    generateImage: 'Generar imagen',
    textImageGenerated: 'Imagen generada exitosamente',
    failedToGenerateImage: 'Error al generar imagen',
  },
};

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
];

const STORAGE_KEY = 'pockly-language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly _language = signal<Language>('en');
  private isBrowser: boolean;

  readonly language = this._language.asReadonly();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this._language.set(this.getInitialLanguage());
    }

    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem(STORAGE_KEY, this._language());
      }
    });
  }

  private getInitialLanguage(): Language {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && translations[stored]) {
      return stored;
    }

    const browserLang = navigator.language.toLowerCase();
    for (const lang of Object.keys(translations)) {
      if (browserLang.startsWith(lang)) {
        return lang as Language;
      }
    }
    return 'en';
  }

  setLanguage(lang: Language): void {
    if (translations[lang]) {
      this._language.set(lang);
    }
  }

  toggleLanguage(): void {
    this._language.update((current) => (current === 'en' ? 'es' : 'en'));
  }

  getLabel(lang: Language): string {
    const option = languages.find((l) => l.code === lang);
    return option ? option.nativeName : lang;
  }

  getTranslations(): Translations {
    return translations[this._language()];
  }

  getAvailableLanguages(): LanguageOption[] {
    return languages;
  }

  getCurrentLanguage(): Language {
    return this._language();
  }
}
