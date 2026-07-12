import { Component, Input } from '@angular/core';

export interface ToolFaq {
  q: string;
  a: string;
}

export interface ToolContentBlock {
  aboutTitle: string;
  about: string[];
  howTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: ToolFaq[];
}

@Component({
  selector: 'app-tool-content',
  standalone: true,
  templateUrl: './tool-content.html',
})
export class ToolContent {
  @Input({ required: true }) content!: ToolContentBlock;
}
