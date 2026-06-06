import { Component, EventEmitter, Output, inject, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../services/supabase.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.css',
})
export class AuthModal {
  @Output() closed = new EventEmitter<void>();

  private supabaseService = inject(SupabaseService);
  private languageService = inject(LanguageService);
  t = computed(() => this.languageService.getTranslations());

  email = signal('');
  sent = signal(false);
  error = signal('');
  loading = signal(false);

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  async signInWithGoogle(): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await this.supabaseService.signInWithGoogle();
    } catch (e: any) {
      this.error.set(e.message || 'Failed to sign in');
    } finally {
      this.loading.set(false);
    }
  }

  async signInWithEmail(): Promise<void> {
    const emailValue = this.email().trim();
    if (!emailValue) return;

    this.loading.set(true);
    this.error.set('');
    try {
      const { error } = await this.supabaseService.signInWithMagicLink(emailValue);
      if (error) {
        this.error.set(error.message);
      } else {
        this.sent.set(true);
      }
    } catch (e: any) {
      this.error.set(e.message || 'Failed to send magic link');
    } finally {
      this.loading.set(false);
    }
  }
}
