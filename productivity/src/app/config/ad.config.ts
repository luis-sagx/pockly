// Ad configuration. Flip `enabled` to true once you have an approved
// ad account and have filled in the IDs below. While disabled, the
// sidebar renders a neutral "Ad space" placeholder so the layout is
// visible and testable without loading any third-party scripts.
export const AD_CONFIG = {
  enabled: false,
  // Google AdSense publisher id, e.g. 'ca-pub-1234567890123456'
  adClient: 'ca-pub-XXXXXXXXXXXXXXXX',
  slots: {
    // Ad unit id for the tool-page sidebar (300x600 recommended)
    sidebar: 'XXXXXXXXXX',
  },
};
