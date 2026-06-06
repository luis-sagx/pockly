import { isPlatformBrowser } from '@angular/common';
import { effect, Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type Language = 'en' | 'es';

export interface Translations {
  // Nav
  navHome: string;
  navWordCount: string;
  navTextCase: string;
  navDiffChecker: string;
  navPasswordGenerator: string;
  navQuickNotes: string;
  navSpellChecker: string;

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
  noNotesInColumn: string;
  dragNotesHere: string;
  moveToColumn: string;
  noteCreated: string;
  noteUpdated: string;
  noteDeleted: string;

  // Spell Checker
  spellChecker: string;
  spellCheckerDesc: string;
  checkSpelling: string;
  spellChecking: string;
  spellingErrors: string;
  errorCount: string;
  clickToReplace: string;
  suggestions: string;
  correctedText: string;
  noErrorsFound: string;
  selectLanguage: string;
  loadingDictionary: string;
  dictionaryLoadError: string;
  uploadFile: string;
  fileLoaded: string;
  supportedFormats: string;
  undo: string;
  sourceText: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Nav
    navHome: 'Home',
    navWordCount: 'Word Counter',
    navTextCase: 'Text Case',
    navDiffChecker: 'Diff Checker',
    navPasswordGenerator: 'Password Generator',
    navQuickNotes: 'Quick Notes',
    navSpellChecker: 'Spell Checker',

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
    noNotesInColumn: 'No notes yet',
    dragNotesHere: 'Drag notes here',
    moveToColumn: 'Move to...',
    noteCreated: 'Note created',
    noteUpdated: 'Note updated',
    noteDeleted: 'Note deleted',

    // Spell Checker
    spellChecker: 'Spell Checker',
    spellCheckerDesc: 'Check spelling and get suggestions in multiple languages',
    checkSpelling: 'Check Spelling',
    spellChecking: 'Checking...',
    spellingErrors: 'Spelling Errors',
    errorCount: 'errors',
    clickToReplace: 'Click to replace',
    suggestions: 'Suggestions',
    correctedText: 'Corrected Text',
    noErrorsFound: 'No spelling errors found!',
    selectLanguage: 'Language',
    loadingDictionary: 'Loading dictionary...',
    dictionaryLoadError: 'Failed to load dictionary',
    uploadFile: 'Upload a file',
    fileLoaded: 'File loaded',
    supportedFormats: 'Supported: TXT, MD, TEXT (plain text files)',
    undo: 'Undo',
    sourceText: 'Source Text',
  },
  es: {
    // Nav
    navHome: 'Inicio',
    navWordCount: 'Contador',
    navTextCase: 'Mayúsculas',
    navDiffChecker: 'Comparador',
    navPasswordGenerator: 'Contraseñas',
    navQuickNotes: 'Notas',
    navSpellChecker: 'Corrector',

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
      'Empieza a escribir tus notas aquí... Se guardarán automáticamente en el almacenamiento local de tu navegador.',
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
    noNotesInColumn: 'Sin notas aún',
    dragNotesHere: 'Arrastra notas aquí',
    moveToColumn: 'Mover a...',
    noteCreated: 'Nota creada',
    noteUpdated: 'Nota actualizada',
    noteDeleted: 'Nota eliminada',

    // Spell Checker
    spellChecker: 'Corrector Ortográfico',
    spellCheckerDesc: 'Verifica ortografía y obtén sugerencias en múltiples idiomas',
    checkSpelling: 'Verificar Ortografía',
    spellChecking: 'Verificando...',
    spellingErrors: 'Errores Ortográficos',
    errorCount: 'errores',
    clickToReplace: 'Click para reemplazar',
    suggestions: 'Sugerencias',
    correctedText: 'Texto Corregido',
    noErrorsFound: '¡No se encontraron errores ortográficos!',
    selectLanguage: 'Idioma',
    loadingDictionary: 'Cargando diccionario...',
    dictionaryLoadError: 'Error al cargar diccionario',
    uploadFile: 'Subir un archivo',
    fileLoaded: 'Archivo cargado',
    supportedFormats: 'Soportados: TXT, MD, TEXT (archivos de texto plano)',
    undo: 'Deshacer',
    sourceText: 'Texto Origen',
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
