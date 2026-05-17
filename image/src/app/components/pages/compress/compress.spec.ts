import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compress } from './compress';

describe('Compress', () => {
  let component: Compress;
  let fixture: ComponentFixture<Compress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compress],
    }).compileComponents();

    fixture = TestBed.createComponent(Compress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
