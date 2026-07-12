import type { Language, ToolContentBlock } from '@pockly/shared';

type ToolKey = 'qr' | 'cleaner' | 'decoder' | 'encoder' | 'utm';

export const TOOL_CONTENT: Record<Language, Record<ToolKey, ToolContentBlock>> = {
  en: {
    qr: {
      aboutTitle: 'About the QR Code Generator',
      about: [
        'The QR Code Generator turns any text or URL into a scannable QR code in seconds. QR codes bridge the physical and digital worlds: put one on a menu, poster, business card, product package, or slide, and anyone with a phone camera reaches your link instantly — no typing required.',
        'Codes are generated locally in your browser and can be downloaded as image files ready for print or screen. There is no expiration, no tracking, and no account needed: the QR code encodes your content directly and will work forever.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Type or paste the URL or text you want to encode.',
        'The QR code is generated instantly as you type.',
        'Test it by scanning with your phone camera.',
        'Download the image and place it wherever you need it.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Do the QR codes expire?',
          a: 'No. The code encodes your content directly (static QR), so it works forever without depending on any redirect service.',
        },
        {
          q: 'What can I encode besides URLs?',
          a: 'Any text: Wi-Fi details, contact information, plain messages, coordinates. If it fits in text, it fits in a QR code.',
        },
        {
          q: 'What size should I print a QR code?',
          a: 'A rule of thumb: at least 2×2 cm for close scanning, and scanning distance ÷ 10 as the minimum width for posters.',
        },
        {
          q: 'Is my link tracked?',
          a: 'No. Generation happens in your browser and the code points straight to your content — no intermediary, no analytics, no expiry.',
        },
      ],
    },
    cleaner: {
      aboutTitle: 'About the URL Cleaner',
      about: [
        'The URL Cleaner strips tracking parameters — utm_source, fbclid, gclid, and dozens of similar tags — from links, leaving a short, clean URL. Links copied from social networks, newsletters, and search results carry these trackers, which bloat the URL and expose how you arrived at a page.',
        'Cleaning links before sharing them protects privacy, makes URLs readable, and avoids skewing the analytics of the destination site with inherited campaign tags. The cleaning happens locally: the links you paste are never sent anywhere.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste the long URL into the input box.',
        'The tool removes known tracking parameters automatically.',
        'Compare the original and cleaned URLs.',
        'Copy the clean link and share it.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What parameters are removed?',
          a: 'Common tracking tags such as utm_* (campaign tracking), fbclid (Facebook), gclid (Google Ads), and other known tracker parameters.',
        },
        {
          q: 'Will the cleaned link still work?',
          a: 'Yes. Tracking parameters do not affect which page loads; removing them leaves the destination unchanged.',
        },
        {
          q: 'Why share clean links?',
          a: 'They are shorter, look trustworthy, protect your privacy, and avoid polluting the destination site’s analytics with someone else’s campaign tags.',
        },
        {
          q: 'Are my links logged?',
          a: 'No. Cleaning happens entirely in your browser; the URLs you paste never leave your device.',
        },
      ],
    },
    decoder: {
      aboutTitle: 'About the URL Decoder',
      about: [
        'The URL Decoder converts percent-encoded URLs back into readable text: %20 becomes a space, %C3%A1 becomes á, and so on. Encoded URLs appear whenever links carry special characters, non-Latin text, or nested URLs — in analytics reports, server logs, redirect chains, and API responses.',
        'Decoding reveals what a link actually contains, which is essential for debugging redirects, reading query parameters, and inspecting suspicious links safely before clicking them.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste the encoded URL or text into the input box.',
        'The decoded, human-readable version appears instantly.',
        'Decode repeatedly if the value was encoded multiple times.',
        'Copy the readable result.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What is percent encoding?',
          a: 'A rule that represents special characters as % followed by their byte value in hexadecimal, so URLs can carry any character using only URL-safe ones.',
        },
        {
          q: 'Why do some URLs need decoding twice?',
          a: 'A URL passed as a parameter inside another URL gets encoded again. Each decode pass unwraps one layer.',
        },
        {
          q: 'Can decoding help spot malicious links?',
          a: 'Yes. Attackers hide destinations behind heavy encoding; decoding shows the real target before you click.',
        },
        {
          q: 'Is anything sent to a server?',
          a: 'No. Decoding runs locally in your browser.',
        },
      ],
    },
    encoder: {
      aboutTitle: 'About the URL Encoder',
      about: [
        'The URL Encoder converts text into percent-encoded form so it can travel safely inside a URL: spaces become %20, á becomes %C3%A1, & becomes %26. Without encoding, special characters break query strings, truncate parameters, or change the meaning of a link.',
        'It is essential when building query parameters by hand, passing a URL as a parameter inside another URL, or embedding user text into links for APIs, redirects, and mailto/share links.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Type or paste the text or URL fragment to encode.',
        'The encoded version appears instantly.',
        'Copy the result into your query string, API call, or link.',
        'Use the decoder tool to verify it round-trips correctly.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'When must I encode text for a URL?',
          a: 'Whenever a value contains spaces, accents, or reserved characters like &, ?, =, # — typically user input or URLs nested inside other URLs.',
        },
        {
          q: 'Should I encode a whole URL?',
          a: 'Usually you encode parameter values, not the entire URL — encoding the whole thing would break the :// and ? separators. Encode each value, then assemble.',
        },
        {
          q: 'What is the difference between %20 and + for spaces?',
          a: 'Both represent a space: %20 works everywhere in a URL, while + is only interpreted as a space in query strings.',
        },
        {
          q: 'Is my text uploaded?',
          a: 'No. Encoding happens in your browser; nothing is transmitted.',
        },
      ],
    },
    utm: {
      aboutTitle: 'About the UTM Builder',
      about: [
        'The UTM Builder constructs campaign tracking URLs by appending standard utm_source, utm_medium, utm_campaign, utm_term, and utm_content parameters to your link. With consistent UTM tags, analytics tools can tell you exactly which newsletter, ad, or social post drove each visit and conversion.',
        'Building UTMs by hand invites typos and inconsistent naming that fragment your reports. The builder assembles the URL correctly every time, with proper encoding of every value.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste the destination URL of your campaign.',
        'Fill in source (e.g. newsletter), medium (e.g. email), and campaign name.',
        'Optionally add term and content for ad-level detail.',
        'Copy the generated URL and use it in your campaign.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What do source, medium, and campaign mean?',
          a: 'Source is where the traffic comes from (google, newsletter), medium is the channel type (cpc, email, social), and campaign names the specific push (spring_sale).',
        },
        {
          q: 'Why keep UTM naming consistent?',
          a: 'Analytics tools treat "Email", "email", and "e-mail" as three different mediums. Consistent lowercase naming keeps reports aggregated and readable.',
        },
        {
          q: 'Do UTM parameters change the destination page?',
          a: 'No. They are ignored by the server for routing and only read by analytics scripts.',
        },
        {
          q: 'Are my campaign URLs stored?',
          a: 'No. The URL is assembled locally in your browser and never sent anywhere.',
        },
      ],
    },
  },
  es: {
    qr: {
      aboutTitle: 'Sobre el generador de códigos QR',
      about: [
        'El generador de códigos QR convierte cualquier texto o URL en un código escaneable en segundos. Los códigos QR conectan el mundo físico con el digital: pon uno en un menú, cartel, tarjeta de presentación, empaque o diapositiva, y cualquiera con la cámara del teléfono llega a tu enlace al instante, sin escribir nada.',
        'Los códigos se generan localmente en tu navegador y se descargan como imágenes listas para impresión o pantalla. No caducan, no rastrean y no requieren cuenta: el código QR codifica tu contenido directamente y funcionará para siempre.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Escribe o pega la URL o el texto que quieres codificar.',
        'El código QR se genera al instante mientras escribes.',
        'Pruébalo escaneándolo con la cámara de tu teléfono.',
        'Descarga la imagen y colócala donde la necesites.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Los códigos QR caducan?',
          a: 'No. El código codifica tu contenido directamente (QR estático), así que funciona para siempre sin depender de ningún servicio de redirección.',
        },
        {
          q: '¿Qué puedo codificar además de URLs?',
          a: 'Cualquier texto: datos de Wi-Fi, información de contacto, mensajes, coordenadas. Si cabe en texto, cabe en un QR.',
        },
        {
          q: '¿De qué tamaño debo imprimir un código QR?',
          a: 'Regla práctica: mínimo 2×2 cm para escaneo cercano, y distancia de escaneo ÷ 10 como ancho mínimo en carteles.',
        },
        {
          q: '¿Mi enlace se rastrea?',
          a: 'No. La generación ocurre en tu navegador y el código apunta directo a tu contenido: sin intermediarios, sin analítica, sin caducidad.',
        },
      ],
    },
    cleaner: {
      aboutTitle: 'Sobre el limpiador de URLs',
      about: [
        'El limpiador de URLs elimina los parámetros de seguimiento —utm_source, fbclid, gclid y decenas de etiquetas similares— de los enlaces, dejando una URL corta y limpia. Los enlaces copiados de redes sociales, boletines y resultados de búsqueda arrastran estos rastreadores, que inflan la URL y revelan cómo llegaste a una página.',
        'Limpiar los enlaces antes de compartirlos protege la privacidad, hace las URLs legibles y evita distorsionar la analítica del sitio de destino con etiquetas de campaña heredadas. La limpieza ocurre localmente: los enlaces que pegas no se envían a ningún lado.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega la URL larga en el cuadro de entrada.',
        'La herramienta elimina automáticamente los parámetros de seguimiento conocidos.',
        'Compara la URL original con la limpia.',
        'Copia el enlace limpio y compártelo.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué parámetros se eliminan?',
          a: 'Etiquetas de seguimiento comunes como utm_* (campañas), fbclid (Facebook), gclid (Google Ads) y otros parámetros rastreadores conocidos.',
        },
        {
          q: '¿El enlace limpio seguirá funcionando?',
          a: 'Sí. Los parámetros de seguimiento no afectan qué página se carga; eliminarlos no cambia el destino.',
        },
        {
          q: '¿Por qué compartir enlaces limpios?',
          a: 'Son más cortos, se ven confiables, protegen tu privacidad y evitan contaminar la analítica del sitio de destino con etiquetas de campaña ajenas.',
        },
        {
          q: '¿Mis enlaces quedan registrados?',
          a: 'No. La limpieza ocurre por completo en tu navegador; las URLs que pegas nunca salen de tu dispositivo.',
        },
      ],
    },
    decoder: {
      aboutTitle: 'Sobre el decodificador de URLs',
      about: [
        'El decodificador de URLs convierte URLs con codificación porcentual de vuelta a texto legible: %20 se convierte en espacio, %C3%A1 en á, etc. Las URLs codificadas aparecen cuando los enlaces llevan caracteres especiales, texto no latino o URLs anidadas: en reportes de analítica, logs de servidores, cadenas de redirección y respuestas de API.',
        'Decodificar revela lo que un enlace contiene realmente, esencial para depurar redirecciones, leer parámetros de consulta e inspeccionar enlaces sospechosos con seguridad antes de hacer clic.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega la URL o el texto codificado en el cuadro de entrada.',
        'La versión decodificada y legible aparece al instante.',
        'Decodifica varias veces si el valor fue codificado en capas.',
        'Copia el resultado legible.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué es la codificación porcentual?',
          a: 'Una regla que representa caracteres especiales como % seguido de su valor en hexadecimal, para que las URLs puedan llevar cualquier carácter usando solo caracteres seguros.',
        },
        {
          q: '¿Por qué algunas URLs se decodifican dos veces?',
          a: 'Una URL pasada como parámetro dentro de otra URL se codifica de nuevo. Cada pasada de decodificación quita una capa.',
        },
        {
          q: '¿Decodificar ayuda a detectar enlaces maliciosos?',
          a: 'Sí. Los atacantes ocultan destinos tras codificación pesada; decodificar muestra el objetivo real antes de hacer clic.',
        },
        {
          q: '¿Algo se envía a un servidor?',
          a: 'No. La decodificación se ejecuta localmente en tu navegador.',
        },
      ],
    },
    encoder: {
      aboutTitle: 'Sobre el codificador de URLs',
      about: [
        'El codificador de URLs convierte texto a forma porcentual para que viaje seguro dentro de una URL: los espacios se vuelven %20, á se vuelve %C3%A1, & se vuelve %26. Sin codificar, los caracteres especiales rompen las cadenas de consulta, truncan parámetros o cambian el significado de un enlace.',
        'Es esencial al construir parámetros de consulta a mano, pasar una URL como parámetro dentro de otra URL o incrustar texto de usuarios en enlaces para APIs, redirecciones y enlaces mailto o de compartir.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Escribe o pega el texto o fragmento de URL a codificar.',
        'La versión codificada aparece al instante.',
        'Copia el resultado a tu cadena de consulta, llamada de API o enlace.',
        'Usa el decodificador para verificar que el viaje de ida y vuelta es correcto.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cuándo debo codificar texto para una URL?',
          a: 'Siempre que un valor contenga espacios, tildes o caracteres reservados como &, ?, =, #: típicamente entrada de usuarios o URLs anidadas en otras URLs.',
        },
        {
          q: '¿Debo codificar la URL completa?',
          a: 'Normalmente se codifican los valores de los parámetros, no la URL entera: codificarla toda rompería los separadores :// y ?. Codifica cada valor y luego ensambla.',
        },
        {
          q: '¿Cuál es la diferencia entre %20 y + para los espacios?',
          a: 'Ambos representan un espacio: %20 funciona en toda la URL, mientras que + solo se interpreta como espacio en cadenas de consulta.',
        },
        {
          q: '¿Mi texto se sube a algún lado?',
          a: 'No. La codificación ocurre en tu navegador; nada se transmite.',
        },
      ],
    },
    utm: {
      aboutTitle: 'Sobre el constructor de UTM',
      about: [
        'El constructor de UTM crea URLs de seguimiento de campañas añadiendo a tu enlace los parámetros estándar utm_source, utm_medium, utm_campaign, utm_term y utm_content. Con etiquetas UTM consistentes, las herramientas de analítica te dicen exactamente qué boletín, anuncio o publicación generó cada visita y conversión.',
        'Construir UTMs a mano invita a errores de tipeo y nombres inconsistentes que fragmentan tus reportes. El constructor ensambla la URL correctamente cada vez, con la codificación adecuada de cada valor.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega la URL de destino de tu campaña.',
        'Completa source (p. ej. newsletter), medium (p. ej. email) y el nombre de la campaña.',
        'Opcionalmente agrega term y content para detalle a nivel de anuncio.',
        'Copia la URL generada y úsala en tu campaña.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué significan source, medium y campaign?',
          a: 'Source es de dónde viene el tráfico (google, newsletter), medium es el tipo de canal (cpc, email, social) y campaign nombra la acción concreta (rebajas_primavera).',
        },
        {
          q: '¿Por qué mantener nombres UTM consistentes?',
          a: 'Las herramientas de analítica tratan "Email", "email" y "e-mail" como tres medios distintos. Nombres consistentes en minúsculas mantienen los reportes agregados y legibles.',
        },
        {
          q: '¿Los parámetros UTM cambian la página de destino?',
          a: 'No. El servidor los ignora para el enrutamiento; solo los leen los scripts de analítica.',
        },
        {
          q: '¿Mis URLs de campaña se guardan?',
          a: 'No. La URL se ensambla localmente en tu navegador y nunca se envía a ningún lado.',
        },
      ],
    },
  },
};
