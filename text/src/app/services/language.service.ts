import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

export interface Translations {
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
}

const translations: Record<Language, Translations> = {
  en: {
    // Footer
    freeOnlineTools: 'Free online tools — no signup, no ads.',
    noSignupNoAds: '',
    languageLabel: 'Language',

    // Home
    yourTextToolsAllInOnePlace: 'Your text tools, all in one place',
    homeSubtitle:
      'Powerful and simple text utilities to boost your productivity. Count words, change text case, compare documents, generate secure passwords, and save notes. Completely free, no registration required.',
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
      'Start typing your notes here... They will be auto-saved to your browser\'s local storage.',
    saved: 'Saved',
    areYouSure: 'Are you sure?',
    yesClear: 'Yes, clear',
    cancel: 'Cancel',
  },
  es: {
    // Footer
    freeOnlineTools: 'Herramientas online gratuitas — sin registro, sin anuncios.',
    noSignupNoAds: '',
    languageLabel: 'Idioma',

    // Home
    yourTextToolsAllInOnePlace: 'Tus herramientas de texto, todo en un solo lugar',
    homeSubtitle:
      'Utilidades de texto potentes y simples para aumentar tu productividad. Cuenta palabras, cambia mayúsculas/minúsculas, compara documentos, genera contraseñas seguras y guarda notas. Completamente gratis, sin registro requerido.',
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
    passwordGeneratorDesc: 'Genera contraseñas seguras con opciones personalizadas de longitud y caracteres',
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
  },
  fr: {
    // Footer
    freeOnlineTools: 'Outils en ligne gratuits — sans inscription, sans publicité.',
    noSignupNoAds: '',
    languageLabel: 'Langue',

    // Home
    yourTextToolsAllInOnePlace: 'Vos outils de texte, tout au même endroit',
    homeSubtitle:
      'Des utilitaires de texte puissants et simples pour stimuler votre productivité. Comptez les mots, changez la casse, comparez des documents, générez des mots de passe sécurisés et enregistrez des notes. Totalement gratuit, sans inscription requise.',
    allTools: 'Tous',
    textTools: 'Texte',
    compare: 'Comparer',
    utilities: 'Utilitaires',

    // Tool labels
    wordCounter: 'Compteur de Mots',
    wordCounterDesc: 'Comptez les mots, caractères, phrases et paragraphes dans votre texte',
    textCaseConverter: 'Convertisseur de Casse',
    textCaseConverterDesc: 'Convertissez le texte en majuscules, minuscules, titre ou phrase',
    diffChecker: 'Comparateur de Différences',
    diffCheckerDesc: 'Comparez deux textes et voyez exactement ce qui a changé',
    passwordGenerator: 'Générateur de Mots de Passe',
    passwordGeneratorDesc: 'Générez des mots de passe sécurisés avec des options personnalisées',
    quickNotes: 'Notes Rapides',
    quickNotesDesc: 'Écrivez et enregistrez des notes instantanément dans votre navigateur',

    // Word Counter
    countWordsAndCharacters: 'Comptez les mots et caractères dans votre texte.',
    enterTextHere: 'Entrez votre texte ici...',
    clear: 'Effacer',
    results: 'Résultats:',
    wordCountLabel: 'Mots',
    characterCount: 'Caractères',

    // Text Case Tool
    uppercaseAndLowercaseConverter: 'Convertisseur Majuscules/Minuscules',
    convertTextToUppercase: 'Convertissez le texte en majuscules, minuscules ou capitalisez.',
    enterTextHereToConvert: 'Entrez le texte à convertir ici...',
    pleaseEnterValidText: 'Veuillez entrer un texte valide.',
    uppercase: 'MAJUSCULES',
    lowercase: 'minuscules',
    capitalize: 'Capitaliser',
    result: 'Résultat:',

    // Diff Checker
    compareTwoTexts: 'Comparez deux textes et voyez les différences.',
    originalText: 'Texte original',
    newText: 'Nouveau texte',
    pasteOriginalText: 'Collez le texte original ici...',
    pasteNewModifiedText: 'Collez le texte nouveau/modifié ici...',
    compareBtn: 'Comparer',
    added: 'ajoutés',
    removed: 'supprimés',
    unchanged: 'inchangés',

    // Password Generator
    generateSecurePasswords: 'Générez des mots de passe sécurisés avec des options personnalisées.',
    length: 'Longueur:',
    uppercaseAZ: 'Majuscules (A-Z)',
    lowerCaseAz: 'Minuscules (a-z)',
    numbers09: 'Chiffres (0-9)',
    symbols: 'Symboles (!@#$%...)',
    generatePassword: 'Générer le Mot de Passe',
    generatedPassword: 'Mot de Passe Généré:',
    regenerate: 'Régénérer',

    // Quick Notes
    writeAndAutoSaveNotes: 'Écrivez et enregistrez vos notes instantanément.',
    startTypingNotes:
      'Commencez à écrire vos notes ici... Elles seront enregistrées automatiquement dans le stockage local de votre navigateur.',
    saved: 'Enregistré',
    areYouSure: 'Êtes-vous sûr?',
    yesClear: 'Oui, effacer',
    cancel: 'Annuler',
  },
  de: {
    // Footer
    freeOnlineTools: 'Kostenlose Online-Tools — keine Registrierung, keine Werbung.',
    noSignupNoAds: '',
    languageLabel: 'Sprache',

    // Home
    yourTextToolsAllInOnePlace: 'Ihre Text-Tools, alles an einem Ort',
    homeSubtitle:
      'Leistungsstarke und einfache Text-Tools zur Steigerung Ihrer Produktivität. Zählen Sie Wörter, ändern Sie die Groß-/Kleinschreibung, vergleichen Sie Dokumente, erstellen Sie sichere Passwörter und speichern Sie Notizen. Komplett kostenlos, keine Registrierung erforderlich.',
    allTools: 'Alle',
    textTools: 'Text',
    compare: 'Vergleichen',
    utilities: 'Werkzeuge',

    // Tool labels
    wordCounter: 'Wörter Zähler',
    wordCounterDesc: 'Zählen Sie Wörter, Zeichen, Sätze und Absätze in Ihrem Text',
    textCaseConverter: 'Groß-/Kleinschreibung Konverter',
    textCaseConverterDesc: 'Konvertieren Sie Text zu Groß-, Klein-, Titel- oder Satzschreibung',
    diffChecker: 'Diff Prüfer',
    diffCheckerDesc: 'Vergleichen Sie zwei Texte und sehen Sie genau, was sich geändert hat',
    passwordGenerator: 'Passwort Generator',
    passwordGeneratorDesc: 'Erstellen Sie sichere Passwörter mit benutzerdefinierten Optionen',
    quickNotes: 'Schnelle Notizen',
    quickNotesDesc: 'Schreiben und speichern Sie Notizen sofort in Ihrem Browser',

    // Word Counter
    countWordsAndCharacters: 'Zählen Sie Wörter und Zeichen in Ihrem Text.',
    enterTextHere: 'Text hier eingeben...',
    clear: 'Löschen',
    results: 'Ergebnisse:',
    wordCountLabel: 'Wörter',
    characterCount: 'Zeichen',

    // Text Case Tool
    uppercaseAndLowercaseConverter: 'Groß-/Kleinschreibung Konverter',
    convertTextToUppercase: 'Konvertieren Sie Text zu Groß-, Klein- oder Kapitalisierung.',
    enterTextHereToConvert: 'Text hier eingeben zum Konvertieren...',
    pleaseEnterValidText: 'Bitte geben Sie gültigen Text ein.',
    uppercase: 'GROßBUCHSTABEN',
    lowercase: 'kleinbuchstaben',
    capitalize: 'Kapitalisieren',
    result: 'Ergebnis:',

    // Diff Checker
    compareTwoTexts: 'Vergleichen Sie zwei Texte und sehen Sie die Unterschiede.',
    originalText: 'Originaltext',
    newText: 'Neuer Text',
    pasteOriginalText: 'Originaltext hier einfügen...',
    pasteNewModifiedText: 'Neuen/geänderten Text hier einfügen...',
    compareBtn: 'Vergleichen',
    added: 'hinzugefügt',
    removed: 'entfernt',
    unchanged: 'unverändert',

    // Password Generator
    generateSecurePasswords: 'Erstellen Sie sichere Passwörter mit benutzerdefinierten Optionen.',
    length: 'Länge:',
    uppercaseAZ: 'Großbuchstaben (A-Z)',
    lowerCaseAz: 'Kleinbuchstaben (a-z)',
    numbers09: 'Zahlen (0-9)',
    symbols: 'Symbole (!@#$%...)',
    generatePassword: 'Passwort Generieren',
    generatedPassword: 'Generiertes Passwort:',
    regenerate: 'Erneut Generieren',

    // Quick Notes
    writeAndAutoSaveNotes: 'Schreiben und speichern Sie Ihre Notizen sofort.',
    startTypingNotes:
      'Beginnen Sie hier mit dem Schreiben Ihrer Notizen... Sie werden automatisch im lokalen Speicher Ihres Browsers gespeichert.',
    saved: 'Gespeichert',
    areYouSure: 'Sind Sie sicher?',
    yesClear: 'Ja, löschen',
    cancel: 'Abbrechen',
  },
  pt: {
    // Footer
    freeOnlineTools: 'Ferramentas online gratuitas — sem cadastro, sem anúncios.',
    noSignupNoAds: '',
    languageLabel: 'Idioma',

    // Home
    yourTextToolsAllInOnePlace: 'Suas ferramentas de texto, tudo em um só lugar',
    homeSubtitle:
      'Utilitários de texto poderosos e simples para impulsionar sua produtividade. Conte palavras, altere maiúsculas/minúsculas, compare documentos, gere senhas seguras e salve notas. Completamente grátis, sem registro necessário.',
    allTools: 'Todas',
    textTools: 'Texto',
    compare: 'Comparar',
    utilities: 'Utilitários',

    // Tool labels
    wordCounter: 'Contador de Palavras',
    wordCounterDesc: 'Conte palavras, caracteres, frases e parágrafos no seu texto',
    textCaseConverter: 'Conversor de Maiúsculas/Minúsculas',
    textCaseConverterDesc: 'Converta texto para maiúsculas, minúsculas, título ou frase',
    diffChecker: 'Comparador de Diferenças',
    diffCheckerDesc: 'Compare dois textos e veja exatamente o que mudou entre eles',
    passwordGenerator: 'Gerador de Senhas',
    passwordGeneratorDesc: 'Gere senhas seguras com opções personalizadas de comprimento e caracteres',
    quickNotes: 'Notas Rápidas',
    quickNotesDesc: 'Escreva e salve notas instantaneamente no armazenamento do seu navegador',

    // Word Counter
    countWordsAndCharacters: 'Conte palavras e caracteres no seu texto.',
    enterTextHere: 'Digite seu texto aqui...',
    clear: 'Limpar',
    results: 'Resultados:',
    wordCountLabel: 'Palavras',
    characterCount: 'Caracteres',

    // Text Case Tool
    uppercaseAndLowercaseConverter: 'Conversor de Maiúsculas/Minúsculas',
    convertTextToUppercase: 'Converta texto para maiúsculas, minúsculas ou capitalize.',
    enterTextHereToConvert: 'Digite o texto aqui para converter...',
    pleaseEnterValidText: 'Por favor, digite um texto válido.',
    uppercase: 'MAIÚSCULAS',
    lowercase: 'minúsculas',
    capitalize: 'Capitalizar',
    result: 'Resultado:',

    // Diff Checker
    compareTwoTexts: 'Compare dois textos e veja as diferenças.',
    originalText: 'Texto original',
    newText: 'Novo texto',
    pasteOriginalText: 'Cole o texto original aqui...',
    pasteNewModifiedText: 'Cole o texto novo/modificado aqui...',
    compareBtn: 'Comparar',
    added: 'adicionados',
    removed: 'removidos',
    unchanged: 'inalterados',

    // Password Generator
    generateSecurePasswords: 'Gere senhas seguras com opções personalizadas.',
    length: 'Comprimento:',
    uppercaseAZ: 'Maiúsculas (A-Z)',
    lowerCaseAz: 'Minúsculas (a-z)',
    numbers09: 'Números (0-9)',
    symbols: 'Símbolos (!@#$%...)',
    generatePassword: 'Gerar Senha',
    generatedPassword: 'Senha Gerada:',
    regenerate: 'Regenerar',

    // Quick Notes
    writeAndAutoSaveNotes: 'Escreva e salve suas notas instantaneamente.',
    startTypingNotes:
      'Comece a digitar suas notas aqui... Elas serão salvas automaticamente no armazenamento local do seu navegador.',
    saved: 'Salvo',
    areYouSure: 'Tem certeza?',
    yesClear: 'Sim, limpar',
    cancel: 'Cancelar',
  },
  it: {
    // Footer
    freeOnlineTools: 'Strumenti online gratuiti — senza registrazione, senza pubblicità.',
    noSignupNoAds: '',
    languageLabel: 'Lingua',

    // Home
    yourTextToolsAllInOnePlace: 'I tuoi strumenti di testo, tutto in un posto',
    homeSubtitle:
      'Utilità di testo potenti e semplici per aumentare la tua produttività. Conta parole, cambia maiuscole/minuscole, confronta documenti, genera password sicure e salva note. Completamente gratuito, nessuna registrazione richiesta.',
    allTools: 'Tutti',
    textTools: 'Testo',
    compare: 'Confronta',
    utilities: 'Utilità',

    // Tool labels
    wordCounter: 'Contatore Parole',
    wordCounterDesc: 'Conta parole, caratteri, frasi e paragrafi nel tuo testo',
    textCaseConverter: 'Convertitore Maiuscole/Minuscole',
    textCaseConverterDesc: 'Converti il testo in maiuscole, minuscole, titolo o frase',
    diffChecker: 'Controllo Differenze',
    diffCheckerDesc: 'Confronta due testi e vedi esattamente cosa è cambiato',
    passwordGenerator: 'Generatore Password',
    passwordGeneratorDesc: 'Genera password sicure con opzioni personalizzate di lunghezza e caratteri',
    quickNotes: 'Note Rapide',
    quickNotesDesc: 'Scrivi e salva note istantaneamente nel tuo browser',

    // Word Counter
    countWordsAndCharacters: 'Conta parole e caratteri nel tuo testo.',
    enterTextHere: 'Inserisci il testo qui...',
    clear: 'Cancella',
    results: 'Risultati:',
    wordCountLabel: 'Parole',
    characterCount: 'Caratteri',

    // Text Case Tool
    uppercaseAndLowercaseConverter: 'Convertitore Maiuscole/Minuscole',
    convertTextToUppercase: 'Converti il testo in maiuscole, minuscole o capitalizza.',
    enterTextHereToConvert: 'Inserisci il testo da convertire qui...',
    pleaseEnterValidText: 'Per favore, inserisci un testo valido.',
    uppercase: 'MAIUSCOLE',
    lowercase: 'minuscole',
    capitalize: 'Capitalizza',
    result: 'Risultato:',

    // Diff Checker
    compareTwoTexts: 'Confronta due testi e vedi le differenze.',
    originalText: 'Testo originale',
    newText: 'Nuovo testo',
    pasteOriginalText: 'Incolla il testo originale qui...',
    pasteNewModifiedText: 'Incolla il testo nuovo/modificato qui...',
    compareBtn: 'Confronta',
    added: 'aggiunti',
    removed: 'rimossi',
    unchanged: 'invariati',

    // Password Generator
    generateSecurePasswords: 'Genera password sicure con opzioni personalizzate.',
    length: 'Lunghezza:',
    uppercaseAZ: 'Maiuscole (A-Z)',
    lowerCaseAz: 'Minuscole (a-z)',
    numbers09: 'Numeri (0-9)',
    symbols: 'Simboli (!@#$%...)',
    generatePassword: 'Genera Password',
    generatedPassword: 'Password Generata:',
    regenerate: 'Rigenera',

    // Quick Notes
    writeAndAutoSaveNotes: 'Scrivi e salva le tue note istantaneamente.',
    startTypingNotes:
      'Inizia a scrivere le tue note qui... Verranno salvate automaticamente nel local storage del tuo browser.',
    saved: 'Salvato',
    areYouSure: 'Sei sicuro?',
    yesClear: 'Sì, cancella',
    cancel: 'Annulla',
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