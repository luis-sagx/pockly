import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { POCKLY_SEO_CONFIG, POCKLY_TRANSLATIONS } from '@pockly/shared';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: POCKLY_SEO_CONFIG, useValue: { baseUrl: '', ogImage: '', pageConfigs: {} } },
        { provide: POCKLY_TRANSLATIONS, useValue: { en: {}, es: {} } },
      ],
    }).compileComponents();
  });

  it('creates the app shell', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
