import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router, provideRouter } from '@angular/router';
import { POCKLY_SEO_CONFIG, POCKLY_TRANSLATIONS } from '@pockly/shared';
import { App } from './app';
import { routes } from './app.routes';
import { landingSeoConfig } from './seo.config';
import { landingTranslations } from './translations';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter(routes),
        { provide: POCKLY_SEO_CONFIG, useValue: landingSeoConfig },
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

  it('should update core SEO tags for the home route', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    const document = TestBed.inject(DOCUMENT);

    await router.navigate(['/']);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(title.getTitle()).toBe('Pockly - Free Online Tools for Daily Productivity');
    expect(meta.getTag('name="description"')?.content).toContain('Free online tools');
    expect(meta.getTag('property="og:title"')?.content).toBe(
      'Pockly - Free Online Tools for Daily Productivity',
    );
    expect(meta.getTag('property="og:url"')?.content).toBe('https://pockly.vercel.app');
    expect(meta.getTag('name="twitter:card"')?.content).toBe('summary_large_image');
    expect(document.documentElement.lang).toBe('en');
    expect(
      (document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null)?.href,
    ).toBe('https://pockly.vercel.app/');
  });

  it('should mark the 404 route as noindex', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const meta = TestBed.inject(Meta);

    await router.navigate(['/404']);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(meta.getTag('name="robots"')?.content).toBe('noindex,nofollow');
  });
});
