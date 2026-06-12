import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POCKLY_TRANSLATIONS } from '@pockly/shared';
import { landingTranslations } from '../../../translations';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [{ provide: POCKLY_TRANSLATIONS, useValue: landingTranslations }],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose all project categories', () => {
    expect(component.categories.map((category) => category.key)).toEqual([
      'json',
      'text',
      'image',
      'calculator',
      'url',
    ]);
  });
});
