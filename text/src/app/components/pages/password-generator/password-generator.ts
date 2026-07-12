import { Component, signal, computed, inject } from '@angular/core';
import { CopyButton, LanguageService, ToolContent } from '@pockly/shared';
import { TOOL_CONTENT } from '../../../config/tool-content';
import type { Translations } from '../../../translations';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faKey, faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [CopyButton, FaIconComponent, ToolContent],
  templateUrl: './password-generator.html',
  styleUrl: './password-generator.css',
})
export class PasswordGenerator {
  readonly faKey = faKey;
  readonly faSync = faSync;

  private languageService = inject(LanguageService);

  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  content = computed(() => TOOL_CONTENT[this.languageService.language()].passwordGenerator);

  length = signal(16);
  includeUppercase = signal(true);
  includeLowercase = signal(true);
  includeNumbers = signal(true);
  includeSymbols = signal(true);
  generatedPassword = signal('');

  private uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private numberChars = '0123456789';
  private symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  canGenerate = computed(() => this.includeUppercase() || this.includeLowercase() || this.includeNumbers() || this.includeSymbols());

  generate(): void {
    if (!this.canGenerate()) return;
    let charset = '';
    if (this.includeUppercase()) charset += this.uppercaseChars;
    if (this.includeLowercase()) charset += this.lowercaseChars;
    if (this.includeNumbers()) charset += this.numberChars;
    if (this.includeSymbols()) charset += this.symbolChars;
    let password = '';
    const array = new Uint32Array(this.length());
    crypto.getRandomValues(array);
    for (let i = 0; i < this.length(); i++) { password += charset[array[i] % charset.length]; }
    this.generatedPassword.set(password);
  }

  regenerate(): void { this.generate(); }
  copyToClipboard(): void { if (this.generatedPassword()) navigator.clipboard.writeText(this.generatedPassword()); }
}