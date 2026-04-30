import { Component, Input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faWandMagicSparkles,
  faCopy,
  faShuffle,
  faGear,
  faTrash,
  faPlus,
  faPlay,
  faDownload,
  faXmark,
  faTriangleExclamation,
  faCheck,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [FaIconComponent],
  template: `
    <fa-icon 
      [icon]="icon" 
      [class]="className"
      [size]="size"
    ></fa-icon>
  `,
  styles: []
})
export class IconComponent {
  @Input() name: string = 'code';
  @Input() className: string = '';
  @Input() size: 'xs' | 'sm' | 'lg' | 'xl' | '1x' | '2x' | '3x' | '4x' | '5x' | '6x' | '7x' | '8x' | '9x' | '10x' = '1x';

  private iconMap: Record<string, IconDefinition> = {
    'code': faCode,
    'wand': faWandMagicSparkles,
    'copy': faCopy,
    'shuffle': faShuffle,
    'settings': faGear,
    'github': faCode, // fallback
    'trash': faTrash,
    'plus': faPlus,
    'play': faPlay,
    'download': faDownload,
    'x': faXmark,
    'alert': faTriangleExclamation,
    'check': faCheck,
    'grid': faLayerGroup,
  };

  get icon(): IconDefinition {
    return this.iconMap[this.name] || faCode;
  }
}