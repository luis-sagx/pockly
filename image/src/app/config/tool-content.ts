import type { Language, ToolContentBlock } from '@pockly/shared';

type ToolKey =
  | 'backgroundRemover'
  | 'base64'
  | 'compress'
  | 'crop'
  | 'resize'
  | 'textImage';

export const TOOL_CONTENT: Record<Language, Record<ToolKey, ToolContentBlock>> = {
  en: {
    backgroundRemover: {
      aboutTitle: 'About the Background Remover',
      about: [
        'The Background Remover automatically detects the subject of a photo and removes the background in one click, producing a transparent PNG. It replaces tedious manual selection in photo editors for the most common use cases: product photos for online stores, profile pictures, logos, and images for presentations and designs.',
        'The processing uses an AI segmentation model that runs on your device, so the photo you upload is analyzed locally in your browser — it is not sent to a server. Results are best with a clearly defined subject such as a person, product, or animal.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Upload or drag a photo into the tool.',
        'Wait a moment while the subject is detected automatically.',
        'Preview the result with the background removed.',
        'Download the transparent PNG.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What image formats can I upload?',
          a: 'Common formats like PNG, JPEG, and WebP. The result is delivered as a PNG with a transparent background.',
        },
        {
          q: 'Is my photo uploaded to a server?',
          a: 'No. The AI model runs in your browser; your photo stays on your device throughout the process.',
        },
        {
          q: 'What photos give the best results?',
          a: 'Images with a clear, well-lit subject and reasonable contrast against the background. Fine details like hair may need touch-up in complex scenes.',
        },
        {
          q: 'Is there a usage limit?',
          a: 'No. Remove backgrounds from as many images as you need, free of charge.',
        },
      ],
    },
    base64: {
      aboutTitle: 'About the Base64 Image Converter',
      about: [
        'This tool converts images to Base64 text strings and decodes Base64 strings back into images. Base64 encoding lets you embed an image directly inside HTML, CSS, JSON, or an email template as a data URI — no separate image file or extra network request needed.',
        'Developers use it for small icons and logos embedded in stylesheets, email signatures, API payloads that must carry an image inline, and quick tests. Encoding and decoding run entirely in your browser.',
      ],
      howTitle: 'How to use it',
      steps: [
        'To encode: upload an image and copy the generated Base64 string or ready-made data URI.',
        'To decode: paste a Base64 string and preview the reconstructed image.',
        'Download the decoded image if needed.',
        'Use the copy button to grab the result in one click.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What is a data URI?',
          a: 'A string like data:image/png;base64,... that carries the whole image inline. You can use it directly in an <img> src attribute or a CSS background-image.',
        },
        {
          q: 'Does Base64 make files bigger?',
          a: 'Yes, about 33% larger than the binary original. That is why it suits small images — icons, logos — rather than large photos.',
        },
        {
          q: 'When should I embed images as Base64?',
          a: 'When avoiding an extra HTTP request matters more than size: small icons in CSS, images in emails, or payloads that must be self-contained.',
        },
        {
          q: 'Is my image kept private?',
          a: 'Yes. Conversion happens locally in your browser; the image is never uploaded.',
        },
      ],
    },
    compress: {
      aboutTitle: 'About the Image Compressor',
      about: [
        'The Image Compressor reduces the file size of your images while keeping visual quality as high as possible. Smaller images load faster on websites, pass email attachment limits, meet upload size restrictions on forms and platforms, and save storage space.',
        'You control the quality level and can compare the original and compressed versions before downloading. Compression runs locally in your browser, so private photos and unpublished designs stay on your device.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Upload or drag your image into the tool.',
        'Adjust the quality level to balance size against fidelity.',
        'Compare the file sizes before and after compression.',
        'Download the compressed image.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How much smaller will my image get?',
          a: 'Typically 50–90% smaller for photos, depending on the source image and the quality you choose. The tool shows the exact size before and after.',
        },
        {
          q: 'Will the image look worse?',
          a: 'At moderate settings the difference is invisible to most viewers. Aggressive compression may show artifacts — use the preview to pick the sweet spot.',
        },
        {
          q: 'What formats are supported?',
          a: 'Common web formats such as JPEG, PNG, and WebP.',
        },
        {
          q: 'Are my images uploaded?',
          a: 'No. Compression happens on your device; nothing is transmitted to a server.',
        },
      ],
    },
    crop: {
      aboutTitle: 'About the Image Cropper',
      about: [
        'The Image Cropper cuts an image down to exactly the region you select. Use it to remove distracting edges, focus on a subject, fit a required aspect ratio for social media or profile pictures, or extract one part of a screenshot.',
        'The crop is performed locally in your browser at full resolution — no watermarks, no quality loss beyond the crop itself, and no upload of your image to any server.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Upload or drag your image into the tool.',
        'Drag the handles to select the region you want to keep.',
        'Preview the cropped result.',
        'Download the cropped image.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Does cropping reduce image quality?',
          a: 'No. The pixels you keep are preserved exactly as they were; only the area outside your selection is discarded.',
        },
        {
          q: 'Can I crop to a specific aspect ratio?',
          a: 'Yes, adjust the selection to the ratio you need — square for avatars, 16:9 for covers, or any custom region.',
        },
        {
          q: 'What formats are supported?',
          a: 'Common formats like PNG, JPEG, and WebP, keeping the original format in the output.',
        },
        {
          q: 'Is the image sent anywhere?',
          a: 'No. Cropping happens entirely in your browser.',
        },
      ],
    },
    resize: {
      aboutTitle: 'About the Image Resizer',
      about: [
        'The Image Resizer changes the dimensions of an image to exact pixel values or by percentage, with a live preview. Resizing is essential for meeting platform requirements — avatars, banners, product photos — reducing file size for faster pages, and preparing images for print or documents.',
        'The tool preserves aspect ratio by default so photos never look stretched, and everything runs locally in your browser: your images are never uploaded.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Upload or drag your image into the tool.',
        'Enter the target width or height in pixels, or choose a percentage.',
        'Keep aspect ratio locked to avoid distortion, or unlock it for exact dimensions.',
        'Preview and download the resized image.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Will enlarging an image improve its quality?',
          a: 'No — upscaling cannot add detail that was not captured. It is best for slight enlargements; shrinking always preserves sharpness.',
        },
        {
          q: 'What does "keep aspect ratio" do?',
          a: 'It scales width and height together so the image is never stretched or squashed. Unlock it only when a platform demands exact dimensions.',
        },
        {
          q: 'What formats are supported?',
          a: 'PNG, JPEG, WebP, and other common formats.',
        },
        {
          q: 'Are my photos private?',
          a: 'Yes. Resizing happens on your device; images never leave your browser.',
        },
      ],
    },
    textImage: {
      aboutTitle: 'About the Text to Image Tool',
      about: [
        'The Text to Image tool renders your text as a downloadable image. It is handy for sharing quotes and announcements on social networks that favor images, creating simple banners and placeholders, and preserving exact text formatting where plain text would be altered.',
        'You control the text content and appearance, and the image is generated instantly in your browser — nothing is uploaded.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Type or paste the text you want to render.',
        'Adjust the appearance options.',
        'Preview the generated image.',
        'Download it as an image file.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What can I use the generated images for?',
          a: 'Anything — social media posts, quotes, simple banners, placeholders. The text and design are yours.',
        },
        {
          q: 'What format is the output?',
          a: 'A standard web image format (PNG) that you can share or embed anywhere.',
        },
        {
          q: 'Does long text work?',
          a: 'Yes, the canvas adapts to your content; very long texts simply produce a taller image.',
        },
        {
          q: 'Is my text sent to a server?',
          a: 'No. The image is drawn locally in your browser.',
        },
      ],
    },
  },
  es: {
    backgroundRemover: {
      aboutTitle: 'Sobre el eliminador de fondos',
      about: [
        'El eliminador de fondos detecta automáticamente el sujeto de una foto y elimina el fondo con un clic, produciendo un PNG transparente. Sustituye la tediosa selección manual de los editores de fotos en los casos más comunes: fotos de producto para tiendas online, fotos de perfil, logotipos e imágenes para presentaciones y diseños.',
        'El procesamiento usa un modelo de segmentación con IA que se ejecuta en tu dispositivo, así que la foto que subes se analiza localmente en tu navegador: no se envía a un servidor. Los mejores resultados se obtienen con un sujeto bien definido, como una persona, un producto o un animal.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Sube o arrastra una foto a la herramienta.',
        'Espera un momento mientras el sujeto se detecta automáticamente.',
        'Previsualiza el resultado con el fondo eliminado.',
        'Descarga el PNG transparente.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué formatos de imagen puedo subir?',
          a: 'Formatos comunes como PNG, JPEG y WebP. El resultado se entrega como PNG con fondo transparente.',
        },
        {
          q: '¿Mi foto se sube a un servidor?',
          a: 'No. El modelo de IA se ejecuta en tu navegador; tu foto permanece en tu dispositivo durante todo el proceso.',
        },
        {
          q: '¿Qué fotos dan mejores resultados?',
          a: 'Imágenes con un sujeto claro y bien iluminado, con contraste razonable frente al fondo. Detalles finos como el cabello pueden requerir retoque en escenas complejas.',
        },
        {
          q: '¿Hay límite de uso?',
          a: 'No. Elimina fondos de todas las imágenes que necesites, gratis.',
        },
      ],
    },
    base64: {
      aboutTitle: 'Sobre el conversor Base64 de imágenes',
      about: [
        'Esta herramienta convierte imágenes en cadenas de texto Base64 y decodifica cadenas Base64 de vuelta a imágenes. La codificación Base64 permite incrustar una imagen directamente en HTML, CSS, JSON o una plantilla de correo como data URI, sin archivo de imagen separado ni petición de red adicional.',
        'Los desarrolladores la usan para iconos y logotipos pequeños incrustados en hojas de estilo, firmas de correo, payloads de API que deben llevar una imagen en línea y pruebas rápidas. La codificación y decodificación se ejecutan por completo en tu navegador.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Para codificar: sube una imagen y copia la cadena Base64 generada o el data URI listo para usar.',
        'Para decodificar: pega una cadena Base64 y previsualiza la imagen reconstruida.',
        'Descarga la imagen decodificada si la necesitas.',
        'Usa el botón de copiar para obtener el resultado con un clic.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué es un data URI?',
          a: 'Una cadena como data:image/png;base64,... que lleva la imagen completa en línea. Puedes usarla directamente en el atributo src de un <img> o en un background-image de CSS.',
        },
        {
          q: '¿Base64 hace los archivos más grandes?',
          a: 'Sí, alrededor de un 33% más que el binario original. Por eso conviene para imágenes pequeñas —iconos, logotipos— y no para fotos grandes.',
        },
        {
          q: '¿Cuándo conviene incrustar imágenes como Base64?',
          a: 'Cuando evitar una petición HTTP extra importa más que el tamaño: iconos pequeños en CSS, imágenes en correos o payloads autocontenidos.',
        },
        {
          q: '¿Mi imagen es privada?',
          a: 'Sí. La conversión ocurre localmente en tu navegador; la imagen nunca se sube.',
        },
      ],
    },
    compress: {
      aboutTitle: 'Sobre el compresor de imágenes',
      about: [
        'El compresor de imágenes reduce el tamaño de archivo de tus imágenes manteniendo la calidad visual lo más alta posible. Las imágenes más ligeras cargan más rápido en la web, pasan los límites de adjuntos del correo, cumplen restricciones de subida en formularios y plataformas y ahorran almacenamiento.',
        'Tú controlas el nivel de calidad y puedes comparar la versión original con la comprimida antes de descargar. La compresión se ejecuta localmente en tu navegador, así que las fotos privadas y los diseños sin publicar se quedan en tu dispositivo.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Sube o arrastra tu imagen a la herramienta.',
        'Ajusta el nivel de calidad para equilibrar tamaño y fidelidad.',
        'Compara los tamaños de archivo antes y después de comprimir.',
        'Descarga la imagen comprimida.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cuánto se reducirá mi imagen?',
          a: 'Normalmente entre un 50% y un 90% en fotos, según la imagen de origen y la calidad elegida. La herramienta muestra el tamaño exacto antes y después.',
        },
        {
          q: '¿Se verá peor la imagen?',
          a: 'Con ajustes moderados la diferencia es invisible para la mayoría. Una compresión agresiva puede mostrar artefactos: usa la vista previa para encontrar el punto justo.',
        },
        {
          q: '¿Qué formatos se admiten?',
          a: 'Formatos web comunes como JPEG, PNG y WebP.',
        },
        {
          q: '¿Mis imágenes se suben a algún lado?',
          a: 'No. La compresión ocurre en tu dispositivo; nada se transmite a un servidor.',
        },
      ],
    },
    crop: {
      aboutTitle: 'Sobre el recortador de imágenes',
      about: [
        'El recortador de imágenes corta una imagen exactamente a la región que selecciones. Úsalo para quitar bordes que distraen, centrar la atención en un sujeto, ajustarte a una proporción requerida por redes sociales o fotos de perfil, o extraer una parte de una captura de pantalla.',
        'El recorte se realiza localmente en tu navegador a resolución completa: sin marcas de agua, sin pérdida de calidad más allá del propio recorte y sin subir tu imagen a ningún servidor.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Sube o arrastra tu imagen a la herramienta.',
        'Arrastra los controles para seleccionar la región que quieres conservar.',
        'Previsualiza el resultado recortado.',
        'Descarga la imagen recortada.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Recortar reduce la calidad?',
          a: 'No. Los píxeles que conservas se mantienen exactamente igual; solo se descarta el área fuera de tu selección.',
        },
        {
          q: '¿Puedo recortar a una proporción concreta?',
          a: 'Sí, ajusta la selección a la proporción que necesites: cuadrada para avatares, 16:9 para portadas o cualquier región personalizada.',
        },
        {
          q: '¿Qué formatos se admiten?',
          a: 'Formatos comunes como PNG, JPEG y WebP, conservando el formato original en la salida.',
        },
        {
          q: '¿La imagen se envía a algún lado?',
          a: 'No. El recorte ocurre por completo en tu navegador.',
        },
      ],
    },
    resize: {
      aboutTitle: 'Sobre el redimensionador de imágenes',
      about: [
        'El redimensionador cambia las dimensiones de una imagen a valores exactos en píxeles o por porcentaje, con vista previa en vivo. Redimensionar es esencial para cumplir requisitos de plataformas —avatares, banners, fotos de producto—, reducir el peso para páginas más rápidas y preparar imágenes para impresión o documentos.',
        'La herramienta conserva la proporción por defecto para que las fotos nunca se vean estiradas, y todo se ejecuta localmente en tu navegador: tus imágenes nunca se suben.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Sube o arrastra tu imagen a la herramienta.',
        'Escribe el ancho o alto objetivo en píxeles, o elige un porcentaje.',
        'Mantén la proporción bloqueada para evitar distorsión, o desbloquéala para dimensiones exactas.',
        'Previsualiza y descarga la imagen redimensionada.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Agrandar una imagen mejora su calidad?',
          a: 'No: escalar hacia arriba no puede añadir detalle que no se capturó. Funciona bien para ampliaciones ligeras; reducir siempre conserva la nitidez.',
        },
        {
          q: '¿Qué hace "mantener proporción"?',
          a: 'Escala ancho y alto juntos para que la imagen nunca se estire ni se aplaste. Desactívala solo cuando una plataforma exija dimensiones exactas.',
        },
        {
          q: '¿Qué formatos se admiten?',
          a: 'PNG, JPEG, WebP y otros formatos comunes.',
        },
        {
          q: '¿Mis fotos son privadas?',
          a: 'Sí. El redimensionado ocurre en tu dispositivo; las imágenes nunca salen de tu navegador.',
        },
      ],
    },
    textImage: {
      aboutTitle: 'Sobre la herramienta de texto a imagen',
      about: [
        'La herramienta de texto a imagen convierte tu texto en una imagen descargable. Es práctica para compartir citas y anuncios en redes sociales que favorecen imágenes, crear banners y marcadores de posición sencillos, y conservar el formato exacto del texto donde el texto plano se alteraría.',
        'Tú controlas el contenido y la apariencia, y la imagen se genera al instante en tu navegador: nada se sube a ningún servidor.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Escribe o pega el texto que quieres convertir.',
        'Ajusta las opciones de apariencia.',
        'Previsualiza la imagen generada.',
        'Descárgala como archivo de imagen.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Para qué puedo usar las imágenes generadas?',
          a: 'Para lo que quieras: publicaciones en redes, citas, banners sencillos, marcadores de posición. El texto y el diseño son tuyos.',
        },
        {
          q: '¿En qué formato sale la imagen?',
          a: 'En un formato de imagen web estándar (PNG) que puedes compartir o incrustar donde quieras.',
        },
        {
          q: '¿Funciona con textos largos?',
          a: 'Sí, el lienzo se adapta a tu contenido; los textos muy largos simplemente producen una imagen más alta.',
        },
        {
          q: '¿Mi texto se envía a un servidor?',
          a: 'No. La imagen se dibuja localmente en tu navegador.',
        },
      ],
    },
  },
};

// ---- Parametrized blocks for convert-to-* pages ----

interface FormatSpec {
  key: string;
  fmt: string;
  enWhy: string;
  esWhy: string;
}

const FORMAT_SPECS: FormatSpec[] = [
  {
    key: 'png', fmt: 'PNG',
    enWhy: 'PNG is lossless and supports transparency, making it the standard for logos, screenshots, icons, and graphics with sharp edges or text',
    esWhy: 'PNG no pierde calidad y admite transparencia, lo que lo hace el estándar para logotipos, capturas de pantalla, iconos y gráficos con bordes nítidos o texto',
  },
  {
    key: 'jpeg', fmt: 'JPEG',
    enWhy: 'JPEG compresses photographs efficiently, producing much smaller files than PNG for photos — ideal for web pages, email, and storage',
    esWhy: 'JPEG comprime fotografías de forma eficiente, produciendo archivos mucho más pequeños que PNG para fotos: ideal para páginas web, correo y almacenamiento',
  },
  {
    key: 'webp', fmt: 'WebP',
    enWhy: 'WebP delivers 25–35% smaller files than JPEG at the same visual quality and supports transparency, making it the modern choice for fast websites',
    esWhy: 'WebP produce archivos un 25–35% más pequeños que JPEG con la misma calidad visual y admite transparencia, la opción moderna para sitios rápidos',
  },
  {
    key: 'bmp', fmt: 'BMP',
    enWhy: 'BMP stores images uncompressed, which some legacy Windows applications, embedded systems, and printing workflows still require',
    esWhy: 'BMP guarda las imágenes sin comprimir, algo que aún exigen algunas aplicaciones antiguas de Windows, sistemas embebidos y flujos de impresión',
  },
  {
    key: 'svg', fmt: 'SVG',
    enWhy: 'SVG wraps your image in a scalable vector container that integrates cleanly into web pages and design tools that expect SVG assets',
    esWhy: 'SVG envuelve tu imagen en un contenedor vectorial escalable que se integra limpiamente en páginas web y herramientas de diseño que esperan recursos SVG',
  },
  {
    key: 'pdf', fmt: 'PDF',
    enWhy: 'PDF packages images into a universally viewable, printable document — convenient for sharing scans, receipts, and multi-image reports',
    esWhy: 'PDF empaqueta imágenes en un documento visible e imprimible en cualquier lugar: cómodo para compartir escaneos, recibos e informes con varias imágenes',
  },
];

function formatBlockEn(s: FormatSpec): ToolContentBlock {
  return {
    aboutTitle: `About the ${s.fmt} converter`,
    about: [
      `This tool converts your images to ${s.fmt} directly in the browser. ${s.enWhy}.`,
      'You can convert several images at once, and because the conversion runs locally on your device, your photos are never uploaded to a server.',
    ],
    howTitle: 'How to use it',
    steps: [
      'Upload or drag one or more images into the tool.',
      'The conversion starts automatically.',
      `Preview the converted ${s.fmt} output.`,
      'Download the converted files.',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'What formats can I convert from?', a: 'Common formats such as PNG, JPEG, WebP, and BMP are accepted as input.' },
      { q: 'Will I lose quality?', a: 'Converting to a lossless format preserves every pixel; converting to a lossy format (like JPEG) applies efficient compression you can preview before downloading.' },
      { q: 'Can I convert multiple images at once?', a: 'Yes, drop in several files and download each converted result.' },
      { q: 'Are my images private?', a: 'Yes. All conversion happens locally in your browser; nothing is transmitted.' },
    ],
  };
}

function formatBlockEs(s: FormatSpec): ToolContentBlock {
  return {
    aboutTitle: `Sobre el conversor a ${s.fmt}`,
    about: [
      `Esta herramienta convierte tus imágenes a ${s.fmt} directamente en el navegador. ${s.esWhy}.`,
      'Puedes convertir varias imágenes a la vez y, como la conversión se ejecuta localmente en tu dispositivo, tus fotos nunca se suben a un servidor.',
    ],
    howTitle: 'Cómo se usa',
    steps: [
      'Sube o arrastra una o más imágenes a la herramienta.',
      'La conversión empieza automáticamente.',
      `Previsualiza la salida convertida a ${s.fmt}.`,
      'Descarga los archivos convertidos.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Desde qué formatos puedo convertir?', a: 'Se aceptan formatos comunes como PNG, JPEG, WebP y BMP como entrada.' },
      { q: '¿Perderé calidad?', a: 'Convertir a un formato sin pérdida conserva cada píxel; convertir a un formato con pérdida (como JPEG) aplica una compresión eficiente que puedes previsualizar antes de descargar.' },
      { q: '¿Puedo convertir varias imágenes a la vez?', a: 'Sí, suelta varios archivos y descarga cada resultado convertido.' },
      { q: '¿Mis imágenes son privadas?', a: 'Sí. Toda la conversión ocurre localmente en tu navegador; nada se transmite.' },
    ],
  };
}

export const SUB_CONTENT: Record<Language, Record<string, ToolContentBlock>> = {
  en: Object.fromEntries(FORMAT_SPECS.map((s) => [s.key, formatBlockEn(s)])),
  es: Object.fromEntries(FORMAT_SPECS.map((s) => [s.key, formatBlockEs(s)])),
};
