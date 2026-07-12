import type { Language, ToolContentBlock } from '@pockly/shared';

type ToolKey = 'generator' | 'templates' | 'convert' | 'utils';

export const TOOL_CONTENT: Record<Language, Record<ToolKey, ToolContentBlock>> = {
  en: {
    generator: {
      aboutTitle: 'About the JSON Generator',
      about: [
        'The JSON Generator lets you build JSON objects visually, field by field, without worrying about brackets, commas, or quoting rules. Choose a type for each field — text, number, boolean, date, UUID, email, or URL — and the tool produces valid, properly formatted JSON you can copy straight into your code, API tests, or documentation.',
        'It is ideal for creating mock data, drafting request bodies for API calls, and teaching JSON structure without the frustration of syntax errors. Everything is generated locally in your browser.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Add a field and give it a name.',
        'Pick the field type: text, number, boolean, date, UUID, email, or URL.',
        'Nest objects and arrays as needed to match your target structure.',
        'Copy the generated JSON from the output panel.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Is the output always valid JSON?',
          a: 'Yes. Because the JSON is built from structured fields rather than typed by hand, quoting, commas, and nesting are always correct.',
        },
        {
          q: 'Can I create nested objects and arrays?',
          a: 'Yes. Fields can contain objects and arrays, letting you model complex structures like API responses with nested records.',
        },
        {
          q: 'What are the generated UUIDs and dates useful for?',
          a: 'They give you realistic placeholder values for testing databases, APIs, and UI components without writing generators yourself.',
        },
        {
          q: 'Is my data sent to a server?',
          a: 'No. The JSON is generated entirely in your browser and never leaves your device.',
        },
      ],
    },
    templates: {
      aboutTitle: 'About JSON Templates',
      about: [
        'JSON Templates gives you ready-made, realistic JSON datasets for common entities — users, products, orders, API responses — that you can copy and adapt in seconds. Instead of inventing test data by hand, start from a sensible structure with realistic field names and values.',
        'Templates are especially useful for prototyping front-ends before the backend exists, populating mock servers, seeding databases in development, and writing API documentation examples.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Browse the template categories: users, products, orders, API responses, and more.',
        'Select a template to preview its structure.',
        'Adjust field values if needed.',
        'Copy the JSON and paste it into your project, mock server, or test suite.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'Can I modify a template before copying?',
          a: 'Yes. Templates are starting points — edit values and structure freely before copying the result.',
        },
        {
          q: 'Are the templates valid JSON?',
          a: 'Yes, every template is syntactically valid and follows common naming conventions used in real-world APIs.',
        },
        {
          q: 'What are templates useful for?',
          a: 'Mocking API responses, seeding development databases, testing UI components with realistic data, and documenting expected payload shapes.',
        },
        {
          q: 'Is any of this tracked or uploaded?',
          a: 'No. Template selection and editing happen locally in your browser.',
        },
      ],
    },
    convert: {
      aboutTitle: 'About the JSON Converter',
      about: [
        'The JSON Converter transforms data between JSON, CSV, TSV, XML, and YAML formats in both directions. Different tools speak different formats — spreadsheets want CSV, configuration files use YAML, legacy systems produce XML — and this converter bridges them without manual reformatting.',
        'Conversion runs entirely in your browser, so proprietary or sensitive datasets can be converted safely: nothing is uploaded to any server.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste your source data into the input panel.',
        'Choose the source and target formats (for example, JSON to CSV).',
        'Review the converted output in the result panel.',
        'Copy or download the result.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'How are nested JSON objects converted to CSV?',
          a: 'Nested structures are flattened using path-style column names (like address.city), since CSV is a flat, tabular format.',
        },
        {
          q: 'Does converting lose data?',
          a: 'JSON to YAML/XML round-trips preserve structure. JSON to CSV can lose nesting depth because CSV is tabular — check the output when converting deeply nested data.',
        },
        {
          q: 'Can I convert large files?',
          a: 'Yes, within your browser’s memory limits. Files of several megabytes convert in seconds since everything runs locally.',
        },
        {
          q: 'Is my data private?',
          a: 'Yes. The conversion happens on your device; your data is never transmitted.',
        },
      ],
    },
    utils: {
      aboutTitle: 'About JSON Utils',
      about: [
        'JSON Utils is a Swiss-army knife for working with JSON: format (pretty-print) minified payloads for readability, minify formatted JSON for compact transfer, sort keys alphabetically for stable diffs, validate syntax with precise error locations, flatten and unflatten nested structures, compare two documents, and query values by path.',
        'Developers use it daily to inspect API responses, debug malformed payloads, normalize documents before committing them, and extract values from deeply nested structures — all locally in the browser.',
      ],
      howTitle: 'How to use it',
      steps: [
        'Paste your JSON into the input panel.',
        'Pick an operation: format, minify, sort keys, validate, flatten, diff, or query.',
        'If validation fails, the error message points to the exact location of the problem.',
        'Copy the processed result from the output panel.',
      ],
      faqTitle: 'Frequently asked questions',
      faqs: [
        {
          q: 'What does "flatten" do?',
          a: 'It converts nested objects into a single level using path keys, e.g. {"a":{"b":1}} becomes {"a.b":1}. Unflatten reverses the operation.',
        },
        {
          q: 'Why sort keys?',
          a: 'Alphabetically sorted keys make two JSON documents comparable line by line, producing clean diffs in code review and version control.',
        },
        {
          q: 'How precise is validation?',
          a: 'The validator reports the line and position of the first syntax error, such as a trailing comma or unquoted key, so you can fix it immediately.',
        },
        {
          q: 'Is my JSON uploaded anywhere?',
          a: 'No. All operations execute in your browser; payloads never leave your device.',
        },
      ],
    },
  },
  es: {
    generator: {
      aboutTitle: 'Sobre el generador JSON',
      about: [
        'El generador JSON te permite construir objetos JSON de forma visual, campo por campo, sin preocuparte por llaves, comas ni reglas de comillas. Elige un tipo para cada campo —texto, número, booleano, fecha, UUID, email o URL— y la herramienta produce JSON válido y bien formateado que puedes copiar directo a tu código, pruebas de API o documentación.',
        'Es ideal para crear datos de prueba, redactar cuerpos de peticiones para llamadas a APIs y enseñar la estructura de JSON sin la frustración de los errores de sintaxis. Todo se genera localmente en tu navegador.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Agrega un campo y dale un nombre.',
        'Elige el tipo de campo: texto, número, booleano, fecha, UUID, email o URL.',
        'Anida objetos y arreglos según lo necesites para tu estructura.',
        'Copia el JSON generado desde el panel de salida.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿La salida siempre es JSON válido?',
          a: 'Sí. Como el JSON se construye a partir de campos estructurados y no se escribe a mano, las comillas, comas y anidación siempre son correctas.',
        },
        {
          q: '¿Puedo crear objetos y arreglos anidados?',
          a: 'Sí. Los campos pueden contener objetos y arreglos, lo que permite modelar estructuras complejas como respuestas de API con registros anidados.',
        },
        {
          q: '¿Para qué sirven los UUID y fechas generados?',
          a: 'Te dan valores de relleno realistas para probar bases de datos, APIs y componentes de interfaz sin escribir tus propios generadores.',
        },
        {
          q: '¿Mis datos se envían a un servidor?',
          a: 'No. El JSON se genera por completo en tu navegador y nunca sale de tu dispositivo.',
        },
      ],
    },
    templates: {
      aboutTitle: 'Sobre las plantillas JSON',
      about: [
        'Las plantillas JSON te dan conjuntos de datos JSON realistas y listos para usar de entidades comunes —usuarios, productos, pedidos, respuestas de API— que puedes copiar y adaptar en segundos. En lugar de inventar datos de prueba a mano, parte de una estructura sensata con nombres y valores realistas.',
        'Son especialmente útiles para prototipar interfaces antes de que exista el backend, poblar servidores mock, sembrar bases de datos en desarrollo y escribir ejemplos para documentación de APIs.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Explora las categorías de plantillas: usuarios, productos, pedidos, respuestas de API y más.',
        'Selecciona una plantilla para ver su estructura.',
        'Ajusta los valores si lo necesitas.',
        'Copia el JSON y pégalo en tu proyecto, servidor mock o suite de pruebas.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Puedo modificar una plantilla antes de copiarla?',
          a: 'Sí. Las plantillas son puntos de partida: edita valores y estructura libremente antes de copiar el resultado.',
        },
        {
          q: '¿Las plantillas son JSON válido?',
          a: 'Sí, todas las plantillas son sintácticamente válidas y siguen convenciones de nombres comunes en APIs reales.',
        },
        {
          q: '¿Para qué sirven las plantillas?',
          a: 'Para simular respuestas de API, sembrar bases de datos de desarrollo, probar componentes de interfaz con datos realistas y documentar la forma esperada de los payloads.',
        },
        {
          q: '¿Algo de esto se rastrea o se sube?',
          a: 'No. La selección y edición de plantillas ocurre localmente en tu navegador.',
        },
      ],
    },
    convert: {
      aboutTitle: 'Sobre el conversor JSON',
      about: [
        'El conversor JSON transforma datos entre los formatos JSON, CSV, TSV, XML y YAML en ambas direcciones. Cada herramienta habla un formato distinto —las hojas de cálculo quieren CSV, los archivos de configuración usan YAML, los sistemas antiguos producen XML— y este conversor los conecta sin reformatear a mano.',
        'La conversión se ejecuta por completo en tu navegador, así que puedes convertir datos propietarios o sensibles con seguridad: nada se sube a ningún servidor.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega tus datos de origen en el panel de entrada.',
        'Elige el formato de origen y el de destino (por ejemplo, JSON a CSV).',
        'Revisa la salida convertida en el panel de resultado.',
        'Copia o descarga el resultado.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Cómo se convierten objetos JSON anidados a CSV?',
          a: 'Las estructuras anidadas se aplanan usando nombres de columna tipo ruta (como address.city), ya que CSV es un formato plano y tabular.',
        },
        {
          q: '¿Se pierden datos al convertir?',
          a: 'Las conversiones JSON a YAML/XML conservan la estructura. JSON a CSV puede perder profundidad de anidación porque CSV es tabular: revisa la salida al convertir datos muy anidados.',
        },
        {
          q: '¿Puedo convertir archivos grandes?',
          a: 'Sí, dentro de los límites de memoria de tu navegador. Archivos de varios megabytes se convierten en segundos porque todo se ejecuta localmente.',
        },
        {
          q: '¿Mis datos son privados?',
          a: 'Sí. La conversión ocurre en tu dispositivo; tus datos nunca se transmiten.',
        },
      ],
    },
    utils: {
      aboutTitle: 'Sobre las utilidades JSON',
      about: [
        'Las utilidades JSON son una navaja suiza para trabajar con JSON: formatea (pretty-print) payloads minificados para leerlos, minifica JSON formateado para transferirlo compacto, ordena claves alfabéticamente para diffs estables, valida la sintaxis con ubicación precisa de errores, aplana y desaplana estructuras anidadas, compara dos documentos y consulta valores por ruta.',
        'Los desarrolladores las usan a diario para inspeccionar respuestas de API, depurar payloads malformados, normalizar documentos antes de confirmarlos y extraer valores de estructuras muy anidadas, todo localmente en el navegador.',
      ],
      howTitle: 'Cómo se usa',
      steps: [
        'Pega tu JSON en el panel de entrada.',
        'Elige una operación: formatear, minificar, ordenar claves, validar, aplanar, comparar o consultar.',
        'Si la validación falla, el mensaje de error señala la ubicación exacta del problema.',
        'Copia el resultado procesado desde el panel de salida.',
      ],
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: '¿Qué hace "aplanar"?',
          a: 'Convierte objetos anidados en un solo nivel usando claves de ruta, p. ej. {"a":{"b":1}} se convierte en {"a.b":1}. Desaplanar invierte la operación.',
        },
        {
          q: '¿Por qué ordenar las claves?',
          a: 'Con las claves ordenadas alfabéticamente, dos documentos JSON se pueden comparar línea a línea, produciendo diffs limpios en revisión de código y control de versiones.',
        },
        {
          q: '¿Qué tan precisa es la validación?',
          a: 'El validador reporta la línea y posición del primer error de sintaxis, como una coma sobrante o una clave sin comillas, para corregirlo de inmediato.',
        },
        {
          q: '¿Mi JSON se sube a algún lado?',
          a: 'No. Todas las operaciones se ejecutan en tu navegador; los payloads nunca salen de tu dispositivo.',
        },
      ],
    },
  },
};

// ---- Parametrized blocks for convert/* and utils/* sub-pages ----

interface ConvertSpec {
  key: string;
  from: string;
  to: string;
  enUse: string;
  esUse: string;
  enNote: string;
  esNote: string;
}

const CONVERT_SPECS: ConvertSpec[] = [
  {
    key: 'csv2json', from: 'CSV', to: 'JSON',
    enUse: 'turning spreadsheet exports, database dumps, and reports into structured data your code can consume',
    esUse: 'convertir exportaciones de hojas de cálculo, volcados de bases de datos y reportes en datos estructurados que tu código puede consumir',
    enNote: 'The first CSV row is treated as the header and becomes the JSON property names; each following row becomes one object in the resulting array.',
    esNote: 'La primera fila del CSV se trata como cabecera y se convierte en los nombres de propiedad del JSON; cada fila siguiente se convierte en un objeto del arreglo resultante.',
  },
  {
    key: 'tsv2json', from: 'TSV', to: 'JSON',
    enUse: 'importing tab-separated exports — common in analytics tools and database clients — into APIs and applications',
    esUse: 'importar exportaciones separadas por tabulaciones —comunes en herramientas de analítica y clientes de bases de datos— hacia APIs y aplicaciones',
    enNote: 'TSV uses tab characters as separators, which avoids the comma-escaping problems of CSV when your data contains commas.',
    esNote: 'TSV usa tabulaciones como separador, lo que evita los problemas de comas escapadas de CSV cuando tus datos contienen comas.',
  },
  {
    key: 'json2csv', from: 'JSON', to: 'CSV',
    enUse: 'opening API responses and JSON datasets in Excel, Google Sheets, or any spreadsheet application',
    esUse: 'abrir respuestas de API y conjuntos de datos JSON en Excel, Google Sheets o cualquier hoja de cálculo',
    enNote: 'Nested objects are flattened into path-style column names (like address.city) because CSV is a flat, tabular format.',
    esNote: 'Los objetos anidados se aplanan en columnas con nombres tipo ruta (como address.city) porque CSV es un formato plano y tabular.',
  },
  {
    key: 'json2tsv', from: 'JSON', to: 'TSV',
    enUse: 'pasting structured data into spreadsheets and tools that expect tab-separated values',
    esUse: 'pegar datos estructurados en hojas de cálculo y herramientas que esperan valores separados por tabulaciones',
    enNote: 'TSV output pastes cleanly into spreadsheet cells and avoids comma-escaping issues when values contain commas.',
    esNote: 'La salida TSV se pega limpiamente en celdas de hojas de cálculo y evita problemas de escape cuando los valores contienen comas.',
  },
  {
    key: 'json2xml', from: 'JSON', to: 'XML',
    enUse: 'feeding JSON data into legacy systems, SOAP services, and enterprise tools that require XML',
    esUse: 'alimentar con datos JSON sistemas antiguos, servicios SOAP y herramientas empresariales que requieren XML',
    enNote: 'Object keys become XML elements and arrays become repeated elements, producing well-formed XML you can validate against your schema.',
    esNote: 'Las claves del objeto se convierten en elementos XML y los arreglos en elementos repetidos, produciendo XML bien formado que puedes validar contra tu esquema.',
  },
  {
    key: 'json2yaml', from: 'JSON', to: 'YAML',
    enUse: 'writing configuration files for tools like Docker Compose, Kubernetes, and CI pipelines that prefer YAML',
    esUse: 'escribir archivos de configuración para herramientas como Docker Compose, Kubernetes y pipelines de CI que prefieren YAML',
    enNote: 'YAML is a superset of JSON, so the conversion is lossless: structure, types, and values are preserved exactly.',
    esNote: 'YAML es un superconjunto de JSON, así que la conversión no pierde nada: estructura, tipos y valores se conservan exactamente.',
  },
];

function convertBlockEn(s: ConvertSpec): ToolContentBlock {
  return {
    aboutTitle: `About the ${s.from} to ${s.to} converter`,
    about: [
      `This tool converts ${s.from} data to ${s.to} instantly. It is useful for ${s.enUse}.`,
      `${s.enNote} The conversion runs entirely in your browser, so your data is never uploaded to a server — safe for confidential datasets.`,
    ],
    howTitle: 'How to use it',
    steps: [
      `Paste your ${s.from} data into the input panel.`,
      'The converted output appears automatically.',
      'Review the result and adjust the input if needed.',
      `Copy or download the ${s.to} output.`,
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Is my data uploaded anywhere?', a: 'No. The conversion happens locally in your browser; nothing is transmitted or stored.' },
      { q: 'Is there a file size limit?', a: 'No fixed limit — files of several megabytes convert in seconds since everything runs on your device.' },
      { q: `What happens to invalid ${s.from} input?`, a: 'The tool reports a clear error instead of producing broken output, so you can fix the input and retry.' },
      { q: 'Can I convert in the other direction?', a: 'Yes — the JSON converter section includes tools for both directions between JSON, CSV, TSV, XML, and YAML.' },
    ],
  };
}

function convertBlockEs(s: ConvertSpec): ToolContentBlock {
  return {
    aboutTitle: `Sobre el conversor de ${s.from} a ${s.to}`,
    about: [
      `Esta herramienta convierte datos ${s.from} a ${s.to} al instante. Es útil para ${s.esUse}.`,
      `${s.esNote} La conversión se ejecuta por completo en tu navegador, así que tus datos nunca se suben a un servidor: segura para conjuntos de datos confidenciales.`,
    ],
    howTitle: 'Cómo se usa',
    steps: [
      `Pega tus datos ${s.from} en el panel de entrada.`,
      'La salida convertida aparece automáticamente.',
      'Revisa el resultado y ajusta la entrada si hace falta.',
      `Copia o descarga la salida ${s.to}.`,
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Mis datos se suben a algún lado?', a: 'No. La conversión ocurre localmente en tu navegador; nada se transmite ni se guarda.' },
      { q: '¿Hay límite de tamaño?', a: 'No hay límite fijo: archivos de varios megabytes se convierten en segundos porque todo corre en tu dispositivo.' },
      { q: `¿Qué pasa si la entrada ${s.from} es inválida?`, a: 'La herramienta muestra un error claro en lugar de producir una salida rota, para que corrijas la entrada y reintentes.' },
      { q: '¿Puedo convertir en la dirección contraria?', a: 'Sí: la sección de conversión JSON incluye herramientas en ambas direcciones entre JSON, CSV, TSV, XML y YAML.' },
    ],
  };
}

interface UtilSpec {
  key: string;
  enName: string; esName: string;
  enWhat: string; esWhat: string;
  enWhy: string; esWhy: string;
}

const UTIL_SPECS: UtilSpec[] = [
  {
    key: 'format', enName: 'JSON Formatter', esName: 'formateador JSON',
    enWhat: 'pretty-prints minified or messy JSON with consistent indentation so its structure is easy to read',
    esWhat: 'da formato legible a JSON minificado o desordenado con indentación consistente para que su estructura sea fácil de leer',
    enWhy: 'API responses and logs usually arrive minified into a single line; formatting them is the first step of any debugging session',
    esWhy: 'las respuestas de API y los logs suelen llegar minificados en una sola línea; formatearlos es el primer paso de cualquier sesión de depuración',
  },
  {
    key: 'minify', enName: 'JSON Minifier', esName: 'minificador JSON',
    enWhat: 'removes all unnecessary whitespace from JSON, producing the smallest possible payload',
    esWhat: 'elimina todos los espacios innecesarios del JSON, produciendo el payload más pequeño posible',
    enWhy: 'smaller payloads transfer faster over the network and take less storage — useful before embedding JSON in code or configs',
    esWhy: 'los payloads más pequeños viajan más rápido por la red y ocupan menos almacenamiento; útil antes de incrustar JSON en código o configuraciones',
  },
  {
    key: 'sort', enName: 'JSON Key Sorter', esName: 'ordenador de claves JSON',
    enWhat: 'sorts all object keys alphabetically at every nesting level',
    esWhat: 'ordena todas las claves de los objetos alfabéticamente en todos los niveles de anidación',
    enWhy: 'sorted keys make two documents comparable line by line and produce clean diffs in version control',
    esWhy: 'las claves ordenadas permiten comparar dos documentos línea a línea y producen diffs limpios en control de versiones',
  },
  {
    key: 'validate', enName: 'JSON Validator', esName: 'validador JSON',
    enWhat: 'checks whether a document is syntactically valid JSON and points to the exact location of the first error',
    esWhat: 'comprueba si un documento es JSON sintácticamente válido y señala la ubicación exacta del primer error',
    enWhy: 'a missing comma or an unquoted key can break an entire integration; validating before shipping saves debugging time',
    esWhy: 'una coma faltante o una clave sin comillas puede romper una integración completa; validar antes de publicar ahorra tiempo de depuración',
  },
  {
    key: 'flatten', enName: 'JSON Flattener', esName: 'aplanador JSON',
    enWhat: 'converts nested objects into a single level using path-style keys, e.g. {"a":{"b":1}} becomes {"a.b":1}',
    esWhat: 'convierte objetos anidados en un solo nivel usando claves tipo ruta, p. ej. {"a":{"b":1}} se convierte en {"a.b":1}',
    enWhy: 'flat structures are easier to map to CSV columns, database fields, form data, and analytics events',
    esWhy: 'las estructuras planas son más fáciles de mapear a columnas CSV, campos de bases de datos, datos de formularios y eventos de analítica',
  },
  {
    key: 'unflatten', enName: 'JSON Unflattener', esName: 'desaplanador JSON',
    enWhat: 'rebuilds a nested JSON structure from path-style keys, reversing the flatten operation',
    esWhat: 'reconstruye una estructura JSON anidada a partir de claves tipo ruta, invirtiendo la operación de aplanado',
    enWhy: 'data coming from CSV files, form submissions, or key-value stores is flat; unflattening restores the hierarchy your application expects',
    esWhy: 'los datos que llegan de archivos CSV, formularios o almacenes clave-valor son planos; desaplanar restaura la jerarquía que tu aplicación espera',
  },
  {
    key: 'diff', enName: 'JSON Diff', esName: 'comparador JSON',
    enWhat: 'compares two JSON documents and highlights added, removed, and changed values',
    esWhat: 'compara dos documentos JSON y resalta los valores añadidos, eliminados y modificados',
    enWhy: 'spotting what changed between two API responses or configuration versions by eye is error-prone; a structural diff shows every difference instantly',
    esWhy: 'detectar a ojo qué cambió entre dos respuestas de API o versiones de configuración es propenso a errores; un diff estructural muestra cada diferencia al instante',
  },
  {
    key: 'query', enName: 'JSON Query', esName: 'consultor JSON',
    enWhat: 'extracts values from a JSON document using path expressions, without writing code',
    esWhat: 'extrae valores de un documento JSON usando expresiones de ruta, sin escribir código',
    enWhy: 'finding one value inside a deeply nested API response is tedious; a query fetches it directly by its path',
    esWhy: 'encontrar un valor dentro de una respuesta de API muy anidada es tedioso; una consulta lo obtiene directamente por su ruta',
  },
];

function utilBlockEn(s: UtilSpec): ToolContentBlock {
  return {
    aboutTitle: `About the ${s.enName}`,
    about: [
      `The ${s.enName} ${s.enWhat}. It is useful because ${s.enWhy}.`,
      'Like every Pockly tool, it runs entirely in your browser: the JSON you paste is processed on your device and never uploaded to a server.',
    ],
    howTitle: 'How to use it',
    steps: [
      'Paste your JSON into the input panel.',
      'The result appears automatically in the output panel.',
      'Fix any reported errors and re-run if needed.',
      'Copy the result with one click.',
    ],
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Is my JSON uploaded anywhere?', a: 'No. Processing happens locally in your browser; your data never leaves your device.' },
      { q: 'Is there a size limit?', a: 'No fixed limit. Documents of several megabytes are processed in seconds.' },
      { q: 'What if my input is not valid JSON?', a: 'The tool shows a clear error message with the location of the problem instead of failing silently.' },
      { q: 'Are the other JSON utilities related?', a: 'Yes — format, minify, sort, validate, flatten, diff, and query all work together; you can chain them by copying output from one into another.' },
    ],
  };
}

function utilBlockEs(s: UtilSpec): ToolContentBlock {
  return {
    aboutTitle: `Sobre el ${s.esName}`,
    about: [
      `El ${s.esName} ${s.esWhat}. Es útil porque ${s.esWhy}.`,
      'Como todas las herramientas de Pockly, se ejecuta por completo en tu navegador: el JSON que pegas se procesa en tu dispositivo y nunca se sube a un servidor.',
    ],
    howTitle: 'Cómo se usa',
    steps: [
      'Pega tu JSON en el panel de entrada.',
      'El resultado aparece automáticamente en el panel de salida.',
      'Corrige los errores reportados y vuelve a ejecutar si hace falta.',
      'Copia el resultado con un clic.',
    ],
    faqTitle: 'Preguntas frecuentes',
    faqs: [
      { q: '¿Mi JSON se sube a algún lado?', a: 'No. El procesamiento ocurre localmente en tu navegador; tus datos nunca salen de tu dispositivo.' },
      { q: '¿Hay límite de tamaño?', a: 'No hay límite fijo. Documentos de varios megabytes se procesan en segundos.' },
      { q: '¿Qué pasa si mi entrada no es JSON válido?', a: 'La herramienta muestra un mensaje de error claro con la ubicación del problema en lugar de fallar en silencio.' },
      { q: '¿Las demás utilidades JSON están relacionadas?', a: 'Sí: formatear, minificar, ordenar, validar, aplanar, comparar y consultar funcionan en conjunto; puedes encadenarlas copiando la salida de una en otra.' },
    ],
  };
}

export const SUB_CONTENT: Record<Language, Record<string, ToolContentBlock>> = {
  en: {
    ...Object.fromEntries(CONVERT_SPECS.map((s) => [s.key, convertBlockEn(s)])),
    ...Object.fromEntries(UTIL_SPECS.map((s) => [s.key, utilBlockEn(s)])),
  },
  es: {
    ...Object.fromEntries(CONVERT_SPECS.map((s) => [s.key, convertBlockEs(s)])),
    ...Object.fromEntries(UTIL_SPECS.map((s) => [s.key, utilBlockEs(s)])),
  },
};
