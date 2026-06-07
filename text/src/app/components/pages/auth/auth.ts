import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  private supabaseService = inject(SupabaseService);
  private languageService = inject(LanguageService);
  private router = inject(Router);
  t = computed(() => this.languageService.getTranslations());

  isSignUp = signal(false);

  // Shared fields
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
      this.error.set('Please fill in all fields.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const { error } = await this.supabaseService.signInWithPassword(e, p);

    this.loading.set(false);

    if (error) {
      this.error.set('Invalid email or password.');
    } else {
      this.router.navigate(['/quick-notes']);
    }
  }

  private async handleSignUp(): Promise<void> {
    const u = this.username().trim();
    const e = this.email().trim();
    const p = this.password();

    if (!u || !e || !p) {
      this.error.set('Please fill in all fields.');
      return;
    }

    if (u.length < 2 || u.length > 30) {
      this.error.set('Username must be between 2 and 30 characters.');
      return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(u)) {
      this.error.set('Username can only contain letters, numbers, hyphens and underscores.');
      return;
    }

    if (p.length < 8) {
      this.error.set('Password must be at least 8 characters.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.success.set('');

    const { error } = await this.supabaseService.signUp(e, p, u);

    this.loading.set(false);

    if (error) {
      if (error.message.includes('already registered')) {
        this.error.set('An account with this email already exists.');
      } else {
        this.error.set('Could not create account. Please try again.');
      }
    } else {
      this.success.set('Account created! Check your email to confirm, or sign in now.');
      this.isSignUp.set(false);
      this.password.set('');
    }
  }

  async onGoogleSignIn(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.supabaseService.signInWithGoogle();
    } catch {
      this.error.set('Google sign in is not configured. Enable it in the Supabase dashboard.');
    } finally {
      this.loading.set(false);
    }
  }
}
