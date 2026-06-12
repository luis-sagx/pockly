import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { POCKLY_SEO_CONFIG, POCKLY_TRANSLATIONS, LanguageService } from '@pockly/shared';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        LanguageService,
        { provide: POCKLY_SEO_CONFIG, useValue: { baseUrl: '', ogImage: '', pageConfigs: {} } },
        { provide: POCKLY_TRANSLATIONS, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-nav')).toBeTruthy();
  });
});
