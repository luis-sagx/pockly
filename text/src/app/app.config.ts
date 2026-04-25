import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { routes } from './app.routes';

// Import individual icons
import {
  faFont,
  faHashtag,
  faCodeBranch,
  faKey,
  faFileLines,
  faArrowUpAZ,
  faArrowDownAZ,
} from '@fortawesome/free-solid-svg-icons';

// Register icons
const iconLibrary = new FaIconLibrary();
iconLibrary.addIcons(
  faFont,
  faHashtag,
  faCodeBranch,
  faKey,
  faFileLines,
  faArrowUpAZ,
  faArrowDownAZ,
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: FaIconLibrary,
      useValue: iconLibrary,
    },
  ]
};