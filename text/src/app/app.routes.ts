import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { TextCaseTool } from './components/pages/text-case-tool/text-case-tool';
import { WordCount } from './components/pages/word-count/word-count';
import { DiffChecker } from './components/pages/diff-checker/diff-checker';
import { PasswordGenerator } from './components/pages/password-generator/password-generator';
import { QuickNotes } from './components/pages/quick-notes/quick-notes';
import { SpellChecker } from './components/pages/spell-checker/spell-checker';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'text-case', component: TextCaseTool },
  { path: 'word-count', component: WordCount },
  { path: 'diff-checker', component: DiffChecker },
  { path: 'password-generator', component: PasswordGenerator },
  { path: 'quick-notes', component: QuickNotes },
  { path: 'spell-checker', component: SpellChecker },
  { path: '**', redirectTo: '/' },
];