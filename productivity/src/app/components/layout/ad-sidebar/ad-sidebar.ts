import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AD_CONFIG } from '../../../config/ad.config';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

@Component({
  selector: 'app-ad-sidebar',
  standalone: true,
  templateUrl: './ad-sidebar.html',
})
export class AdSidebar implements OnInit {
  readonly enabled = AD_CONFIG.enabled;
  readonly adClient = AD_CONFIG.adClient;
  readonly slot = AD_CONFIG.slots.sidebar;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (this.enabled && isPlatformBrowser(this.platformId)) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense script not loaded yet; ignore.
      }
    }
  }
}
