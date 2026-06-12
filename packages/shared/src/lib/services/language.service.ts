// TODO: Extract canonical LanguageService. Per-app translation
// dictionaries to be loaded via lazy per-locale JSON files.
// Currently duplicated across all 6 apps (343–523 lines each) with per-app
// translation keys that have drifted. Consolidation requires:
// 1. Extract shared translation keys (nav, footer, copy-button, common)
// 2. Per-app translation keys stay in app-specific providers
// 3. Split dictionaries into en.json, es.json, etc. for lazy loading
// Pending as part of P2-3 workspace dedup.
export class LanguageService {}
