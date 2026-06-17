import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { POCKLY_SEO_CONFIG, POCKLY_TRANSLATIONS } from '@pockly/shared';

import { routes } from './app.routes';
import { productivitySeoConfig } from './seo.config';
import { productivityTranslations } from './translations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode() }),
    { provide: POCKLY_SEO_CONFIG, useValue: productivitySeoConfig },
    { provide: POCKLY_TRANSLATIONS, useValue: productivityTranslations },
  ],
};
