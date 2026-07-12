import type { Language, ToolContentBlock } from '@pockly/shared';

type ToolKey =
  | 'wordCount'
  | 'textCase'
  | 'diffChecker'
  | 'passwordGenerator'
  | 'quickNotes';

export const TOOL_CONTENT: Record<Language, Record<ToolKey, ToolContentBlock>> = {
  en: {
    wordCount: {
      aboutTitle: 'About the Word Counter',
      about: [
        'The Word Counter gives you an instant count of words and characters as you type or paste text. It is useful for essays and assignments with word limits, social media posts with character limits, meta descriptions and titles for SEO, and any writing task where length matters.',
        'Everything runs locally in your browser: the text you paste is never uploaded to a server, so it is safe to check confidential documents, contracts, or unpublished drafts. There is no length limit and the count updates in real time.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Type or paste your text into the input box above.',
        'The word and character counts update instantly as you edit.',
        'Keep editing until you hit your target length.',
        'Press Clear to start over with a new text.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How are words counted?',
          a: 'Words are sequences of characters separated by spaces or line breaks. Hyphenated words like "well-known" count as one word, which matches how most word processors count.',
        },
        {
          q: 'Do spaces count as characters?',
          a: 'Yes, the character count includes every character in the text, including spaces and line breaks — the same way Twitter/X and most platforms measure length.',
        },
        {
          q: 'Is my text stored anywhere?',
          a: 'No. The counting happens entirely in your browser. Your text never leaves your device and disappears when you close or reload the page.',
        },
        {
          q: 'Is there a maximum text length?',
          a: 'No hard limit. The counter handles everything from a tweet to a full book manuscript without slowing down.',
        },
      ],
    },
    textCase: {
      aboutTitle: 'About the Text Case Converter',
      about: [
        'The Text Case Converter transforms any text between UPPERCASE, lowercase, Title Case, Sentence case, and other formats in one click. It saves you from retyping when a document arrives in the wrong case, when a form demands a specific format, or when you need consistent headings across a document or website.',
        'It is a favorite of writers fixing capitalization, developers normalizing strings, and marketers preparing headlines. Like every Pockly tool, the conversion happens locally in your browser — your text is never sent anywhere.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste or type your text into the input box.',
        'Click the case you want: UPPERCASE, lowercase, Title Case, Sentence case, and more.',
        'The converted text appears immediately.',
        'Copy the result and paste it wherever you need it.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What is Title Case?',
          a: 'Title Case capitalizes the first letter of each word — the style commonly used for headlines and book titles, e.g. "The Quick Brown Fox".',
        },
        {
          q: 'What is Sentence case?',
          a: 'Sentence case capitalizes only the first letter of each sentence, leaving the rest lowercase — the style of normal prose.',
        },
        {
          q: 'Does it work with accents and other alphabets?',
          a: 'Yes. The converter uses Unicode-aware transformations, so accented characters (á, ñ, ü) and non-Latin alphabets are handled correctly.',
        },
        {
          q: 'Is my text uploaded to a server?',
          a: 'No. All conversions run in your browser. Nothing you paste here is transmitted or stored.',
        },
      ],
    },
    diffChecker: {
      aboutTitle: 'About the Diff Checker',
      about: [
        'The Diff Checker compares two blocks of text side by side and highlights exactly what changed: added lines, removed lines, and modifications. It is the fastest way to review edits between two versions of a document, spot changes in a contract, compare configuration files, or verify what a colleague modified in shared text.',
        'Unlike online diff services that upload your files, this comparison runs entirely in your browser, which makes it safe for sensitive material like legal documents and source code.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste the original text into the left box.',
        'Paste the modified text into the right box.',
        'The differences are highlighted automatically: additions, deletions, and changed lines.',
        'Review the highlighted output to see exactly what changed between the two versions.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What kind of differences does it detect?',
          a: 'It performs a line-by-line comparison and highlights added, removed, and modified lines, so structural changes are easy to scan.',
        },
        {
          q: 'Can I compare code with it?',
          a: 'Yes. It works with any plain text, including source code, JSON, XML, configuration files, and CSV data.',
        },
        {
          q: 'Are my documents uploaded?',
          a: 'No. Both texts are compared locally in your browser and are never transmitted to a server.',
        },
        {
          q: 'Is there a size limit?',
          a: 'No fixed limit. Very large files (tens of thousands of lines) may take a moment, but typical documents compare instantly.',
        },
      ],
    },
    passwordGenerator: {
      aboutTitle: 'About the Password Generator',
      about: [
        'The Password Generator creates strong, random passwords with the length and character sets you choose: uppercase and lowercase letters, numbers, and symbols. Strong unique passwords are the single most effective defense against account takeover — reused or guessable passwords remain the top cause of compromised accounts.',
        'Passwords are generated locally in your browser using the cryptographically secure random number generator built into your device. Nothing is transmitted, logged, or stored — no one, including us, ever sees a password you generate.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Choose the password length — 16 characters or more is recommended.',
        'Select which character types to include: letters, numbers, symbols.',
        'Click generate to create a password.',
        'Copy it into your password manager, then generate a fresh one for each account.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How long should a password be?',
          a: 'At least 12 characters; 16 or more is better. Length matters more than complexity — each extra character multiplies the effort needed to crack it.',
        },
        {
          q: 'Are the generated passwords really random?',
          a: 'Yes. They use your browser’s built-in cryptographic random generator (the same one used for encryption), not a predictable pseudo-random formula.',
        },
        {
          q: 'Can anyone see the passwords I generate?',
          a: 'No. Generation happens entirely on your device. The password never travels over the network and is gone when you leave the page.',
        },
        {
          q: 'Should I use the same password on multiple sites?',
          a: 'Never. If one site is breached, every account sharing that password is exposed. Generate a unique password per account and keep them in a password manager.',
        },
      ],
    },
    quickNotes: {
      aboutTitle: 'About Quick Notes',
      about: [
        'Quick Notes is a distraction-free notepad in your browser with automatic saving. Jot down ideas, to-dos, snippets, or meeting notes without opening a separate app — your notes are saved as you type and are still there when you come back.',
        'By default notes are stored privately in your browser’s local storage, so they never leave your device. If you sign in with an optional account, notes sync securely so you can access them from any device.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Start typing — your note is saved automatically as you write.',
        'Create additional notes to keep topics separate.',
        'Return anytime; your notes are right where you left them.',
        'Optionally sign in to sync notes across your devices.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Where are my notes stored?',
          a: 'Without an account, in your browser’s local storage on your device only. With an optional account, they are also stored encrypted-in-transit in a secure database so they can sync.',
        },
        {
          q: 'Will I lose notes if I close the tab?',
          a: 'No. Notes save automatically as you type and persist across sessions. Clearing your browser’s site data, however, deletes locally stored notes.',
        },
        {
          q: 'Do I need an account?',
          a: 'No. Notes work fully without signing up. An account is only needed if you want the same notes on multiple devices.',
        },
        {
          q: 'Can I use it offline?',
          a: 'Once the page is loaded, typing and local saving work without a connection; syncing to an account requires being online.',
        },
      ],
    },
  },
  es: {
    wordCount: {
      aboutTitle: 'Sobre el contador de palabras',
      about: [
        'El contador de palabras muestra al instante cuántas palabras y caracteres tiene tu texto mientras escribes o pegas contenido. Es útil para ensayos y trabajos con límite de palabras, publicaciones en redes sociales con límite de caracteres, meta descripciones y títulos para SEO, y cualquier texto donde la longitud importa.',
        'Todo funciona localmente en tu navegador: el texto que pegas nunca se sube a un servidor, así que puedes revisar documentos confidenciales, contratos o borradores sin publicar con total seguridad. No hay límite de longitud y el conteo se actualiza en tiempo real.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Escribe o pega tu texto en el cuadro de arriba.',
        'El conteo de palabras y caracteres se actualiza al instante mientras editas.',
        'Sigue editando hasta alcanzar la longitud que necesitas.',
        'Pulsa Limpiar para empezar con un texto nuevo.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cómo se cuentan las palabras?',
          a: 'Las palabras son secuencias de caracteres separadas por espacios o saltos de línea. Las palabras con guion como "bienintencionado" cuentan como una sola, igual que en la mayoría de procesadores de texto.',
        },
        {
          q: '¿Los espacios cuentan como caracteres?',
          a: 'Sí, el conteo de caracteres incluye todos los caracteres del texto, incluidos espacios y saltos de línea, igual que miden la longitud Twitter/X y la mayoría de plataformas.',
        },
        {
          q: '¿Mi texto se guarda en algún lado?',
          a: 'No. El conteo ocurre por completo en tu navegador. Tu texto nunca sale de tu dispositivo y desaparece al cerrar o recargar la página.',
        },
        {
          q: '¿Hay un límite de longitud?',
          a: 'No hay límite fijo. El contador maneja desde un tuit hasta el manuscrito de un libro sin ralentizarse.',
        },
      ],
    },
    textCase: {
      aboutTitle: 'Sobre el conversor de mayúsculas y minúsculas',
      about: [
        'El conversor de texto transforma cualquier texto entre MAYÚSCULAS, minúsculas, Formato Título, Formato oración y otros formatos con un clic. Te ahorra reescribir cuando un documento llega en el formato equivocado, cuando un formulario exige un formato concreto o cuando necesitas títulos consistentes en un documento o sitio web.',
        'Lo usan escritores que corrigen mayúsculas, desarrolladores que normalizan cadenas y marketers que preparan titulares. Como todas las herramientas de Pockly, la conversión ocurre localmente en tu navegador: tu texto no se envía a ningún lado.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega o escribe tu texto en el cuadro de entrada.',
        'Elige el formato que quieres: MAYÚSCULAS, minúsculas, Formato Título, Formato oración y más.',
        'El texto convertido aparece de inmediato.',
        'Copia el resultado y pégalo donde lo necesites.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué es el Formato Título?',
          a: 'El Formato Título pone en mayúscula la primera letra de cada palabra, el estilo habitual de titulares y títulos de libros, p. ej. "El Rápido Zorro Marrón".',
        },
        {
          q: '¿Qué es el Formato oración?',
          a: 'El Formato oración solo pone en mayúscula la primera letra de cada oración y deja el resto en minúscula: el estilo de la prosa normal.',
        },
        {
          q: '¿Funciona con tildes y otros alfabetos?',
          a: 'Sí. El conversor usa transformaciones compatibles con Unicode, así que los caracteres acentuados (á, ñ, ü) y los alfabetos no latinos se manejan correctamente.',
        },
        {
          q: '¿Mi texto se sube a un servidor?',
          a: 'No. Todas las conversiones se ejecutan en tu navegador. Nada de lo que pegas aquí se transmite ni se guarda.',
        },
      ],
    },
    diffChecker: {
      aboutTitle: 'Sobre el comparador de textos',
      about: [
        'El comparador de textos analiza dos bloques de texto lado a lado y resalta exactamente qué cambió: líneas añadidas, eliminadas y modificadas. Es la forma más rápida de revisar cambios entre dos versiones de un documento, detectar modificaciones en un contrato, comparar archivos de configuración o verificar qué editó un colega en un texto compartido.',
        'A diferencia de otros servicios de comparación que suben tus archivos, esta comparación se ejecuta por completo en tu navegador, lo que la hace segura para material sensible como documentos legales y código fuente.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega el texto original en el cuadro izquierdo.',
        'Pega el texto modificado en el cuadro derecho.',
        'Las diferencias se resaltan automáticamente: adiciones, eliminaciones y líneas cambiadas.',
        'Revisa el resultado resaltado para ver exactamente qué cambió entre las dos versiones.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué tipo de diferencias detecta?',
          a: 'Hace una comparación línea por línea y resalta líneas añadidas, eliminadas y modificadas, de modo que los cambios estructurales se escanean con facilidad.',
        },
        {
          q: '¿Puedo comparar código?',
          a: 'Sí. Funciona con cualquier texto plano, incluido código fuente, JSON, XML, archivos de configuración y datos CSV.',
        },
        {
          q: '¿Mis documentos se suben a algún lado?',
          a: 'No. Ambos textos se comparan localmente en tu navegador y nunca se transmiten a un servidor.',
        },
        {
          q: '¿Hay límite de tamaño?',
          a: 'No hay límite fijo. Archivos muy grandes (decenas de miles de líneas) pueden tardar un momento, pero los documentos típicos se comparan al instante.',
        },
      ],
    },
    passwordGenerator: {
      aboutTitle: 'Sobre el generador de contraseñas',
      about: [
        'El generador de contraseñas crea contraseñas fuertes y aleatorias con la longitud y los tipos de caracteres que elijas: mayúsculas, minúsculas, números y símbolos. Una contraseña única y fuerte es la defensa más eficaz contra el robo de cuentas: las contraseñas reutilizadas o adivinables siguen siendo la principal causa de cuentas comprometidas.',
        'Las contraseñas se generan localmente en tu navegador con el generador de números aleatorios criptográficamente seguro de tu dispositivo. Nada se transmite, registra ni almacena: nadie, ni siquiera nosotros, ve las contraseñas que generas.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Elige la longitud de la contraseña: se recomiendan 16 caracteres o más.',
        'Selecciona qué tipos de caracteres incluir: letras, números, símbolos.',
        'Haz clic en generar para crear una contraseña.',
        'Cópiala a tu gestor de contraseñas y genera una nueva para cada cuenta.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué longitud debe tener una contraseña?',
          a: 'Al menos 12 caracteres; 16 o más es mejor. La longitud importa más que la complejidad: cada carácter extra multiplica el esfuerzo necesario para descifrarla.',
        },
        {
          q: '¿Las contraseñas generadas son realmente aleatorias?',
          a: 'Sí. Usan el generador criptográfico integrado en tu navegador (el mismo que se usa para cifrado), no una fórmula pseudoaleatoria predecible.',
        },
        {
          q: '¿Alguien puede ver las contraseñas que genero?',
          a: 'No. La generación ocurre por completo en tu dispositivo. La contraseña nunca viaja por la red y desaparece al salir de la página.',
        },
        {
          q: '¿Debo usar la misma contraseña en varios sitios?',
          a: 'Nunca. Si un sitio sufre una filtración, todas las cuentas que comparten esa contraseña quedan expuestas. Genera una contraseña única por cuenta y guárdalas en un gestor de contraseñas.',
        },
      ],
    },
    quickNotes: {
      aboutTitle: 'Sobre las notas rápidas',
      about: [
        'Notas rápidas es un bloc de notas sin distracciones en tu navegador con guardado automático. Anota ideas, pendientes, fragmentos o apuntes de reuniones sin abrir otra aplicación: tus notas se guardan mientras escribes y siguen ahí cuando vuelves.',
        'Por defecto las notas se guardan de forma privada en el almacenamiento local de tu navegador, así que nunca salen de tu dispositivo. Si inicias sesión con una cuenta opcional, las notas se sincronizan de forma segura para acceder desde cualquier dispositivo.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Empieza a escribir: tu nota se guarda automáticamente.',
        'Crea notas adicionales para separar temas.',
        'Vuelve cuando quieras; tus notas están donde las dejaste.',
        'Opcionalmente inicia sesión para sincronizarlas entre dispositivos.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Dónde se guardan mis notas?',
          a: 'Sin cuenta, solo en el almacenamiento local de tu navegador. Con una cuenta opcional, también en una base de datos segura para poder sincronizarlas.',
        },
        {
          q: '¿Pierdo las notas si cierro la pestaña?',
          a: 'No. Las notas se guardan automáticamente mientras escribes y persisten entre sesiones. Eso sí, borrar los datos de sitio del navegador elimina las notas locales.',
        },
        {
          q: '¿Necesito una cuenta?',
          a: 'No. Las notas funcionan sin registro. La cuenta solo hace falta si quieres las mismas notas en varios dispositivos.',
        },
        {
          q: '¿Puedo usarlas sin conexión?',
          a: 'Con la página ya cargada, escribir y guardar localmente funciona sin conexión; sincronizar con la cuenta requiere estar en línea.',
        },
      ],
    },
  },
};
