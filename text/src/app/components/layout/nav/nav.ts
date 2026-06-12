import { Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LanguageService } from '@pockly/shared';
import type { Translations } from '../../../translations';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private languageService = inject(LanguageService);
  private supabaseService = inject(SupabaseService);
  t = computed(() => this.languageService.getTranslations() as unknown as Translations);

  // Auth
  isLoggedIn = this.supabaseService.isLoggedIn;
  displayName = this.supabaseService.displayName;

  // Estado del menú móvil
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  signOut(): void {
    this.supabaseService.signOut();
  }
}
