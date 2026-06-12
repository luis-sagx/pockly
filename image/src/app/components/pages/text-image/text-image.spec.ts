import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POCKLY_TRANSLATIONS } from '@pockly/shared';

import { TextImage } from './text-image';

describe('TextImage', () => {
  let component: TextImage;
  let fixture: ComponentFixture<TextImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextImage],
      providers: [{ provide: POCKLY_TRANSLATIONS, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TextImage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
