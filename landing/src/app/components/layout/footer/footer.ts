import { Component } from '@angular/core';
import { PROJECT_CATEGORIES } from '../../../config/projects';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  categories = PROJECT_CATEGORIES;
}
