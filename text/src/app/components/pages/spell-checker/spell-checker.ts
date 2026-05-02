import { Component, signal, computed, inject, OnDestroy } from '@angular/core';
import { InputBox } from '../../ui/input-box/input-box';
import { LanguageService } from '../../../services/language.service';
import { CommonModule } from '@angular/common';

interface SpellingError {
  word: string;
  index: number;
  suggestions: string[];
}

type SpellLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it';

const DICTIONARY_MAP: Record<SpellLanguage, { pkg: string; name: string }> = {
  en: { pkg: 'dictionary-en', name: 'English' },
  es: { pkg: 'dictionary-es', name: 'Español' },
  fr: { pkg: 'dictionary-fr', name: 'Français' },
  de: { pkg: 'dictionary-de', name: 'Deutsch' },
  pt: { pkg: 'dictionary-pt', name: 'Português' },
  it: { pkg: 'dictionary-it', name: 'Italiano' },
};

const CDN_BASE = 'https://cdn.jsdelivr.net/npm';

// nspell will be dynamically imported
type NSpellInstance = {
  correct: (word: string) => boolean;
  suggest: (word: string) => string[];
};

@Component({
  selector: 'app-spell-checker',
  standalone: true,
  imports: [InputBox, CommonModule],
  templateUrl: './spell-checker.html',
  styleUrl: './spell-checker.css',
})
export class SpellChecker implements OnDestroy {
  private languageService = inject(LanguageService);

  inputText = signal('');
  selectedLanguage = signal<SpellLanguage>('en');
  isChecking = signal(false);
  isLoadingDictionary = signal(false);
  dictionaryError = signal<string | null>(null);
  errors = signal<SpellingError[]>([]);
  correctedText = signal('');
  hasChecked = signal(false);

  // Pila de historial para undo - permite múltiples undos
  private historyStack: string[] = [];
  // Signal para trackear si hay undo disponible (público para el template)
  canUndo = signal(false);
  // Signal para archivo cargado
  fileName = signal<string | null>(null);

  private spellChecker: NSpellInstance | null = null;
  private loadedLanguages = new Map<SpellLanguage, NSpellInstance>();

  t = computed(() => this.languageService.getTranslations());

  availableLanguages: { code: SpellLanguage; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
  ];

  async onLanguageChange(lang: SpellLanguage) {
    this.selectedLanguage.set(lang);
    this.errors.set([]);
    this.correctedText.set('');
    this.dictionaryError.set(null);
    this.hasChecked.set(false);

    if (this.loadedLanguages.has(lang)) {
      this.spellChecker = this.loadedLanguages.get(lang)!;
    } else {
      await this.loadDictionary(lang);
    }
  }

  private async loadDictionary(lang: SpellLanguage): Promise<void> {
    this.isLoadingDictionary.set(true);
    this.dictionaryError.set(null);

    try {
      const dict = DICTIONARY_MAP[lang];

      // Load nspell dynamically (add to your package.json: "nspell": "^2.1.5")
      const nspell = await import('nspell');

      const [affResponse, dicResponse] = await Promise.all([
        fetch(`${CDN_BASE}/${dict.pkg}/index.aff`),
        fetch(`${CDN_BASE}/${dict.pkg}/index.dic`),
      ]);

      if (!affResponse.ok || !dicResponse.ok) {
        throw new Error(`Failed to load dictionary for ${lang}`);
      }

      const [affContent, dicContent] = await Promise.all([affResponse.text(), dicResponse.text()]);

      // nspell handles affix rules, morphological variants, and smart suggestions
      const checker: NSpellInstance = nspell.default({ aff: affContent, dic: dicContent });

      this.loadedLanguages.set(lang, checker);
      this.spellChecker = checker;

      console.log(`nspell dictionary loaded for ${lang}`);
    } catch (error) {
      console.error('Failed to load dictionary:', error);
      this.dictionaryError.set(this.t().dictionaryLoadError);
    } finally {
      this.isLoadingDictionary.set(false);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.fileName.set(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      this.inputText.set(content);
      this.checkSpelling();
    };
    reader.readAsText(file);
  }

  async checkSpelling() {
    if (!this.spellChecker) {
      const lang = this.selectedLanguage();
      if (!this.loadedLanguages.has(lang)) {
        await this.loadDictionary(lang);
      } else {
        this.spellChecker = this.loadedLanguages.get(lang)!;
      }
    }

    if (!this.spellChecker) return;

    this.isChecking.set(true);
    await new Promise((resolve) => setTimeout(resolve, 50));

    const text = this.inputText();
    const foundErrors: SpellingError[] = [];

    // Match words including accented characters
    const wordRegex = /[a-zA-ZáéíóúñÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛãõäëïöüßçÇ]+/g;
    let match;

    while ((match = wordRegex.exec(text)) !== null) {
      const word = match[0];
      const index = match.index;

      // Skip short words (1 char)
      if (word.length < 2) continue;

      // Skip proper nouns (starts uppercase, rest lowercase) — e.g. "London", "YouTube"
      if (/^[A-ZÁÉÍÓÚ][a-záéíóúñ]/.test(word)) continue;

      if (!this.spellChecker.correct(word)) {
        // nspell.suggest() uses Hunspell affix rules for high-quality suggestions
        const suggestions = this.spellChecker.suggest(word);
        foundErrors.push({ word, index, suggestions });
      }
    }

    this.errors.set(foundErrors);
    this.correctedText.set('');
    this.isChecking.set(false);
    this.hasChecked.set(true);
  }

  replaceWord(error: SpellingError, suggestion: string) {
    const text = this.inputText();

    // Guardar estado actual en la pila de historial ANTES de hacer el cambio
    this.historyStack.push(text);
    this.canUndo.set(true);

    const newText =
      text.substring(0, error.index) + suggestion + text.substring(error.index + error.word.length);

    this.inputText.set(newText);
    this.checkSpelling();
  }

  undo() {
    if (this.historyStack.length > 0) {
      const previousText = this.historyStack.pop()!;
      this.inputText.set(previousText);
      this.canUndo.set(this.historyStack.length > 0);
      this.checkSpelling();
    }
  }

  // OLD: computed para saber si hay algo que deshacer

  applyCorrection() {
    if (this.correctedText()) {
      this.inputText.set(this.correctedText());
      this.errors.set([]);
      this.correctedText.set('');
    }
  }

  clear() {
    this.inputText.set('');
    this.errors.set([]);
    this.correctedText.set('');
    this.hasChecked.set(false);
    this.historyStack = [];
    this.canUndo.set(false);
    this.fileName.set(null);
  }

  copyResult() {
    const text = this.correctedText() || this.inputText();
    if (text) navigator.clipboard.writeText(text);
  }

  ngOnDestroy() {
    this.spellChecker = null;
  }
}
