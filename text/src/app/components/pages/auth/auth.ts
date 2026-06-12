import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { SupabaseService } from '../../../services/supabase.service';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterLink, FaIconComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  readonly faSignInAlt = faSignInAlt;
  readonly faUserPlus = faUserPlus;

  private supabaseService = inject(SupabaseService);
  private languageService = inject(LanguageService);
  private router = inject(Router);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  isSignUp = signal(false);

  email = signal('');
  password = signal('');
  username = signal('');

  error = signal('');
  success = signal('');
  loading = signal(false);

  ngOnInit(): void {
    if (this.supabaseService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  toggleMode(): void {
    this.isSignUp.update((v) => !v);
    this.error.set('');
    this.success.set('');
  }

  async submit(): Promise<void> {
    if (this.isSignUp()) {
      await this.handleSignUp();
    } else {
      await this.handleSignIn();
    }
  }

  private async handleSignIn(): Promise<void> {
    const e = this.email().trim();
    const p = this.password();

    if (!e || !p) {
      this.error.set(this.t().fillAllFields);
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const { error } = await this.supabaseService.signInWithPassword(e, p);

    this.loading.set(false);

    if (error) {
      this.error.set(this.t().invalidCredentials);
    } else {
      this.router.navigate(['/quick-notes']);
    }
  }

  private async handleSignUp(): Promise<void> {
    const u = this.username().trim();
    const e = this.email().trim();
    const p = this.password();

    if (!u || !e || !p) {
      this.error.set(this.t().fillAllFields);
      return;
    }

    if (u.length < 2 || u.length > 30) {
      this.error.set(this.t().usernameLength);
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(u)) {
      this.error.set(this.t().usernameChars);
      return;
    }

    if (p.length < 8) {
      this.error.set(this.t().passwordLength);
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const { error, needsConfirmation } = await this.supabaseService.signUp(e, p, u);

    this.loading.set(false);

    if (error) {
      if (error.message.includes('already registered')) {
        this.error.set(this.t().accountExists);
      } else {
        this.error.set(this.t().invalidCredentials);
      }
      return;
    }

    if (needsConfirmation) {
      // Email confirmation is required
      this.success.set(this.t().checkEmail);
      this.isSignUp.set(false);
      this.password.set('');
    } else {
      // Email confirmation is disabled — auto logged in
      this.router.navigate(['/quick-notes']);
    }
  }

  async onGoogleSignIn(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.supabaseService.signInWithGoogle();
    } catch {
      this.error.set(this.t().googleNotConfigured);
    } finally {
      this.loading.set(false);
    }
  }
}
