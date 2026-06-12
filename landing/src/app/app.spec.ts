import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { POCKLY_SEO_CONFIG, POCKLY_TRANSLATIONS } from '@pockly/shared';
import { App } from './app';
import { Home } from './components/pages/home/home';
import { landingTranslations } from './translations';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([{ path: '', component: Home }]),
        { provide: POCKLY_SEO_CONFIG, useValue: { baseUrl: '', ogImage: '', pageConfigs: {} } },
        { provide: POCKLY_TRANSLATIONS, useValue: landingTranslations },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render launcher hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigate(['/']);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('All your tools in one place');
  });
});
