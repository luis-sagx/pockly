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
  styles: [
    `
      details > summary {
        list-style: none;
      }
      details > summary::-webkit-details-marker {
        display: none;
      }
      .tc-plus {
        transition: transform 0.2s ease;
      }
      details[open] > summary .tc-plus {
        transform: rotate(45deg);
      }
    `,
  ],
})
export class ToolContent {
  @Input({ required: true }) content!: ToolContentBlock;
}
