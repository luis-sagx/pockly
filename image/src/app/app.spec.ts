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
        { provide: POCKLY_TRANSLATIONS, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render nav', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-nav')).toBeTruthy();
  });
});
