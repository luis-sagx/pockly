
// Language type imported from @pockly/shared

export interface Translations {
  // Nav
  navHome: string;

  // Footer
  freeOnlineTools: string;
  languageLabel: string;
  footerCopyright: string;

  // Home page
  heroTitle: string;
  heroSubtitle: string;
  filterAll: string;
  filterText: string;
  filterProductivity: string;
  filterImage: string;
  filterJson: string;
  filterUrl: string;
  filterCalculator: string;
  pagesAvailable: string;

  // SEO
  seoTitle: string;
  seoDescription: string;

  // Category titles
  catTitleJson: string;
  catTitleText: string;
  catTitleImage: string;
  catTitleUrl: string;
  catTitleCalculator: string;
  catTitleProductivity: string;

  // Link labels — JSON
  linkLabel_json_generator: string;
  linkLabel_json_templates: string;
  linkLabel_json_convert: string;
  linkLabel_json_utils: string;
  linkLabel_json_csvtojson: string;
  linkLabel_json_tsvtojson: string;
  linkLabel_json_jsontocsv: string;
  linkLabel_json_jsontotsv: string;
  linkLabel_json_jsontoxml: string;
  linkLabel_json_jsontoyaml: string;
  linkLabel_json_formatjson: string;
  linkLabel_json_minifyjson: string;
  linkLabel_json_sortjson: string;
  linkLabel_json_validatejson: string;
  linkLabel_json_flattenjson: string;
  linkLabel_json_unflattenjson: string;
  linkLabel_json_diffjson: string;
  linkLabel_json_queryjson: string;

  // Link labels — Text
  linkLabel_text_case: string;
  linkLabel_text_wordcount: string;
  linkLabel_text_diff: string;
  linkLabel_text_password: string;
  linkLabel_text_notes: string;
  linkLabel_text_spell: string;

  // Link labels — Productivity
  linkLabel_productivity_board: string;
  linkLabel_productivity_habits: string;
  linkLabel_productivity_scratchpad: string;

  // Link labels — Image
  linkLabel_image_base64to: string;
  linkLabel_image_base64from: string;
  linkLabel_image_bgremove: string;
  linkLabel_image_resize: string;
  linkLabel_image_compress: string;
  linkLabel_image_crop: string;
  linkLabel_image_format: string;
  linkLabel_image_png: string;
  linkLabel_image_jpeg: string;
  linkLabel_image_webp: string;
  linkLabel_image_bmp: string;
  linkLabel_image_svg: string;
  linkLabel_image_pdf: string;

  // Link labels — Calculator
  linkLabel_calculator_percentof: string;
  linkLabel_calculator_whatpercent: string;
  linkLabel_calculator_percentchange: string;
  linkLabel_calculator_currency: string;
  linkLabel_calculator_length: string;
  linkLabel_calculator_weight: string;
  linkLabel_calculator_temp: string;
  linkLabel_calculator_volume: string;
  linkLabel_calculator_speed: string;

  // Link labels — URL
  linkLabel_url_qr: string;
  linkLabel_url_encode: string;
  linkLabel_url_decode: string;
  linkLabel_url_utm: string;
  linkLabel_url_clean: string;

  // Link descriptions — JSON
  linkDesc_json_generator: string;
  linkDesc_json_templates: string;
  linkDesc_json_convert: string;
  linkDesc_json_utils: string;
  linkDesc_json_csvtojson: string;
  linkDesc_json_tsvtojson: string;
  linkDesc_json_jsontocsv: string;
  linkDesc_json_jsontotsv: string;
  linkDesc_json_jsontoxml: string;
  linkDesc_json_jsontoyaml: string;
  linkDesc_json_formatjson: string;
  linkDesc_json_minifyjson: string;
  linkDesc_json_sortjson: string;
  linkDesc_json_validatejson: string;
  linkDesc_json_flattenjson: string;
  linkDesc_json_unflattenjson: string;
  linkDesc_json_diffjson: string;
  linkDesc_json_queryjson: string;

  // Link descriptions — Text
  linkDesc_text_case: string;
  linkDesc_text_wordcount: string;
  linkDesc_text_diff: string;
  linkDesc_text_password: string;
  linkDesc_text_notes: string;
  linkDesc_text_spell: string;

  // Link descriptions — Productivity
  linkDesc_productivity_board: string;
  linkDesc_productivity_habits: string;
  linkDesc_productivity_scratchpad: string;

  // Link descriptions — Image
  linkDesc_image_base64to: string;
  linkDesc_image_base64from: string;
  linkDesc_image_bgremove: string;
  linkDesc_image_resize: string;
  linkDesc_image_compress: string;
  linkDesc_image_crop: string;
  linkDesc_image_format: string;
  linkDesc_image_png: string;
  linkDesc_image_jpeg: string;
  linkDesc_image_webp: string;
  linkDesc_image_bmp: string;
  linkDesc_image_svg: string;
  linkDesc_image_pdf: string;

  // Link descriptions — Calculator
  linkDesc_calculator_percentof: string;
  linkDesc_calculator_whatpercent: string;
  linkDesc_calculator_percentchange: string;
  linkDesc_calculator_currency: string;
  linkDesc_calculator_length: string;
  linkDesc_calculator_weight: string;
  linkDesc_calculator_temp: string;
  linkDesc_calculator_volume: string;
  linkDesc_calculator_speed: string;

  // Link descriptions — URL
  linkDesc_url_qr: string;
  linkDesc_url_encode: string;
  linkDesc_url_decode: string;
  linkDesc_url_utm: string;
  linkDesc_url_clean: string;
}

export const landingTranslations: Record<string, Record<string, string>> = {
  en: {
    navHome: 'Home',

    freeOnlineTools: 'Free online tools to boost your productivity.',
    languageLabel: 'Language',
    footerCopyright: '© 2026 Pockly. All tools, one launcher.',

    heroTitle: 'All your tools in one place',
    heroSubtitle:
      'Open the full collection of text, image, JSON, URL and calculator tools from a single hub. Every card below takes you straight to the matching app.',
    filterAll: 'All',
    filterText: 'Text',
    filterProductivity: 'Productivity',
    filterImage: 'Image',
    filterJson: 'JSON',
    filterUrl: 'URL',
    filterCalculator: 'Calculator',
    pagesAvailable: 'pages available',

    seoTitle: 'Pockly - Free Online Tools for Daily Productivity',
    seoDescription:
      'Free online tools for text, JSON, images, URLs, calculators, and personal productivity.',

    // Category titles
    catTitleJson: 'JSON Tools',
    catTitleText: 'Text Tools',
    catTitleImage: 'Image Tools',
    catTitleUrl: 'URL Tools',
    catTitleCalculator: 'Calculator Tools',
    catTitleProductivity: 'Productivity Tools',

    // Link labels — JSON
    linkLabel_json_generator: 'Generator',
    linkLabel_json_templates: 'Templates',
    linkLabel_json_convert: 'Convert',
    linkLabel_json_utils: 'Utils',
    linkLabel_json_csvtojson: 'CSV to JSON',
    linkLabel_json_tsvtojson: 'TSV to JSON',
    linkLabel_json_jsontocsv: 'JSON to CSV',
    linkLabel_json_jsontotsv: 'JSON to TSV',
    linkLabel_json_jsontoxml: 'JSON to XML',
    linkLabel_json_jsontoyaml: 'JSON to YAML',
    linkLabel_json_formatjson: 'Format JSON',
    linkLabel_json_minifyjson: 'Minify JSON',
    linkLabel_json_sortjson: 'Sort JSON',
    linkLabel_json_validatejson: 'Validate JSON',
    linkLabel_json_flattenjson: 'Flatten JSON',
    linkLabel_json_unflattenjson: 'Unflatten JSON',
    linkLabel_json_diffjson: 'Diff JSON',
    linkLabel_json_queryjson: 'Query JSON',

    // Link labels — Text
    linkLabel_text_case: 'Text Case',
    linkLabel_text_wordcount: 'Word Counter',
    linkLabel_text_diff: 'Diff Checker',
    linkLabel_text_password: 'Password Generator',
    linkLabel_text_notes: 'Quick Notes',
    linkLabel_text_spell: 'Spell Checker',

    // Link labels — Productivity
    linkLabel_productivity_board: 'Board',
    linkLabel_productivity_habits: 'Habits',
    linkLabel_productivity_scratchpad: 'Scratchpad',

    // Link labels — Image
    linkLabel_image_base64to: 'Image to Base64',
    linkLabel_image_base64from: 'Base64 to Image',
    linkLabel_image_bgremove: 'Remove Background',
    linkLabel_image_resize: 'Resize',
    linkLabel_image_compress: 'Compress',
    linkLabel_image_crop: 'Crop',
    linkLabel_image_format: 'Format Converter',
    linkLabel_image_png: 'PNG Converter',
    linkLabel_image_jpeg: 'JPEG Converter',
    linkLabel_image_webp: 'WebP Converter',
    linkLabel_image_bmp: 'BMP Converter',
    linkLabel_image_svg: 'SVG Converter',
    linkLabel_image_pdf: 'PDF Converter',

    // Link labels — Calculator
    linkLabel_calculator_percentof: 'Percent of Y',
    linkLabel_calculator_whatpercent: 'What Percent',
    linkLabel_calculator_percentchange: 'Percentage Change',
    linkLabel_calculator_currency: 'Currency Converter',
    linkLabel_calculator_length: 'Length Converter',
    linkLabel_calculator_weight: 'Weight Converter',
    linkLabel_calculator_temp: 'Temperature Converter',
    linkLabel_calculator_volume: 'Volume Converter',
    linkLabel_calculator_speed: 'Speed Converter',

    // Link labels — URL
    linkLabel_url_qr: 'QR Generator',
    linkLabel_url_encode: 'URL Encoder',
    linkLabel_url_decode: 'URL Decoder',
    linkLabel_url_utm: 'UTM Builder',
    linkLabel_url_clean: 'URL Cleaner',

    // Link descriptions — JSON
    linkDesc_json_generator: 'Build JSON interactively from scratch',
    linkDesc_json_templates:
      'Ready-to-use datasets for testing and prototyping',
    linkDesc_json_convert: 'Convert between CSV, TSV, XML and YAML',
    linkDesc_json_utils:
      'Format, minify, sort, validate, flatten, diff and query JSON',
    linkDesc_json_csvtojson: 'Convert CSV rows into JSON arrays',
    linkDesc_json_tsvtojson: 'Convert TSV tables into JSON arrays',
    linkDesc_json_jsontocsv: 'Export JSON arrays as CSV',
    linkDesc_json_jsontotsv: 'Export JSON arrays as TSV',
    linkDesc_json_jsontoxml: 'Transform JSON into XML markup',
    linkDesc_json_jsontoyaml: 'Transform JSON into YAML documents',
    linkDesc_json_formatjson: 'Pretty-print and indent JSON',
    linkDesc_json_minifyjson: 'Remove whitespace from JSON payloads',
    linkDesc_json_sortjson: 'Sort JSON object keys recursively',
    linkDesc_json_validatejson: 'Validate JSON syntax instantly',
    linkDesc_json_flattenjson: 'Flatten nested JSON into dotted paths',
    linkDesc_json_unflattenjson: 'Rebuild nested JSON from flat keys',
    linkDesc_json_diffjson: 'Compare two JSON documents side by side',
    linkDesc_json_queryjson: 'Query JSON data with JSONPath',

    // Link descriptions — Text
    linkDesc_text_case:
      'Convert between UPPER, lower, Title, Sentence and more',
    linkDesc_text_wordcount:
      'Count words, characters, sentences and paragraphs',
    linkDesc_text_diff: 'Compare two blocks of text side by side',
    linkDesc_text_password: 'Create strong, customisable passwords',
    linkDesc_text_notes: 'Private notes with auto-save to local storage',
    linkDesc_text_spell: 'Check spelling and grammar in your text',

    // Link descriptions — Productivity
    linkDesc_productivity_board:
      'Organize tasks by Today, This week and Someday',
    linkDesc_productivity_habits: 'Track recurring routines and daily streaks',
    linkDesc_productivity_scratchpad:
      'Capture loose thoughts in a fast autosaving pad',

    // Link descriptions — Image
    linkDesc_image_base64to: 'Encode any image to a Base64 data URI',
    linkDesc_image_base64from: 'Decode a Base64 string back to an image',
    linkDesc_image_bgremove: 'Remove image backgrounds automatically',
    linkDesc_image_resize: 'Resize images by exact dimensions or percentage',
    linkDesc_image_compress:
      'Reduce file size while preserving visual quality',
    linkDesc_image_crop: 'Crop images to a selected region',
    linkDesc_image_format: 'Convert between PNG, JPEG, WebP, BMP, SVG and PDF',
    linkDesc_image_png: 'Convert images to PNG format',
    linkDesc_image_jpeg: 'Convert images to JPEG format',
    linkDesc_image_webp: 'Convert images to WebP format',
    linkDesc_image_bmp: 'Convert images to BMP format',
    linkDesc_image_svg: 'Convert images to SVG format',
    linkDesc_image_pdf: 'Convert images to PDF format',

    // Link descriptions — Calculator
    linkDesc_calculator_percentof: 'Calculate what is X% of a given number',
    linkDesc_calculator_whatpercent: 'Find what percentage X is of Y',
    linkDesc_calculator_percentchange:
      'Calculate increase or decrease between two values',
    linkDesc_calculator_currency:
      'Convert between currencies with live exchange rates',
    linkDesc_calculator_length: 'Convert between meters, feet, inches and more',
    linkDesc_calculator_weight: 'Convert between kg, lbs, oz and more',
    linkDesc_calculator_temp: 'Convert between Celsius, Fahrenheit and Kelvin',
    linkDesc_calculator_volume:
      'Convert between liters, gallons, cups and more',
    linkDesc_calculator_speed: 'Convert between km/h, mph, knots and more',

    // Link descriptions — URL
    linkDesc_url_qr: 'Generate QR codes from text, URLs and more',
    linkDesc_url_encode: 'Encode special characters for safe URLs',
    linkDesc_url_decode: 'Decode percent-encoded URLs back to readable text',
    linkDesc_url_utm: 'Build UTM parameters for campaign tracking',
    linkDesc_url_clean: 'Remove tracking parameters and clean up URLs',
  },
  es: {
    navHome: 'Inicio',

    freeOnlineTools: 'Herramientas online gratuitas para tu productividad.',
    languageLabel: 'Idioma',
    footerCopyright: '© 2026 Pockly. Todas las herramientas, un solo lanzador.',

    heroTitle: 'Todas tus herramientas en un solo lugar',
    heroSubtitle:
      'Abre la colección completa de herramientas de texto, imagen, JSON, URL y calculadora desde un solo hub. Cada tarjeta te lleva directo a la app correspondiente.',
    filterAll: 'Todas',
    filterText: 'Texto',
    filterProductivity: 'Productividad',
    filterImage: 'Imagen',
    filterJson: 'JSON',
    filterUrl: 'URL',
    filterCalculator: 'Calculadora',
    pagesAvailable: 'páginas disponibles',

    seoTitle:
      'Pockly - Herramientas online gratuitas para la productividad diaria',
    seoDescription:
      'Herramientas de productividad online gratuitas: contador de palabras, generador JSON, eliminador de fondos, redimensionador de imágenes, convertidor de formato, conversor de texto, y más.',

    // Category titles
    catTitleJson: 'Herramientas JSON',
    catTitleText: 'Herramientas de texto',
    catTitleImage: 'Herramientas de imagen',
    catTitleUrl: 'Herramientas URL',
    catTitleCalculator: 'Herramientas de calculadora',
    catTitleProductivity: 'Herramientas de productividad',

    // Link labels — JSON
    linkLabel_json_generator: 'Generador',
    linkLabel_json_templates: 'Plantillas',
    linkLabel_json_convert: 'Convertir',
    linkLabel_json_utils: 'Utilidades',
    linkLabel_json_csvtojson: 'CSV a JSON',
    linkLabel_json_tsvtojson: 'TSV a JSON',
    linkLabel_json_jsontocsv: 'JSON a CSV',
    linkLabel_json_jsontotsv: 'JSON a TSV',
    linkLabel_json_jsontoxml: 'JSON a XML',
    linkLabel_json_jsontoyaml: 'JSON a YAML',
    linkLabel_json_formatjson: 'Formatear JSON',
    linkLabel_json_minifyjson: 'Minimizar JSON',
    linkLabel_json_sortjson: 'Ordenar JSON',
    linkLabel_json_validatejson: 'Validar JSON',
    linkLabel_json_flattenjson: 'Aplanar JSON',
    linkLabel_json_unflattenjson: 'Desaplanar JSON',
    linkLabel_json_diffjson: 'Comparar JSON',
    linkLabel_json_queryjson: 'Consultar JSON',

    // Link labels — Text
    linkLabel_text_case: 'Conversor de texto',
    linkLabel_text_wordcount: 'Contador de palabras',
    linkLabel_text_diff: 'Comparador de texto',
    linkLabel_text_password: 'Generador de contraseñas',
    linkLabel_text_notes: 'Notas rápidas',
    linkLabel_text_spell: 'Corrector ortográfico',

    // Link labels — Productivity
    linkLabel_productivity_board: 'Tablero',
    linkLabel_productivity_habits: 'Hábitos',
    linkLabel_productivity_scratchpad: 'Bloc rápido',

    // Link labels — Image
    linkLabel_image_base64to: 'Imagen a Base64',
    linkLabel_image_base64from: 'Base64 a imagen',
    linkLabel_image_bgremove: 'Eliminar fondo',
    linkLabel_image_resize: 'Redimensionar',
    linkLabel_image_compress: 'Comprimir',
    linkLabel_image_crop: 'Recortar',
    linkLabel_image_format: 'Convertidor de formato',
    linkLabel_image_png: 'Convertidor PNG',
    linkLabel_image_jpeg: 'Convertidor JPEG',
    linkLabel_image_webp: 'Convertidor WebP',
    linkLabel_image_bmp: 'Convertidor BMP',
    linkLabel_image_svg: 'Convertidor SVG',
    linkLabel_image_pdf: 'Convertidor PDF',

    // Link labels — Calculator
    linkLabel_calculator_percentof: 'Porcentaje de Y',
    linkLabel_calculator_whatpercent: 'Qué porcentaje',
    linkLabel_calculator_percentchange: 'Cambio porcentual',
    linkLabel_calculator_currency: 'Conversor de divisas',
    linkLabel_calculator_length: 'Conversor de longitud',
    linkLabel_calculator_weight: 'Conversor de peso',
    linkLabel_calculator_temp: 'Conversor de temperatura',
    linkLabel_calculator_volume: 'Conversor de volumen',
    linkLabel_calculator_speed: 'Conversor de velocidad',

    // Link labels — URL
    linkLabel_url_qr: 'Generador QR',
    linkLabel_url_encode: 'Codificador URL',
    linkLabel_url_decode: 'Decodificador URL',
    linkLabel_url_utm: 'Constructor UTM',
    linkLabel_url_clean: 'Limpiador URL',

    // Link descriptions — JSON
    linkDesc_json_generator: 'Construye JSON de forma interactiva desde cero',
    linkDesc_json_templates:
      'Conjuntos de datos listos para pruebas y prototipado',
    linkDesc_json_convert: 'Convierte entre CSV, TSV, XML y YAML',
    linkDesc_json_utils:
      'Formatea, minimiza, ordena, valida, aplana, compara y consulta JSON',
    linkDesc_json_csvtojson: 'Convierte filas CSV en arreglos JSON',
    linkDesc_json_tsvtojson: 'Convierte tablas TSV en arreglos JSON',
    linkDesc_json_jsontocsv: 'Exporta arreglos JSON como CSV',
    linkDesc_json_jsontotsv: 'Exporta arreglos JSON como TSV',
    linkDesc_json_jsontoxml: 'Transforma JSON en marcado XML',
    linkDesc_json_jsontoyaml: 'Transforma JSON en documentos YAML',
    linkDesc_json_formatjson: 'Da formato e indentación legible a JSON',
    linkDesc_json_minifyjson: 'Elimina espacios en blanco del payload JSON',
    linkDesc_json_sortjson: 'Ordena recursivamente las claves de objetos JSON',
    linkDesc_json_validatejson: 'Valida al instante la sintaxis de JSON',
    linkDesc_json_flattenjson: 'Aplana JSON anidado en rutas con puntos',
    linkDesc_json_unflattenjson: 'Reconstruye JSON anidado desde claves planas',
    linkDesc_json_diffjson: 'Compara dos documentos JSON lado a lado',
    linkDesc_json_queryjson: 'Consulta datos JSON con JSONPath',

    // Link descriptions — Text
    linkDesc_text_case:
      'Convierte entre MAYÚSCULAS, minúsculas, Título, Oración y más',
    linkDesc_text_wordcount:
      'Cuenta palabras, caracteres, oraciones y párrafos',
    linkDesc_text_diff: 'Compara dos bloques de texto lado a lado',
    linkDesc_text_password: 'Crea contraseñas seguras y personalizables',
    linkDesc_text_notes:
      'Notas privadas con guardado automático en el navegador',
    linkDesc_text_spell: 'Revisa ortografía y gramática en tu texto',

    // Link descriptions — Productivity
    linkDesc_productivity_board:
      'Organiza tareas por Hoy, Esta semana y Algún día',
    linkDesc_productivity_habits:
      'Registra rutinas recurrentes y rachas diarias',
    linkDesc_productivity_scratchpad:
      'Captura ideas sueltas en un bloc rápido con autosave',

    // Link descriptions — Image
    linkDesc_image_base64to:
      'Codifica cualquier imagen a un URI de datos Base64',
    linkDesc_image_base64from:
      'Decodifica una cadena Base64 de vuelta a imagen',
    linkDesc_image_bgremove: 'Elimina fondos de imágenes automáticamente',
    linkDesc_image_resize:
      'Redimensiona imágenes por dimensiones exactas o porcentaje',
    linkDesc_image_compress:
      'Reduce el tamaño del archivo conservando la calidad visual',
    linkDesc_image_crop: 'Recorta imágenes a una región seleccionada',
    linkDesc_image_format: 'Convierte entre PNG, JPEG, WebP, BMP, SVG y PDF',
    linkDesc_image_png: 'Convierte imágenes a formato PNG',
    linkDesc_image_jpeg: 'Convierte imágenes a formato JPEG',
    linkDesc_image_webp: 'Convierte imágenes a formato WebP',
    linkDesc_image_bmp: 'Convierte imágenes a formato BMP',
    linkDesc_image_svg: 'Convierte imágenes a formato SVG',
    linkDesc_image_pdf: 'Convierte imágenes a formato PDF',

    // Link descriptions — Calculator
    linkDesc_calculator_percentof: 'Calcula cuánto es el X% de un número dado',
    linkDesc_calculator_whatpercent: 'Encuentra qué porcentaje es X de Y',
    linkDesc_calculator_percentchange:
      'Calcula el aumento o disminución entre dos valores',
    linkDesc_calculator_currency:
      'Convierte entre divisas con tasas de cambio en vivo',
    linkDesc_calculator_length: 'Convierte entre metros, pies, pulgadas y más',
    linkDesc_calculator_weight: 'Convierte entre kg, libras, onzas y más',
    linkDesc_calculator_temp: 'Convierte entre Celsius, Fahrenheit y Kelvin',
    linkDesc_calculator_volume: 'Convierte entre litros, galones, tazas y más',
    linkDesc_calculator_speed: 'Convierte entre km/h, mph, nudos y más',

    // Link descriptions — URL
    linkDesc_url_qr: 'Genera códigos QR desde texto, URLs y más',
    linkDesc_url_encode: 'Codifica caracteres especiales para URLs seguras',
    linkDesc_url_decode: 'Decodifica URLs codificadas a texto legible',
    linkDesc_url_utm: 'Construye parámetros UTM para seguimiento de campañas',
    linkDesc_url_clean: 'Elimina parámetros de seguimiento y limpia URLs',
  },
};
