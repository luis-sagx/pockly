import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

export interface Translations {
  // Nav
  navHome: string;
  navImageToBase64: string;
  navBase64ToImage: string;
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

  // Image Compress
  compressImageBySize: string;
  targetSize: string;
  mb: string;
  compressingImage: string;
  compressionFailed: string;
  originalSize: string;
  compressedSize: string;
  compression: string;

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
    navRemoveBackground: 'Remove Background',
    navResize: 'Resize',
    navConvertFormats: 'Convert Format',
    navCompress: 'Compress',
    navTextImage: 'Text to Image',

    // Footer
    freeOnlineTools: 'Free online tools — no signup, no ads.',
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

    // Image Compress
    compressImageBySize: 'Compress image by size',
    targetSize: 'Target size',
    mb: 'MB',
    compressingImage: 'Compressing image...',
    compressionFailed: 'Compression failed',
    originalSize: 'Original size',
    compressedSize: 'Compressed size',
    compression: 'Compression',

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
    navRemoveBackground: 'Quitar fondo',
    navResize: 'Redimensionar',
    navConvertFormats: 'Convertir formato',
    navCompress: 'Comprimir',
    navTextImage: 'Texto a imagen',

    // Footer
    freeOnlineTools: 'Herramientas online gratuitas — sin registro, sin anuncios.',
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

    // Image Compress
    compressImageBySize: 'Comprimir imagen por tamaño',
    targetSize: 'Tamaño objetivo',
    mb: 'MB',
    compressingImage: 'Comprimiendo imagen...',
    compressionFailed: 'Error en compresión',
    originalSize: 'Tamaño original',
    compressedSize: 'Tamaño comprimido',
    compression: 'Compresión',

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
  fr: {
    // Nav
    navHome: 'Accueil',
    navImageToBase64: 'Image vers Base64',
    navBase64ToImage: 'Base64 vers image',
    navRemoveBackground: 'Supprimer fond',
    navResize: 'Redimensionner',
    navConvertFormats: 'Convertir format',
    navCompress: 'Compresser',
    navTextImage: 'Texte vers image',

    // Footer
    freeOnlineTools: 'Outils en ligne gratuits — sans inscription, sans publicité.',
    noSignupNoAds: '',
    languageLabel: 'Langue',

    // Home
    yourImageToolsAllInOnePlace: "Vos outils d'image, tout au même endroit",
    homeSubtitle:
      "Des utilitaires d'image puissants et simples pour stimuler votre productivité. Convertissez les formats, redimensionnez les images, supprimez les arrière-plans, compressez les fichiers et créez des images de texte. Totalement gratuit, sans inscription requise.",
    allTools: 'Tous',
    conversionTools: 'Conversion',
    processingTools: 'Traitement',
    generationTools: 'Génération',

    // Tool labels
    imageToBase64: 'Image vers Base64',
    imageToBase64Desc: "Convertir n'importe quelle image en texte encodé Base64",
    base64ToImage: 'Base64 vers image',
    base64ToImageDesc: 'Convertir du texte Base64 en images visibles',
    backgroundRemover: "Suppresseur d'arrière-plan",
    backgroundRemoverDesc: "Supprimer automatiquement l'arrière-plan des images",
    imageResize: 'Redimensionner image',
    imageResizeDesc: 'Redimensionner les images à des dimensions personnalisées',
    formatConverter: 'Convertisseur de format',
    formatConverterDesc: 'Convertir les images entre différents formats',
    imageCompress: 'Compresser image',
    imageCompressDesc: 'Compresser les images à une taille de fichier spécifique',
    textToImage: 'Texte vers image',
    textToImageDesc: 'Convertir du texte au format image',

    // Common
    uploadImage: 'Télécharger image',
    uploadFile: 'Télécharger fichier',
    fileLoaded: 'Fichier chargé',
    download: 'Télécharger',
    clear: 'Effacer',
    results: 'Résultats:',
    result: 'Résultat:',
    error: 'Erreur',
    processing: 'Traitement...',
    success: 'Succès',

    // Image to Base64
    convertImageToBase64: 'Convertir image en Base64',
    selectImage: 'Sélectionner une image',
    base64Output: 'Sortie Base64:',
    copyBase64: 'Copier Base64',
    copied: 'Copié!',

    // Base64 to Image
    convertBase64ToImage: 'Convertir Base64 en image',
    pasteBase64Here: 'Collez le texte Base64 ici...',
    decodeBase64: 'Décoder Base64',
    invalidBase64: 'Format Base64 invalide',

    // Background Remover
    removeImageBackground: "Supprimer l'arrière-plan de l'image",
    selectImageForRemoval: "Sélectionner l'image pour la suppression du fond",
    removing: 'Suppression du fond...',
    backgroundRemoved: 'Arrière-plan supprimé avec succès',
    failedToRemoveBackground: 'Échec de la suppression du fond',

    // Image Resize
    resizeImage: "Redimensionner l'image",
    width: 'Largeur',
    height: 'Hauteur',
    maintainAspectRatio: 'Maintenir le rapport hauteur-largeur',
    resizeBtn: 'Redimensionner',
    pixels: 'px',
    percent: '%',

    // Format Converter
    convertImageFormat: "Convertir le format d'image",
    selectFormat: 'Sélectionner le format',
    selectImageFormat: "Sélectionner le format d'image",
    quality: 'Qualité',
    convertBtn: 'Convertir',
    supportedFormats: 'Formats supportés: JPG, PNG, WebP, GIF',

    // Image Compress
    compressImageBySize: "Compresser l'image par taille",
    targetSize: 'Taille cible',
    mb: 'MB',
    compressingImage: "Compression de l'image...",
    compressionFailed: 'Échec de la compression',
    originalSize: "Taille d'origine",
    compressedSize: 'Taille compressée',
    compression: 'Compression',

    // Text to Image
    convertTextToImage: 'Convertir texte en image',
    enterTextHere: 'Entrez le texte ici...',
    fontSize: 'Taille de police',
    fontColor: 'Couleur de police',
    backgroundColor: 'Couleur de fond',
    generateImage: "Générer l'image",
    textImageGenerated: 'Image générée avec succès',
    failedToGenerateImage: "Échec de la génération de l'image",
  },
  de: {
    // Nav
    navHome: 'Startseite',
    navImageToBase64: 'Bild zu Base64',
    navBase64ToImage: 'Base64 zu Bild',
    navRemoveBackground: 'Hintergrund entfernen',
    navResize: 'Größe ändern',
    navConvertFormats: 'Format konvertieren',
    navCompress: 'Komprimieren',
    navTextImage: 'Text zu Bild',

    // Footer
    freeOnlineTools: 'Kostenlose Online-Tools — keine Registrierung, keine Werbung.',
    noSignupNoAds: '',
    languageLabel: 'Sprache',

    // Home
    yourImageToolsAllInOnePlace: 'Ihre Bildtools, alles an einem Ort',
    homeSubtitle:
      'Leistungsstarke und einfache Bildtools zur Steigerung Ihrer Produktivität. Konvertieren Sie Formate, ändern Sie die Bildgröße, entfernen Sie Hintergründe, komprimieren Sie Dateien und erstellen Sie Textbilder. Komplett kostenlos, keine Registrierung erforderlich.',
    allTools: 'Alle',
    conversionTools: 'Konvertierung',
    processingTools: 'Verarbeitung',
    generationTools: 'Generierung',

    // Tool labels
    imageToBase64: 'Bild zu Base64',
    imageToBase64Desc: 'Konvertieren Sie jedes Bild in Base64-codiertem Text',
    base64ToImage: 'Base64 zu Bild',
    base64ToImageDesc: 'Konvertieren Sie Base64-Text zurück in anschaubare Bilder',
    backgroundRemover: 'Hintergrundentferner',
    backgroundRemoverDesc: 'Hintergrund automatisch aus Bildern entfernen',
    imageResize: 'Bildgröße ändern',
    imageResizeDesc: 'Ändern Sie die Bildgröße auf benutzerdefinierte Abmessungen',
    formatConverter: 'Formatkonverter',
    formatConverterDesc: 'Konvertieren Sie Bilder zwischen verschiedenen Formaten',
    imageCompress: 'Bild komprimieren',
    imageCompressDesc: 'Komprimieren Sie Bilder auf eine bestimmte Dateigröße',
    textToImage: 'Text zu Bild',
    textToImageDesc: 'Konvertiert Text in Bildformat',

    // Common
    uploadImage: 'Bild hochladen',
    uploadFile: 'Datei hochladen',
    fileLoaded: 'Datei geladen',
    download: 'Herunterladen',
    clear: 'Löschen',
    results: 'Ergebnisse:',
    result: 'Ergebnis:',
    error: 'Fehler',
    processing: 'Verarbeitung...',
    success: 'Erfolgreich',

    // Image to Base64
    convertImageToBase64: 'Bild zu Base64 konvertieren',
    selectImage: 'Wählen Sie ein Bild',
    base64Output: 'Base64-Ausgabe:',
    copyBase64: 'Base64 kopieren',
    copied: 'Kopiert!',

    // Base64 to Image
    convertBase64ToImage: 'Base64 in Bild konvertieren',
    pasteBase64Here: 'Fügen Sie Base64-Text hier ein...',
    decodeBase64: 'Base64 dekodieren',
    invalidBase64: 'Ungültiges Base64-Format',

    // Background Remover
    removeImageBackground: 'Bildhintergrund entfernen',
    selectImageForRemoval: 'Wählen Sie Bild zur Hintergrundentfernung',
    removing: 'Hintergrund wird entfernt...',
    backgroundRemoved: 'Hintergrund erfolgreich entfernt',
    failedToRemoveBackground: 'Fehler beim Entfernen des Hintergrunds',

    // Image Resize
    resizeImage: 'Bildgröße ändern',
    width: 'Breite',
    height: 'Höhe',
    maintainAspectRatio: 'Seitenverhältnis beibehalten',
    resizeBtn: 'Größe ändern',
    pixels: 'px',
    percent: '%',

    // Format Converter
    convertImageFormat: 'Bildformat konvertieren',
    selectFormat: 'Format auswählen',
    selectImageFormat: 'Bildformat auswählen',
    quality: 'Qualität',
    convertBtn: 'Konvertieren',
    supportedFormats: 'Unterstützte Formate: JPG, PNG, WebP, GIF',

    // Image Compress
    compressImageBySize: 'Bild nach Größe komprimieren',
    targetSize: 'Zielgröße',
    mb: 'MB',
    compressingImage: 'Bild wird komprimiert...',
    compressionFailed: 'Komprimierung fehlgeschlagen',
    originalSize: 'Ursprüngliche Größe',
    compressedSize: 'Komprimierte Größe',
    compression: 'Komprimierung',

    // Text to Image
    convertTextToImage: 'Text in Bild konvertieren',
    enterTextHere: 'Geben Sie Text hier ein...',
    fontSize: 'Schriftgröße',
    fontColor: 'Schriftfarbe',
    backgroundColor: 'Hintergrundfarbe',
    generateImage: 'Bild erzeugen',
    textImageGenerated: 'Bild erfolgreich erstellt',
    failedToGenerateImage: 'Fehler beim Erstellen des Bildes',
  },
  pt: {
    // Nav
    navHome: 'Início',
    navImageToBase64: 'Imagem para Base64',
    navBase64ToImage: 'Base64 para imagem',
    navRemoveBackground: 'Remover fundo',
    navResize: 'Redimensionar',
    navConvertFormats: 'Converter formato',
    navCompress: 'Comprimir',
    navTextImage: 'Texto para imagem',

    // Footer
    freeOnlineTools: 'Ferramentas online gratuitas — sem cadastro, sem anúncios.',
    noSignupNoAds: '',
    languageLabel: 'Idioma',

    // Home
    yourImageToolsAllInOnePlace: 'Suas ferramentas de imagem, tudo em um só lugar',
    homeSubtitle:
      'Utilitários de imagem poderosos e simples para impulsionar sua produtividade. Converta formatos, redimensione imagens, remova fundos, comprima arquivos e crie imagens de texto. Completamente grátis, sem registro necessário.',
    allTools: 'Todas',
    conversionTools: 'Conversão',
    processingTools: 'Processamento',
    generationTools: 'Geração',

    // Tool labels
    imageToBase64: 'Imagem para Base64',
    imageToBase64Desc: 'Converta qualquer imagem em texto codificado em Base64',
    base64ToImage: 'Base64 para imagem',
    base64ToImageDesc: 'Converta texto Base64 de volta para imagens visíveis',
    backgroundRemover: 'Removedor de fundo',
    backgroundRemoverDesc: 'Remova o fundo das imagens automaticamente',
    imageResize: 'Redimensionar imagem',
    imageResizeDesc: 'Redimensione imagens para dimensões personalizadas',
    formatConverter: 'Conversor de formato',
    formatConverterDesc: 'Converta imagens entre diferentes formatos',
    imageCompress: 'Comprimir imagem',
    imageCompressDesc: 'Comprima imagens para um tamanho de arquivo específico',
    textToImage: 'Texto para imagem',
    textToImageDesc: 'Converta texto em formato de imagem',

    // Common
    uploadImage: 'Carregar imagem',
    uploadFile: 'Carregar arquivo',
    fileLoaded: 'Arquivo carregado',
    download: 'Baixar',
    clear: 'Limpar',
    results: 'Resultados:',
    result: 'Resultado:',
    error: 'Erro',
    processing: 'Processando...',
    success: 'Sucesso',

    // Image to Base64
    convertImageToBase64: 'Converter imagem para Base64',
    selectImage: 'Selecione uma imagem',
    base64Output: 'Saída Base64:',
    copyBase64: 'Copiar Base64',
    copied: 'Copiado!',

    // Base64 to Image
    convertBase64ToImage: 'Converter Base64 para imagem',
    pasteBase64Here: 'Cole o texto Base64 aqui...',
    decodeBase64: 'Decodificar Base64',
    invalidBase64: 'Formato Base64 inválido',

    // Background Remover
    removeImageBackground: 'Remover fundo da imagem',
    selectImageForRemoval: 'Selecione a imagem para remoção de fundo',
    removing: 'Removendo fundo...',
    backgroundRemoved: 'Fundo removido com sucesso',
    failedToRemoveBackground: 'Falha ao remover o fundo',

    // Image Resize
    resizeImage: 'Redimensionar imagem',
    width: 'Largura',
    height: 'Altura',
    maintainAspectRatio: 'Manter proporção de aspecto',
    resizeBtn: 'Redimensionar',
    pixels: 'px',
    percent: '%',

    // Format Converter
    convertImageFormat: 'Converter formato de imagem',
    selectFormat: 'Selecionar formato',
    selectImageFormat: 'Selecionar formato de imagem',
    quality: 'Qualidade',
    convertBtn: 'Converter',
    supportedFormats: 'Formatos suportados: JPG, PNG, WebP, GIF',

    // Image Compress
    compressImageBySize: 'Comprimir imagem por tamanho',
    targetSize: 'Tamanho alvo',
    mb: 'MB',
    compressingImage: 'Comprimindo imagem...',
    compressionFailed: 'Falha na compressão',
    originalSize: 'Tamanho original',
    compressedSize: 'Tamanho comprimido',
    compression: 'Compressão',

    // Text to Image
    convertTextToImage: 'Converter texto para imagem',
    enterTextHere: 'Digite o texto aqui...',
    fontSize: 'Tamanho da fonte',
    fontColor: 'Cor da fonte',
    backgroundColor: 'Cor de fundo',
    generateImage: 'Gerar imagem',
    textImageGenerated: 'Imagem gerada com sucesso',
    failedToGenerateImage: 'Falha ao gerar imagem',
  },
  it: {
    // Nav
    navHome: 'Home',
    navImageToBase64: 'Immagine a Base64',
    navBase64ToImage: 'Base64 a immagine',
    navRemoveBackground: 'Rimuovi sfondo',
    navResize: 'Ridimensiona',
    navConvertFormats: 'Converti formato',
    navCompress: 'Comprimi',
    navTextImage: 'Testo a immagine',

    // Footer
    freeOnlineTools: 'Strumenti online gratuiti — senza registrazione, senza pubblicità.',
    noSignupNoAds: '',
    languageLabel: 'Lingua',

    // Home
    yourImageToolsAllInOnePlace: 'I tuoi strumenti per immagini, tutto in un posto',
    homeSubtitle:
      'Utilità per immagini potenti e semplici per aumentare la tua produttività. Converti i formati, ridimensiona le immagini, rimuovi gli sfondi, comprimi i file e crea immagini di testo. Completamente gratuito, nessuna registrazione richiesta.',
    allTools: 'Tutti',
    conversionTools: 'Conversione',
    processingTools: 'Elaborazione',
    generationTools: 'Generazione',

    // Tool labels
    imageToBase64: 'Immagine a Base64',
    imageToBase64Desc: 'Converti qualsiasi immagine in testo codificato Base64',
    base64ToImage: 'Base64 a immagine',
    base64ToImageDesc: 'Converti il testo Base64 in immagini visualizzabili',
    backgroundRemover: 'Rimozione sfondo',
    backgroundRemoverDesc: 'Rimuovi automaticamente lo sfondo dalle immagini',
    imageResize: 'Ridimensiona immagine',
    imageResizeDesc: 'Ridimensiona le immagini a dimensioni personalizzate',
    formatConverter: 'Convertitore di formato',
    formatConverterDesc: 'Converti immagini tra diversi formati',
    imageCompress: 'Comprimi immagine',
    imageCompressDesc: 'Comprimi le immagini a una dimensione file specifica',
    textToImage: 'Testo a immagine',
    textToImageDesc: 'Converti il testo in formato immagine',

    // Common
    uploadImage: 'Carica immagine',
    uploadFile: 'Carica file',
    fileLoaded: 'File caricato',
    download: 'Scarica',
    clear: 'Cancella',
    results: 'Risultati:',
    result: 'Risultato:',
    error: 'Errore',
    processing: 'Elaborazione...',
    success: 'Successo',

    // Image to Base64
    convertImageToBase64: 'Converti immagine a Base64',
    selectImage: "Seleziona un'immagine",
    base64Output: 'Output Base64:',
    copyBase64: 'Copia Base64',
    copied: 'Copiato!',

    // Base64 to Image
    convertBase64ToImage: 'Converti Base64 a immagine',
    pasteBase64Here: 'Incolla il testo Base64 qui...',
    decodeBase64: 'Decodifica Base64',
    invalidBase64: 'Formato Base64 non valido',

    // Background Remover
    removeImageBackground: "Rimuovi lo sfondo dell'immagine",
    selectImageForRemoval: 'Seleziona immagine per la rimozione dello sfondo',
    removing: 'Rimozione dello sfondo...',
    backgroundRemoved: 'Sfondo rimosso con successo',
    failedToRemoveBackground: 'Impossibile rimuovere lo sfondo',

    // Image Resize
    resizeImage: 'Ridimensiona immagine',
    width: 'Larghezza',
    height: 'Altezza',
    maintainAspectRatio: 'Mantieni proporzioni',
    resizeBtn: 'Ridimensiona',
    pixels: 'px',
    percent: '%',

    // Format Converter
    convertImageFormat: 'Converti formato immagine',
    selectFormat: 'Seleziona formato',
    selectImageFormat: 'Seleziona formato immagine',
    quality: 'Qualità',
    convertBtn: 'Converti',
    supportedFormats: 'Formati supportati: JPG, PNG, WebP, GIF',

    // Image Compress
    compressImageBySize: 'Comprimi immagine per dimensione',
    targetSize: 'Dimensione target',
    mb: 'MB',
    compressingImage: 'Compressione in corso...',
    compressionFailed: 'Compressione non riuscita',
    originalSize: 'Dimensione originale',
    compressedSize: 'Dimensione compressa',
    compression: 'Compressione',

    // Text to Image
    convertTextToImage: 'Converti testo in immagine',
    enterTextHere: 'Inserisci il testo qui...',
    fontSize: 'Dimensione carattere',
    fontColor: 'Colore carattere',
    backgroundColor: 'Colore sfondo',
    generateImage: 'Genera immagine',
    textImageGenerated: 'Immagine generata con successo',
    failedToGenerateImage: "Impossibile generare l'immagine",
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
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
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
