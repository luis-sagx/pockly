import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { POCKLY_TRANSLATIONS } from '@pockly/shared';
import { Crop } from './crop';

describe('Crop', () => {
  let component: Crop;
  let fixture: ComponentFixture<Crop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Crop],
      providers: [{ provide: POCKLY_TRANSLATIONS, useValue: {} }],
    }).compileComponents();

    TestBed.inject(FaIconLibrary);
    fixture = TestBed.createComponent(Crop);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show drop zone when no image is loaded', () => {
    component.originalSrc.set('');
    fixture.detectChanges();
    const dropZone = fixture.nativeElement.querySelector('app-drop-zone');
    expect(dropZone).toBeTruthy();
  });

  it('should hide drop zone and show cropper area when image is loaded', () => {
    component.originalSrc.set('data:image/png;base64,fake');
    fixture.detectChanges();
    const dropZone = fixture.nativeElement.querySelector('app-drop-zone');
    expect(dropZone).toBeFalsy();
  });

  it('should clear state when clear() is called', () => {
    component.originalSrc.set('blob:test');
    component.originalFileName.set('test.png');
    component.width.set(100);
    component.height.set(100);
    component.x.set(10);
    component.y.set(10);

    component.clear();

    expect(component.originalSrc()).toBe('');
    expect(component.originalFileName()).toBe('');
    expect(component.width()).toBe(0);
    expect(component.height()).toBe(0);
    expect(component.x()).toBe(0);
    expect(component.y()).toBe(0);
  });

  it('should update dimension signals from option input', () => {
    component.onOptionInput(200, 'width');
    expect(component.width()).toBe(200);

    component.onOptionInput(150, 'height');
    expect(component.height()).toBe(150);

    component.onOptionInput(50, 'x');
    expect(component.x()).toBe(50);

    component.onOptionInput(75, 'y');
    expect(component.y()).toBe(75);
  });

  it('should ignore NaN values in option input', () => {
    component.width.set(100);
    component.onOptionInput(NaN, 'width');
    expect(component.width()).toBe(100);
  });

  it('should set originalSrc and fileName when file is selected', () => {
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });
    component.onFileSelected([file]);
    expect(component.originalSrc()).toBeTruthy();
    expect(component.originalFileName()).toBe('test.png');
  });
});
