
// Language type imported from @pockly/shared

export interface Translations {
  // Nav
  navHome: string;
  navGenerator: string;
  navTemplates: string;
  navConvert: string;
  navUtils: string;
  navCsvToJson: string;
  navTsvToJson: string;
  navJsonToCsv: string;
  navJsonToTsv: string;
  navJsonToXml: string;
  navJsonToYaml: string;
  navFormat: string;
  navMinify: string;
  navSortKeys: string;
  navValidate: string;
  navFlatten: string;
  navUnflatten: string;
  navDiff: string;
  navQuery: string;

  // Footer
  freeOnlineTools: string;
  languageLabel: string;

  // Home
  heroTitle: string;
  homeSubtitle: string;
  filterAll: string;
  filterCreate: string;
  filterConvert: string;
  filterUtils: string;

  // Tool labels (home cards + page headings)
  generator: string;
  generatorDesc: string;
  templates: string;
  templatesDesc: string;
  csvToJson: string;
  csvToJsonDesc: string;
  tsvToJson: string;
  tsvToJsonDesc: string;
  jsonToCsv: string;
  jsonToCsvDesc: string;
  jsonToTsv: string;
  jsonToTsvDesc: string;
  jsonToXml: string;
  jsonToXmlDesc: string;
  jsonToYaml: string;
  jsonToYamlDesc: string;
  format: string;
  formatDesc: string;
  minify: string;
  minifyDesc: string;
  sortKeys: string;
  sortKeysDesc: string;
  validate: string;
  validateDesc: string;
  flatten: string;
  flattenDesc: string;
  unflatten: string;
  unflattenDesc: string;
  diff: string;
  diffDesc: string;
  query: string;
  queryDesc: string;

  // Common
  uploadFile: string;
  download: string;
  clear: string;
  error: string;
  processing: string;
  success: string;
  copy: string;
  copied: string;

  // Page-specific strings
  pasteCsvDataToConvert: string;
  pasteTsvDataToConvert: string;
  pasteJsonArrayToCsv: string;
  pasteJsonArrayToTsv: string;
  pasteJsonToXml: string;
  pasteJsonToYaml: string;
  chooseConversionType: string;
  chooseUtility: string;
  addField: string;
  generate: string;
  generatedJson: string;
  csvInput: string;
  tsvInput: string;
  jsonInput: string;
  csvOutput: string;
  tsvOutput: string;
  xmlOutput: string;
  yamlOutput: string;
  jsonOutput: string;
  convertBtn: string;
  buildJsonInteractively: string;
  preBuiltStructures: string;
  all: string;
  simple: string;
  common: string;
  complex: string;
  prettyPrintWithIndentation: string;
  removeWhitespace: string;
  sortKeysAlphabetically: string;
  checkIfValidJson: string;
  convertNestedToFlat: string;
  convertFlatToNested: string;
  compareTwoJson: string;
  extractValuesWithJsonPath: string;
  inputJson: string;
  jsonPathQuery: string;
  queryExamples: string;
  compareBtn: string;
  json1Original: string;
  json2Modified: string;
  validJson: string;
  invalidJson: string;
  pleaseEnterJson: string;
  pleaseEnterBothJson: string;
  pleaseEnterJsonPath: string;
  output: string;
  noResultsYet: string;
  result: string;
  templateCategorySimple: string;
  templateCategoryCommon: string;
  templateCategoryComplex: string;
}

export const jsonTranslations: Record<string, Record<string, string>> = {
  en: {
    // Nav
    navHome: 'Home',
    navGenerator: 'Generator',
    navTemplates: 'Templates',
    navConvert: 'Convert',
    navUtils: 'Utils',
    navCsvToJson: 'CSV → JSON',
    navTsvToJson: 'TSV → JSON',
    navJsonToCsv: 'JSON → CSV',
    navJsonToTsv: 'JSON → TSV',
    navJsonToXml: 'JSON → XML',
    navJsonToYaml: 'JSON → YAML',
    navFormat: 'Format',
    navMinify: 'Minify',
    navSortKeys: 'Sort Keys',
    navValidate: 'Validate',
    navFlatten: 'Flatten',
    navUnflatten: 'Unflatten',
    navDiff: 'Diff',
    navQuery: 'Query',

    // Footer
    freeOnlineTools: 'Free online tools to boost your productivity.',
    languageLabel: 'Language',

    // Home
    heroTitle: 'Your JSON tools, all in one place',
    homeSubtitle:
      'Powerful and simple JSON utilities to boost your productivity. Generate JSON, use pre-built templates, convert between formats, and transform your data. Completely free, no registration required.',
    filterAll: 'All Tools',
    filterCreate: 'Create',
    filterConvert: 'Convert',
    filterUtils: 'Utils',

    // Tool labels
    generator: 'JSON Generator',
    generatorDesc: 'Build JSON objects interactively — no API needed',
    templates: 'JSON Templates',
    templatesDesc: 'Pre-built JSON structures for common use cases',
    csvToJson: 'CSV → JSON',
    csvToJsonDesc: 'Convert CSV data to JSON format',
    tsvToJson: 'TSV → JSON',
    tsvToJsonDesc: 'Convert TSV (tab-separated) data to JSON',
    jsonToCsv: 'JSON → CSV',
    jsonToCsvDesc: 'Convert JSON array to CSV format',
    jsonToTsv: 'JSON → TSV',
    jsonToTsvDesc: 'Convert JSON array to TSV format',
    jsonToXml: 'JSON → XML',
    jsonToXmlDesc: 'Convert JSON to XML format',
    jsonToYaml: 'JSON → YAML',
    jsonToYamlDesc: 'Convert JSON to YAML format',
    format: 'Format JSON',
    formatDesc: 'Pretty print with indentation',
    minify: 'Minify JSON',
    minifyDesc: 'Remove whitespace from JSON',
    sortKeys: 'Sort JSON Keys',
    sortKeysDesc: 'Sort object keys alphabetically',
    validate: 'Validate JSON',
    validateDesc: 'Check if valid JSON',
    flatten: 'Flatten JSON',
    flattenDesc: 'Convert nested to flat (key.subkey)',
    unflatten: 'Unflatten JSON',
    unflattenDesc: 'Convert flat to nested object',
    diff: 'JSON Diff',
    diffDesc: 'Compare two JSON objects',
    query: 'JSON Query',
    queryDesc: 'Extract values with JSONPath',

    // Common
    uploadFile: 'Upload file',
    download: 'Download',
    clear: 'Clear',
    error: 'Error',
    processing: 'Processing...',
    success: 'Success',
    copy: 'Copy',
    copied: 'Copied!',

    // Page-specific
    pasteCsvDataToConvert: 'Paste CSV data to convert it to JSON format.',
    pasteTsvDataToConvert: 'Paste TSV (tab-separated) data to convert it to JSON format.',
    pasteJsonArrayToCsv: 'Paste a JSON array to convert it to CSV format.',
    pasteJsonArrayToTsv: 'Paste a JSON array to convert it to TSV (tab-separated) format.',
    pasteJsonToXml: 'Paste JSON data to convert it to XML format.',
    pasteJsonToYaml: 'Paste JSON data to convert it to YAML format.',
    chooseConversionType: 'Choose a conversion type to get started.',
    chooseUtility: 'Choose a utility to get started with your JSON data.',
    addField: 'Add Field',
    generate: 'Generate',
    generatedJson: 'Generated JSON:',
    csvInput: 'CSV Input',
    tsvInput: 'TSV Input',
    jsonInput: 'JSON Input',
    csvOutput: 'CSV Output:',
    tsvOutput: 'TSV Output:',
    xmlOutput: 'XML Output:',
    yamlOutput: 'YAML Output:',
    jsonOutput: 'JSON Output:',
    convertBtn: 'Convert',
    buildJsonInteractively: 'Build JSON objects interactively — no API needed.',
    preBuiltStructures: 'Pre-built JSON structures for common use cases.',
    all: 'All',
    simple: 'Simple',
    common: 'Common',
    complex: 'Complex',
    prettyPrintWithIndentation: 'Pretty print your JSON with proper indentation.',
    removeWhitespace: 'Remove all unnecessary whitespace from your JSON.',
    sortKeysAlphabetically: 'Sort all object keys alphabetically (recursive).',
    checkIfValidJson: 'Check if your text is valid JSON.',
    convertNestedToFlat: 'Convert nested objects to flat dot-notation keys (key.subkey).',
    convertFlatToNested: 'Convert flat dot-notation keys back to nested objects.',
    compareTwoJson: 'Compare two JSON objects and see what was added, removed, or changed.',
    extractValuesWithJsonPath: 'Extract values from JSON using JSONPath dot notation.',
    inputJson: 'Input JSON',
    jsonPathQuery: 'JSONPath Query',
    queryExamples: 'Examples: users, users.0, users[*].name, data.items[0]',
    compareBtn: 'Compare',
    json1Original: 'JSON 1 (original):',
    json2Modified: 'JSON 2 (modified):',
    validJson: '✓ Valid JSON',
    invalidJson: 'Invalid JSON',
    pleaseEnterJson: 'Please enter some JSON',
    pleaseEnterBothJson: 'Please enter JSON in both fields',
    pleaseEnterJsonPath: 'Please enter a JSONPath query',
    output: 'Output',
    noResultsYet: 'No results yet',
    result: 'Result:',
    templateCategorySimple: 'Simple',
    templateCategoryCommon: 'Common',
    templateCategoryComplex: 'Complex',
  },
  es: {
    // Nav
    navHome: 'Inicio',
    navGenerator: 'Generador',
    navTemplates: 'Plantillas',
    navConvert: 'Convertir',
    navUtils: 'Utilidades',
    navCsvToJson: 'CSV → JSON',
    navTsvToJson: 'TSV → JSON',
    navJsonToCsv: 'JSON → CSV',
    navJsonToTsv: 'JSON → TSV',
    navJsonToXml: 'JSON → XML',
    navJsonToYaml: 'JSON → YAML',
    navFormat: 'Formatear',
    navMinify: 'Minificar',
    navSortKeys: 'Ordenar claves',
    navValidate: 'Validar',
    navFlatten: 'Aplanar',
    navUnflatten: 'Desaplanar',
    navDiff: 'Comparar',
    navQuery: 'Consultar',

    // Footer
    freeOnlineTools: 'Herramientas online gratuitas para tu productividad.',
    languageLabel: 'Idioma',

    // Home
    heroTitle: 'Tus herramientas JSON, todo en un solo lugar',
    homeSubtitle:
      'Utilidades JSON potentes y simples para aumentar tu productividad. Genera JSON, usa plantillas predefinidas, convierte entre formatos y transforma tus datos. Completamente gratis, sin registro requerido.',
    filterAll: 'Todas',
    filterCreate: 'Crear',
    filterConvert: 'Convertir',
    filterUtils: 'Utilidades',

    // Tool labels
    generator: 'Generador JSON',
    generatorDesc: 'Construye objetos JSON interactivamente — sin API',
    templates: 'Plantillas JSON',
    templatesDesc: 'Estructuras JSON predefinidas para casos comunes',
    csvToJson: 'CSV → JSON',
    csvToJsonDesc: 'Convierte datos CSV a formato JSON',
    tsvToJson: 'TSV → JSON',
    tsvToJsonDesc: 'Convierte datos TSV (separados por tab) a JSON',
    jsonToCsv: 'JSON → CSV',
    jsonToCsvDesc: 'Convierte array JSON a formato CSV',
    jsonToTsv: 'JSON → TSV',
    jsonToTsvDesc: 'Convierte array JSON a formato TSV',
    jsonToXml: 'JSON → XML',
    jsonToXmlDesc: 'Convierte JSON a formato XML',
    jsonToYaml: 'JSON → YAML',
    jsonToYamlDesc: 'Convierte JSON a formato YAML',
    format: 'Formatear JSON',
    formatDesc: 'Imprimir con indentación ordenada',
    minify: 'Minificar JSON',
    minifyDesc: 'Eliminar espacios innecesarios del JSON',
    sortKeys: 'Ordenar claves JSON',
    sortKeysDesc: 'Ordenar claves alfabéticamente',
    validate: 'Validar JSON',
    validateDesc: 'Verificar si es JSON válido',
    flatten: 'Aplanar JSON',
    flattenDesc: 'Convertir anidado a plano (clave.subclave)',
    unflatten: 'Desaplanar JSON',
    unflattenDesc: 'Convertir plano a objeto anidado',
    diff: 'Comparar JSON',
    diffDesc: 'Comparar dos objetos JSON',
    query: 'Consultar JSON',
    queryDesc: 'Extraer valores con JSONPath',

    // Common
    uploadFile: 'Subir archivo',
    download: 'Descargar',
    clear: 'Limpiar',
    error: 'Error',
    processing: 'Procesando...',
    success: 'Éxito',
    copy: 'Copiar',
    copied: '¡Copiado!',

    // Page-specific
    pasteCsvDataToConvert: 'Pega datos CSV para convertirlos a formato JSON.',
    pasteTsvDataToConvert: 'Pega datos TSV (separados por tab) para convertirlos a formato JSON.',
    pasteJsonArrayToCsv: 'Pega un array JSON para convertirlo a formato CSV.',
    pasteJsonArrayToTsv: 'Pega un array JSON para convertirlo a formato TSV (separado por tab).',
    pasteJsonToXml: 'Pega datos JSON para convertirlos a formato XML.',
    pasteJsonToYaml: 'Pega datos JSON para convertirlos a formato YAML.',
    chooseConversionType: 'Elige un tipo de conversión para empezar.',
    chooseUtility: 'Elige una utilidad para trabajar con tus datos JSON.',
    addField: 'Agregar campo',
    generate: 'Generar',
    generatedJson: 'JSON generado:',
    csvInput: 'Entrada CSV',
    tsvInput: 'Entrada TSV',
    jsonInput: 'Entrada JSON',
    csvOutput: 'Salida CSV:',
    tsvOutput: 'Salida TSV:',
    xmlOutput: 'Salida XML:',
    yamlOutput: 'Salida YAML:',
    jsonOutput: 'Salida JSON:',
    convertBtn: 'Convertir',
    buildJsonInteractively: 'Construye objetos JSON interactivamente — sin API.',
    preBuiltStructures: 'Estructuras JSON predefinidas para casos de uso comunes.',
    all: 'Todas',
    simple: 'Simple',
    common: 'Común',
    complex: 'Complejo',
    prettyPrintWithIndentation: 'Formatea tu JSON con indentación ordenada.',
    removeWhitespace: 'Elimina todos los espacios innecesarios de tu JSON.',
    sortKeysAlphabetically: 'Ordena todas las claves alfabéticamente (recursivo).',
    checkIfValidJson: 'Verifica si tu texto es JSON válido.',
    convertNestedToFlat: 'Convierte objetos anidados a notación plana con puntos (clave.subclave).',
    convertFlatToNested: 'Convierte notación plana con puntos de vuelta a objetos anidados.',
    compareTwoJson: 'Compara dos objetos JSON y ve qué fue agregado, eliminado o modificado.',
    extractValuesWithJsonPath: 'Extrae valores de JSON usando notación JSONPath con puntos.',
    inputJson: 'JSON de entrada',
    jsonPathQuery: 'Consulta JSONPath',
    queryExamples: 'Ejemplos: users, users.0, users[*].name, data.items[0]',
    compareBtn: 'Comparar',
    json1Original: 'JSON 1 (original):',
    json2Modified: 'JSON 2 (modificado):',
    validJson: '✓ JSON válido',
    invalidJson: 'JSON inválido',
    pleaseEnterJson: 'Ingresa algún JSON',
    pleaseEnterBothJson: 'Ingresa JSON en ambos campos',
    pleaseEnterJsonPath: 'Ingresa una consulta JSONPath',
    output: 'Salida',
    noResultsYet: 'Sin resultados aún',
    result: 'Resultado:',
    templateCategorySimple: 'Simple',
    templateCategoryCommon: 'Común',
    templateCategoryComplex: 'Complejo',
  },
};

