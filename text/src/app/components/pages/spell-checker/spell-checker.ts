import { Component, signal, computed, inject, OnDestroy } from '@angular/core';
import { InputBox } from '../../ui/input-box/input-box';
import { LanguageService, Language } from '../../../services/language.service';
import { CommonModule } from '@angular/common';

interface SpellingError {
  word: string;
  index: number;
  suggestions: string[];
}

interface SpellCheckerInstance {
  correct: (word: string) => boolean;
  suggest: (word: string) => string[];
}

// Common typo corrections for Spanish
const SPANISH_TYPOS: Record<string, string[]> = {
  // h omitted
  'gola': ['hola'],
  'golas': ['holas'],
  'aber': ['a ver'],
  'ablar': ['hablar'],
  'ace': ['has'],
  'acer': ['hacer'],
  'acion': ['acción'],
  'aher': ['a', 'hay', 'ayer'],
  'ahorra': ['ahora'],
  'agusto': ['a gusto'],
  
  // Common misspellings - está/están
  'esyan': ['están', 'está'],
  'esyanmos': ['estamos'],
  'estan': ['están'],
  'estamo': ['estamos'],
  'estmos': ['estamos'],
  
  // yo/estoy errors
  'to': ['yo'],
  'toy': ['estoy'],
  'estoh': ['estoy'],
  'estohay': ['estoy'],
  'estoi': ['estoy'],
  'estooy': ['estoy'],
  'estohy': ['estoy'],
  'eesou': ['estoy'],
  
  // todos errors - PRIORITIZE correct spelling
  'tofos': ['todos'],
  'toodos': ['todos'],
  'todoos': ['todos'],
  'todoss': ['todos'],
  'tod': ['todo'],
  'tood': ['todos'],
  'toodss': ['todos'],
  'todos': ['todos'],
  
  // bien errors
  'vien': ['bien'],
  'vienn': ['bien'],
  'biem': ['bien'],
  'been': ['bien'],
  'ben': ['bien'],
  'biin': ['bien'],
  
  // muy errors
  'muuy': ['muy'],
  'muyy': ['muy'],
  'muy': ['muy'],
  
  // amigos errors
  'amifos': ['amigos'],
  'amigos': ['amigos'],
  'amigo': ['amigo'],
  'amiga': ['amiga'],
  'amifoo': ['amigo'],
  
  // Common words
  'pingino': ['pingüino'],
  'habia': ['había'],
  'seria': ['sería'],
  'estaria': ['estaría'],
  'podia': ['podía'],
  'tendra': ['tendrá'],
  'hizo': ['hizo'],
  'izo': ['hizo'],
  'echo': ['hecho'],
  'bisto': ['visto'],
  'baya': ['vaya'],
  'bemos': ['vemos'],
  'ber': ['ver'],
  'bida': ['vida'],
  'bao': ['voy'],
  'sierta': ['cierta'],
  
  // Slang/informal
  'tbn': ['también'],
  'tb': ['también'],
  'xq': ['porque'],
  'pq': ['porque'],
  'ke': ['que'],
  'k': ['que'],
  'dl': ['del'],
  'cta': ['cuenta'],
  'grasis': ['gracias'],
  'ok': ['okay'],
};

function getSpanishPhoneticKey(word: string): string {
  // Simple phonetic mapping for Spanish
  return word
    .toLowerCase()
    .replace(/b|v/g, 'b')
    .replace(/c|z|s/g, 's')
    .replace(/g|j/g, 'j')
    .replace(/h/g, '')
    .replace(/qu/g, 'k')
    .replace(/ll/g, 'y')
    .replace(/ñ/g, 'n')
    .replace(/á|é|í|ó|ú|ü/g, '');
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

  private spellChecker: SpellCheckerInstance | null = null;
  private loadedLanguages = new Set<SpellLanguage>();

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

    if (!this.loadedLanguages.has(lang)) {
      await this.loadDictionary(lang);
    }
  }

  private async loadDictionary(lang: SpellLanguage): Promise<void> {
    this.isLoadingDictionary.set(true);
    this.dictionaryError.set(null);

    try {
      const dict = DICTIONARY_MAP[lang];

      const [affResponse, dicResponse] = await Promise.all([
        fetch(`${CDN_BASE}/${dict.pkg}/index.aff`),
        fetch(`${CDN_BASE}/${dict.pkg}/index.dic`),
      ]);

      if (!affResponse.ok || !dicResponse.ok) {
        console.error('Failed to load dictionary:', affResponse.status, dicResponse.status);
        throw new Error(`Failed to load dictionary for ${lang}`);
      }

      const [affContent, dicContent] = await Promise.all([
        affResponse.text(),
        dicResponse.text(),
      ]);

      console.log('Loaded dictionary for', lang, 'aff size:', affContent.length, 'dic size:', dicContent.length);

      // Simple dictionary-based spell checking
      // Parse the .dic file to build a word set
      const words = new Set<string>();
      const lines = dicContent.split('\n');
      
      // Skip first line (word count) and parse the rest
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Format: word or word/flags (tab separated)
        const tabIndex = line.indexOf('\t');
        let word: string;
        
        if (tabIndex >= 0) {
          word = line.substring(0, tabIndex).trim();
        } else {
          // Check for slash-based flags
          const slashIndex = line.indexOf('/');
          word = slashIndex >= 0 ? line.substring(0, slashIndex).trim() : line.trim();
        }
        
        if (word && word.length > 1 && /^[a-zA-ZáéíóúñÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛãõäëïöüßç]+$/.test(word)) {
          words.add(word.toLowerCase());
        }
      }

      console.log('Parsed', words.size, 'words for', lang);

      // Get phonetic key for each word in dictionary
      const wordsByPhonetic = new Map<string, string[]>();
      for (const word of words) {
        const key = getSpanishPhoneticKey(word);
        if (!wordsByPhonetic.has(key)) {
          wordsByPhonetic.set(key, []);
        }
        wordsByPhonetic.get(key)!.push(word);
      }

      // Simple spell checker implementation
      this.spellChecker = {
        correct: (word: string) => {
          const lower = word.toLowerCase();
          return words.has(lower) || lower.length <= 1;
        },
        suggest: (word: string) => {
          const lower = word.toLowerCase();
          const suggestions: string[] = [];

          // First check common Spanish typos
          if (SPANISH_TYPOS[lower]) {
            for (const suggestion of SPANISH_TYPOS[lower]) {
              if (!suggestions.includes(suggestion)) {
                suggestions.push(suggestion);
              }
            }
          }

          // Then find words with same phonetic key
          const phoneticKey = getSpanishPhoneticKey(lower);
          const phoneticMatches = wordsByPhonetic.get(phoneticKey);
          if (phoneticMatches) {
            for (const match of phoneticMatches) {
              if (!suggestions.includes(match) && suggestions.length < 5) {
                suggestions.push(match);
              }
            }
          }

          // Finally try Levenshtein distance - but prioritize by similarity
          if (suggestions.length < 5) {
            // Calculate distance for all matching words and sort by similarity
            const matches: { word: string; distance: number }[] = [];
            for (const dictWord of words) {
              const distance = this.getLevenshteinDistance(lower, dictWord);
              if (distance <= 2) {
                // Prioritize words with similar length
                const lengthDiff = Math.abs(dictWord.length - lower.length);
                const score = distance * 10 + lengthDiff;
                matches.push({ word: dictWord, distance: score });
              }
            }
            
            // Sort by score (lower is better)
            matches.sort((a, b) => a.distance - b.distance);
            
            for (const match of matches) {
              if (!suggestions.includes(match.word)) {
                suggestions.push(match.word);
              }
              if (suggestions.length >= 5) break;
            }
          }

          return suggestions;
        },
      };

      this.loadedLanguages.add(lang);
    } catch (error) {
      this.dictionaryError.set(this.t().dictionaryLoadError);
      console.error('Failed to load dictionary:', error);
    } finally {
      this.isLoadingDictionary.set(false);
    }
  }

  private getLevenshteinDistance(a: string, b: string): number {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  async checkSpelling() {
    if (!this.spellChecker && !this.loadedLanguages.has(this.selectedLanguage())) {
      await this.loadDictionary(this.selectedLanguage());
    }

    if (!this.spellChecker) {
      return;
    }

    this.isChecking.set(true);

    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));

    const text = this.inputText();
    const foundErrors: SpellingError[] = [];

    // Split text into words - ignore proper nouns (start with uppercase)
    const wordRegex = /[a-zA-ZáéíóúñÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛãõäëïöüßç]+/g;
    let match;

    while ((match = wordRegex.exec(text)) !== null) {
      const word = match[0];
      const index = match.index;

      // Skip words starting with uppercase (proper nouns like YouTube)
      if (word[0] === word[0].toUpperCase() && word[1] === word[1].toLowerCase()) {
        continue;
      }

      // Allow 2-letter words for common typos like "to" (should be "yo")
      if (word.length < 2 && word !== 'to') continue;

      if (!this.spellChecker!.correct(word)) {
        const suggestions = this.spellChecker!.suggest(word);
        foundErrors.push({ word, index, suggestions });
      }
    }

    this.errors.set(foundErrors);

    // Don't auto-generate corrected text - let user click to replace
    this.correctedText.set('');

    this.isChecking.set(false);
    this.hasChecked.set(true);
  }

  replaceWord(error: SpellingError, suggestion: string) {
    const text = this.inputText();
    const newText = text.substring(0, error.index) +
      suggestion +
      text.substring(error.index + error.word.length);

    this.inputText.set(newText);

    // Re-check after replacement
    this.checkSpelling();
  }

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
  }

  copyResult() {
    if (this.correctedText()) {
      navigator.clipboard.writeText(this.correctedText());
    } else if (this.inputText()) {
      navigator.clipboard.writeText(this.inputText());
    }
  }

  ngOnDestroy() {
    this.spellChecker = null;
  }
}