import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { POCKLY_TRANSLATIONS } from '@pockly/shared';
import { landingTranslations } from '../../../translations';

import { Nav } from './nav';

describe('Nav', () => {
  let component: Nav;
  let fixture: ComponentFixture<Nav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav],
      providers: [
        provideRouter([]),
        { provide: POCKLY_TRANSLATIONS, useValue: landingTranslations },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Nav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
