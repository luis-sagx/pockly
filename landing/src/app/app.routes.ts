import { Routes } from '@angular/router';
import { Home } from './components/pages/home/home';
import { WordCount } from './components/pages/word-count/word-count';
import { TextCaseTool } from './components/pages/text-case-tool/text-case-tool';
import { DiffChecker } from './components/pages/diff-checker/diff-checker';
import { PasswordGenerator } from './components/pages/password-generator/password-generator';
import { QuickNotes } from './components/pages/quick-notes/quick-notes';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'word-count',
    component: WordCount,
  },
  {
    path: 'text-case',
    component: TextCaseTool,
  },
  {
    path: 'diff-checker',
    component: DiffChecker,
  },
  {
    path: 'password-generator',
    component: PasswordGenerator,
  },
  {
    path: 'quick-notes',
    component: QuickNotes,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];