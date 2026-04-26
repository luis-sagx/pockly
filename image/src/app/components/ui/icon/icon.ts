import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    @switch (name) {
      @case ('check') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      }
      @case ('x') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      }
      @case ('trash') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      }
      @case ('key') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m-3 3 2.5 2.5"></path></svg>
      }
      @case ('refresh') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 16h5v5"></path></svg>
      }
      @case ('diff') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"></path><path d="M8 21H3v-5"></path><path d="M21 3a9 9 0 0 0-9 9"></path><path d="M3 21a9 9 0 0 0 9-9"></path></svg>
      }
      @case ('alert') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
      }
      @case ('arrow-up') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
      }
      @case ('arrow-down') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
      }
      @case ('text') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
      }
      @case ('copy') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
      }
      @case ('type') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
      }
      @case ('hash') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>
      }
      @case ('git-compare') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><path d="M11 18H8a2 2 0 0 1-2-2V9"></path></svg>
      }
      @case ('file-text') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      }
      @case ('grid') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
      }
      @case ('github') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="currentColor"><path d="M15 22v-4a4.9 4.9 0 0 0-1-3.1c-1.6 0-3.1.8-4 2.1.3-.8.7-1.6 1.1-2.4-.4-.8-1.1-1.7-2-2.2-.7-.4-1.5-.7-2.4-.8-.8-.1-1.6-.1-2.4.1-.6-1.1-1.5-2-2.7-2.5-.9-.4-1.9-.5-2.8-.2-.8.2-1.5.7-2 1.3-.3.4-.5.8-.6 1.3-.1-.1-.2-.1-.3-.2-.5-.3-.3-.5-.1-.8.4-.6 1.2-1 2.1-1.1 1.3-.2 2.5.2 3.3 1 .5-.4 1.2-.6 1.9-.5.5.1 1 .3 1.4.6.3-.4.7-.7 1.2-.9 1.7-.6 3.9-.3 5.2 1 .2-.2.4-.5.6-.8-.3-.7-.3-1.4 0-2 .3-.5.8-.8 1.3-.9-.3-.5-.6-1-.6-1.6 0-1.6 1.3-2.9 2.9-2.9.5 0 1 .2 1.4.4 1.1-.5 2.3-.7 3.5-.5 1.2.2 2.3.8 3.1 1.7.2-.1.4-.2.6-.3-1.1-1.2-2.7-1.9-4.4-1.9z"></path></svg>
      }
      @case ('code') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
      }
      @case ('play') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
      }
      @case ('shuffle') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
      }
      @case ('download') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
      }
      @case ('plus') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
      }
      @case ('wand') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 4-1 1"></path><path d="m17 6-1 1"></path><path d="m3 20 7-7"></path><path d="m13.5 9.5 6 6"></path><path d="m9.5 6.5 6 6"></path><path d="m6 16-3 3"></path><path d="m6 6 3 3"></path><path d="M3 16a3 3 0 0 0 3 3"></path></svg>
      }
      @case ('external-link') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      }
      @case ('magic') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 4-1 1"></path><path d="m17 6-1 1"></path><path d="m3 20 7-7"></path><path d="m13.5 9.5 6 6"></path><path d="m9.5 6.5 6 6"></path><path d="m6 16-3 3"></path><path d="m6 6 3 3"></path><path d="M3 16a3 3 0 0 0 3 3"></path></svg>
      }
      @case ('file') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
      }
      @case ('settings') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
      }
      @case ('percent') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
      }
      @case ('dollar-sign') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      }
      @case ('ruler') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z"></path><path d="m7.5 10.5 2 2"></path><path d="m10.5 7.5 2 2"></path><path d="m13.5 4.5 2 2"></path><path d="m4.5 13.5 2 2"></path></svg>
      }
      @case ('qr-code') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 15h3"></path><path d="M12 12"></path></svg>
      }
      @case ('link') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
      }
      @case ('scissors') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><path d="M8.12 8.12 12 12"></path><path d="M20 4 8.88 8.88"></path><circle cx="6" cy="18" r="3"></circle><path d="M14.8 14.8 20 20"></path></svg>
      }
      @case ('maximize') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
      }
      @case ('repeat') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>
      }
      @case ('image') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
      }
      @case ('spinner') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      }
      @case ('move') {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"></polyline><polyline points="9 5 12 2 15 5"></polyline><polyline points="15 19 12 22 9 19"></polyline><polyline points="19 9 22 12 19 15"></polyline><line x1="2" y1="12" x2="22" y2="12"></line><line x1="12" y1="2" x2="12" y2="22"></line></svg>
      }
      @default {
        <svg xmlns="http://www.w3.org/2000/svg" [attr.class]="class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
      }
    }
  `,
})
export class IconComponent {
  @Input() name = '';
  @Input() class = 'w-4 h-4';
}