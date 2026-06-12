export interface Translations {
  // Nav
  navHome: string;
  navWordCount: string;
  navTextCase: string;
  navDiffChecker: string;
  navPasswordGenerator: string;
  navQuickNotes: string;
  // Footer
  freeOnlineTools: string;
  noSignupNoAds: string;
  languageLabel: string;

  // Home
  yourTextToolsAllInOnePlace: string;
  homeSubtitle: string;
  allTools: string;
  textTools: string;
  compare: string;
  utilities: string;

  // Tool labels
  wordCounter: string;
  wordCounterDesc: string;
  textCaseConverter: string;
  textCaseConverterDesc: string;
  diffChecker: string;
  diffCheckerDesc: string;
  passwordGenerator: string;
  passwordGeneratorDesc: string;
  quickNotes: string;
  quickNotesDesc: string;

  // Word Counter
  countWordsAndCharacters: string;
  enterTextHere: string;
  clear: string;
  results: string;
  wordCountLabel: string;
  characterCount: string;

  // Text Case Tool
  uppercaseAndLowercaseConverter: string;
  convertTextToUppercase: string;
  enterTextHereToConvert: string;
  pleaseEnterValidText: string;
  uppercase: string;
  lowercase: string;
  capitalize: string;
  result: string;

  // Diff Checker
  compareTwoTexts: string;
  originalText: string;
  newText: string;
  pasteOriginalText: string;
  pasteNewModifiedText: string;
  compareBtn: string;
  added: string;
  removed: string;
  unchanged: string;

  // Password Generator
  generateSecurePasswords: string;
  length: string;
  uppercaseAZ: string;
  lowerCaseAz: string;
  numbers09: string;
  symbols: string;
  generatePassword: string;
  generatedPassword: string;
  regenerate: string;

  // Quick Notes
  writeAndAutoSaveNotes: string;
  startTypingNotes: string;
  saved: string;
  areYouSure: string;
  yesClear: string;
  cancel: string;
  exportToPdf: string;

  // Quick Notes - Priority Columns
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  createNote: string;
  noteTitle: string;
  noteTitlePlaceholder: string;
  noteDescription: string;
  noteDescriptionPlaceholder: string;
  addNote: string;
  editNote: string;
  deleteNote: string;
  deleteNoteConfirm: string;
  noteCategory: string;
  noteCategoryPlaceholder: string;
  checklist: string;
  addChecklistItem: string;
  noChecklistItems: string;
  removeItem: string;
  noNotesInColumn: string;
  dragNotesHere: string;
  moveToColumn: string;
  noteCreated: string;
  noteUpdated: string;
  noteDeleted: string;

  // Auth
  signIn: string;
  createAccount: string;
  signInToSync: string;
  username: string;
  email: string;
  password: string;
  passwordMin: string;
  yourPassword: string;
  googleContinue: string;
  or: string;
  invalidCredentials: string;
  fillAllFields: string;
  usernameLength: string;
  usernameChars: string;
  passwordLength: string;
  accountExists: string;
  accountCreated: string;
  checkEmail: string;
  backToTools: string;
  googleNotConfigured: string;
}

export const textTranslations: Record<string, Record<string, string>> = {
  en: {
    // Nav
    navHome: 'Home',
    navWordCount: 'Word Counter',
    navTextCase: 'Text Case',
    navDiffChecker: 'Diff Checker',
    navPasswordGenerator: 'Password Generator',
    navQuickNotes: 'Quick Notes',

    // Footer
    freeOnlineTools: 'Free online tools to boost your productivity.',
    noSignupNoAds: '',
    languageLabel: 'Language',

    // Home
    yourTextToolsAllInOnePlace: 'Your text tools, all in one place',
    homeSubtitle:
      'Powerful and simple text utilities to boost your productivity. Count words, change text case, compare documents, generate secure passwords, and save notes.',
    allTools: 'All Tools',
    textTools: 'Text Tools',
    compare: 'Compare',
    utilities: 'Utilities',

    // Tool labels
    wordCounter: 'Word Counter',
    wordCounterDesc: 'Count words, characters, sentences and paragraphs in your text',
    textCaseConverter: 'Text Case Converter',
    textCaseConverterDesc: 'Convert text to uppercase, lowercase, title case or sentence case',
    diffChecker: 'Diff Checker',
    diffCheckerDesc: 'Compare two texts and see exactly what changed between them',
    passwordGenerator: 'Password Generator',
    passwordGeneratorDesc: 'Generate secure passwords with custom length and character options',
    quickNotes: 'Quick Notes',
    quickNotesDesc: 'Write and auto-save notes instantly to your browser storage',

    // Word Counter
    countWordsAndCharacters: 'Count words and characters in your text.',
    enterTextHere: 'Enter text here...',
    clear: 'Clear',
    results: 'Results:',
    wordCountLabel: 'Word Count',
    characterCount: 'Character Count',

    // Text Case Tool
    uppercaseAndLowercaseConverter: 'Uppercase and Lowercase Converter',
    convertTextToUppercase: 'Convert text to uppercase, lowercase or capitalize.',
    enterTextHereToConvert: 'Enter text here to convert...',
    pleaseEnterValidText: 'Please enter valid text.',
    uppercase: 'UPPERCASE',
    lowercase: 'lowercase',
    capitalize: 'Capitalize',
    result: 'Result:',

    // Diff Checker
    compareTwoTexts: 'Compare two texts and see the differences.',
    originalText: 'Original text',
    newText: 'New text',
    pasteOriginalText: 'Paste original text here...',
    pasteNewModifiedText: 'Paste new/modified text here...',
    compareBtn: 'Compare',
    added: 'added',
    removed: 'removed',
    unchanged: 'unchanged',

    // Password Generator
    generateSecurePasswords: 'Generate secure passwords with custom options.',
    length: 'Length:',
    uppercaseAZ: 'Uppercase (A-Z)',
    lowerCaseAz: 'Lowercase (a-z)',
    numbers09: 'Numbers (0-9)',
    symbols: 'Symbols (!@#$%...)',
    generatePassword: 'Generate Password',
    generatedPassword: 'Generated Password:',
    regenerate: 'Regenerate',

    // Quick Notes
    writeAndAutoSaveNotes: 'Write and auto-save your notes instantly.',
    startTypingNotes:
      "Start typing your notes here... They will be auto-saved to your browser's local storage.",
    saved: 'Saved',
    areYouSure: 'Are you sure?',
    yesClear: 'Yes, clear',
    cancel: 'Cancel',
    exportToPdf: 'Export to PDF',

    // Quick Notes - Priority Columns
    priorityHigh: 'High Priority',
    priorityMedium: 'Medium Priority',
    priorityLow: 'Low Priority',
    createNote: 'Create Note',
    noteTitle: 'Title',
    noteTitlePlaceholder: 'Note title...',
    noteDescription: 'Description',
    noteDescriptionPlaceholder: 'Add a description...',
    addNote: 'Add Note',
    editNote: 'Edit Note',
    deleteNote: 'Delete Note',
    deleteNoteConfirm: 'Delete this note?',
    noteCategory: 'Category',
    noteCategoryPlaceholder: 'e.g. Work, Personal, Ideas...',
    checklist: 'Checklist',
    addChecklistItem: 'Add item...',
    noChecklistItems: 'No items yet',
    removeItem: 'Remove item',
    noNotesInColumn: 'No notes yet',
    dragNotesHere: 'Drag notes here',
    moveToColumn: 'Move to...',
    noteCreated: 'Note created',
    noteUpdated: 'Note updated',
    noteDeleted: 'Note deleted',

    // Auth
    signIn: 'Login',
    createAccount: 'Create account',
    signInToSync: 'Login to sync your notes across devices',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    passwordMin: 'Password (min. 8 chars)',
    yourPassword: 'Your password',
    googleContinue: 'Continue with Google',
    or: 'or',
    invalidCredentials: 'Invalid email or password.',
    fillAllFields: 'Please fill in all fields.',
    usernameLength: 'Username must be between 2 and 30 characters.',
    usernameChars: 'Username can only contain letters, numbers, hyphens and underscores.',
    passwordLength: 'Password must be at least 8 characters.',
    accountExists: 'An account with this email already exists.',
    accountCreated: 'Account created! You can now sign in.',
    checkEmail: 'Account created! Check your email to confirm.',
    backToTools: '← Back to tools',
    googleNotConfigured: 'Google sign in is not configured. Enable it in the Supabase dashboard.',
  },
  es: {
    // Nav
    navHome: 'Inicio',
    navWordCount: 'Contador',
    navTextCase: 'Mayúsculas',
    navDiffChecker: 'Comparador',
    navPasswordGenerator: 'Contraseñas',
    navQuickNotes: 'Notas',

    // Footer
    freeOnlineTools: 'Herramientas online gratuitas para tu productividad.',
    noSignupNoAds: '',
    languageLabel: 'Idioma',

    // Home
    yourTextToolsAllInOnePlace: 'Tus herramientas de texto, todo en un solo lugar',
    homeSubtitle:
      'Utilidades de texto potentes y simples para aumentar tu productividad. Cuenta palabras, cambia mayúsculas/minúsculas, compara documentos, genera contraseñas seguras y guarda notas.',
    allTools: 'Todas',
    textTools: 'Texto',
    compare: 'Comparar',
    utilities: 'Utilidades',

    // Tool labels
    wordCounter: 'Contador de Palabras',
    wordCounterDesc: 'Cuenta palabras, caracteres, oraciones y párrafos en tu texto',
    textCaseConverter: 'Convertidor de Mayúsculas',
    textCaseConverterDesc: 'Convierte texto a mayúsculas, minúsculas, título o oración',
    diffChecker: 'Comparador de Diferencias',
    diffCheckerDesc: 'Compara dos textos y ve exactamente qué cambió entre ellos',
    passwordGenerator: 'Generador de Contraseñas',
    passwordGeneratorDesc:
      'Genera contraseñas seguras con opciones personalizadas de longitud y caracteres',
    quickNotes: 'Notas Rápidas',
    quickNotesDesc: 'Escribe y guarda notas automáticamente en el almacenamiento de tu navegador',

    // Word Counter
    countWordsAndCharacters: 'Cuenta palabras y caracteres en tu texto.',
    enterTextHere: 'Escribe tu texto aquí...',
    clear: 'Limpiar',
    results: 'Resultados:',
    wordCountLabel: 'Palabras',
    characterCount: 'Caracteres',

    // Text Case Tool
    uppercaseAndLowercaseConverter: 'Convertidor de Mayúsculas/Minúsculas',
    convertTextToUppercase: 'Convierte texto a mayúsculas, minúsculas o capitaliza.',
    enterTextHereToConvert: 'Escribe el texto aquí para convertir...',
    pleaseEnterValidText: 'Por favor ingresa un texto válido.',
    uppercase: 'MAYÚSCULAS',
    lowercase: 'minúsculas',
    capitalize: 'Capitalizar',
    result: 'Resultado:',

    // Diff Checker
    compareTwoTexts: 'Compara dos textos y ve las diferencias.',
    originalText: 'Texto original',
    newText: 'Texto nuevo',
    pasteOriginalText: 'Pega el texto original aquí...',
    pasteNewModifiedText: 'Pega el texto nuevo/modificado aquí...',
    compareBtn: 'Comparar',
    added: 'añadidos',
    removed: 'eliminados',
    unchanged: 'sin cambios',

    // Password Generator
    generateSecurePasswords: 'Genera contraseñas seguras con opciones personalizadas.',
    length: 'Longitud:',
    uppercaseAZ: 'Mayúsculas (A-Z)',
    lowerCaseAz: 'Minúsculas (a-z)',
    numbers09: 'Números (0-9)',
    symbols: 'Símbolos (!@#$%...)',
    generatePassword: 'Generar Contraseña',
    generatedPassword: 'Contraseña Generada:',
    regenerate: 'Regenerar',

    // Quick Notes
    writeAndAutoSaveNotes: 'Escribe y guarda tus notas al instante.',
    startTypingNotes:
      'Empezá a escribir tus notas aquí... Se guardarán automáticamente en el almacenamiento local de tu navegador.',
    saved: 'Guardado',
    areYouSure: '¿Estás seguro?',
    yesClear: 'Sí, limpiar',
    cancel: 'Cancelar',
    exportToPdf: 'Exportar a PDF',

    // Quick Notes - Priority Columns
    priorityHigh: 'Prioridad Alta',
    priorityMedium: 'Prioridad Media',
    priorityLow: 'Prioridad Baja',
    createNote: 'Crear Nota',
    noteTitle: 'Título',
    noteTitlePlaceholder: 'Título de la nota...',
    noteDescription: 'Descripción',
    noteDescriptionPlaceholder: 'Agregar una descripción...',
    addNote: 'Agregar Nota',
    editNote: 'Editar Nota',
    deleteNote: 'Eliminar Nota',
    deleteNoteConfirm: '¿Eliminar esta nota?',
    noteCategory: 'Categoría',
    noteCategoryPlaceholder: 'ej. Trabajo, Personal, Ideas...',
    checklist: 'Checklist',
    addChecklistItem: 'Agregar ítem...',
    noChecklistItems: 'Sin ítems aún',
    removeItem: 'Eliminar ítem',
    noNotesInColumn: 'Sin notas aún',
    dragNotesHere: 'Arrastra notas aquí',
    moveToColumn: 'Mover a...',
    noteCreated: 'Nota creada',
    noteUpdated: 'Nota actualizada',
    noteDeleted: 'Nota eliminada',

    // Auth
    signIn: 'Ingresar',
    createAccount: 'Crear cuenta',
    signInToSync: 'Ingresá para sincronizar tus notas entre dispositivos',
    username: 'Usuario',
    email: 'Email',
    password: 'Contraseña',
    passwordMin: 'Contraseña (mín. 8 caracteres)',
    yourPassword: 'Tu contraseña',
    googleContinue: 'Continuar con Google',
    or: 'o',
    invalidCredentials: 'Email o contraseña inválidos.',
    fillAllFields: 'Por favor completá todos los campos.',
    usernameLength: 'El usuario debe tener entre 2 y 30 caracteres.',
    usernameChars: 'El usuario solo puede contener letras, números, guiones y guiones bajos.',
    passwordLength: 'La contraseña debe tener al menos 8 caracteres.',
    accountExists: 'Ya existe una cuenta con este email.',
    accountCreated: '¡Cuenta creada! Ya podés iniciar sesión.',
    checkEmail: '¡Cuenta creada! Revisá tu email para confirmarla.',
    backToTools: '← Volver a las herramientas',
    googleNotConfigured:
      'Google no está configurado. Habilitá el proveedor en el dashboard de Supabase.',
  },
};
