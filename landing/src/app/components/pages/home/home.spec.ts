import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { POCKLY_SEO_CONFIG, POCKLY_TRANSLATIONS } from '@pockly/shared';
import { landingTranslations } from '../../../translations';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        { provide: POCKLY_SEO_CONFIG, useValue: { baseUrl: '', ogImage: '', pageConfigs: {} } },
        { provide: POCKLY_TRANSLATIONS, useValue: landingTranslations },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the six landing categories', () => {
    expect(component.featuredCategories.map((category) => category.key)).toEqual([
      'text',
      'productivity',
      'image',
      'json',
      'url',
      'calculator',
    ]);
  });

  it('should expose drawable svg paths for category icons', () => {
    const iconPath = component.getCategoryIcon('text');

    expect(iconPath).toContain('M');
    expect(iconPath).not.toContain('fa-');
  });
});
