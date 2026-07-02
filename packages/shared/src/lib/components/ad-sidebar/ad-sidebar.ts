import { Component, Input, OnInit, inject } from '@angular/core';
import { AdService } from '../../services/ad.service';

@Component({
  selector: 'app-ad-sidebar',
  standalone: true,
  templateUrl: './ad-sidebar.html',
})
export class AdSidebar implements OnInit {
  @Input({ required: true }) enabled = false;
  @Input({ required: true }) adClient = '';
  @Input({ required: true }) slot = '';
  @Input() height = 600;
  @Input() width = 300;
  @Input() placeholderLabel = 'Ad space';

  private readonly adService = inject(AdService);

  async ngOnInit(): Promise<void> {
    if (!this.enabled || !this.adClient || !this.slot) {
      return;
    }

    try {
      await this.adService.ensureScript(this.adClient);
      this.adService.pushAd();
    } catch {
      // Keep the reserved box visible even if the script fails to load.
    }
  }
}
