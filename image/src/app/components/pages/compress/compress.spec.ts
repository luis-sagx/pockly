import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POCKLY_TRANSLATIONS } from '@pockly/shared';

import { Compress } from './compress';

describe('Compress', () => {
  let component: Compress;
  let fixture: ComponentFixture<Compress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compress],
      providers: [{ provide: POCKLY_TRANSLATIONS, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(Compress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
