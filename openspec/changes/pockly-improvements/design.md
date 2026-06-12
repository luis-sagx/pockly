# Design: pockly-improvements

## Technical Approach

Per-app, priority-ordered fixes (P0→P1→P2). P0 is pure deletion and SEO correction; P1 is routing/bundling/fonts/bugfixes; P2 is structural planning only. All 6 apps remain Angular standalone components. Baseline `pnpm build` per app before changes; rebuild after each priority tier to verify main.js under 500 kB.

## Architecture Decisions

| Decision | Options | Choice | Rationale |
|----------|---------|--------|-----------|
| FA icon migration | Remove CDN + migrate all to `<fa-icon>`, or inline SVGs everywhere | `<fa-icon>` for multi-icon apps; inline SVG for landing (1 icon) | `<fa-icon>` is already imported in all 5 tool apps. Landing only has 1 GitHub icon — inline SVG avoids adding a library for one glyph. |
| SEO pipeline | Route `data` with resolver, or router-events subscriber | Router-events subscriber (existing pattern in image/text SeoService) | The subscriber already exists in `text` and `image`. Fix PAGE_CONFIGS per app (wrong routes, cross-app entries) and ensure all apps use it. No need to change architecture — just correct the data. |
| Lazy loading strategy | `loadComponent` per route + idle preload, or manual dynamic imports | `loadComponent: () => import(...).then(m => m.X)` + `withPreloading(PreloadAllModules)` | Angular CLI handles chunk splitting automatically. Adding preload ensures route chunks load after first paint without blocking. |
| Mobile nav for url | Build from scratch, or port from existing pattern | Port from landing's nav (inline SVG hamburger + `aria-expanded` + `@if` mobile menu) | Landing already has a clean, accessible hamburger with zero library dependencies. Calculator is the full-featured reference (dropdowns + mobile). Url needs the simple version. |
| Font self-hosting | @fontsource package, or manual woff2 in assets | `@fontsource-variable/ibm-plex-sans` per app, imported in `styles.css` `@layer base` | Hashed, same-origin, immutable caching via Vercel. One `pnpm add` per app. Removes 2 external origins from critical path. |
| Error handling pattern | Toast service, inline error signals, or banner | Inline error signals (existing pattern) + new `syncError` signal for Supabase | Already used pervasively. Supabase gets a non-blocking banner signal exposed from the service. Clipboard gets `.catch()`. Keep it simple. |

## Data Flow: SEO Metadata Pipeline

```
app.config.ts provides SeoService (providedIn: 'root')
         │
         ▼
SeoService constructor subscribes to router.events
         │
         ▼
NavigationEnd → extract path → lookup PAGE_CONFIGS[path] → setMeta()
         │
         ▼
Title.setTitle() / Meta.updateTag() → prerender bakes tags into static HTML
```

**Per-app PAGE_CONFIGS fix**: each app's `PAGE_CONFIGS` MUST contain only its own routes. Currently `text` has entries for `json/*`, `image/*`, `calculator/*`; `image` uses wrong keys (`background-remover` vs route `remove-background`); `calculator` describes word counters and JSON tools. Rewrite each config to match its `app.routes.ts` exactly. Canonical URL populated per entry with the production domain.

**Static files**: `public/robots.txt` + `public/sitemap.xml` with one `<url>` per route, written once per app. Landing needs a real `public/og-image.png` (1200×630).

## Bundle Splitting Strategy

Home route stays eager (`component: Home`). All other routes convert to lazy:

```ts
// Before (text example)
{ path: 'word-count', component: WordCount },

// After
{ path: 'word-count', loadComponent: () => import('./components/pages/word-count/word-count').then(m => m.WordCount) },
```

Add to `app.config.ts`:
```ts
provideRouter(routes, withPreloading(PreloadAllModules))
```

This pushes heavy deps (Supabase, CDK DragDrop, cropperjs, browser-image-compression) into per-route chunks automatically — no need to make those imports dynamic by hand. The imports that are already dynamic (`@imgly/background-removal`, `jspdf`, `qrcode`) stay untouched.

## Error Handling Patterns

| Component | Current | Fix |
|-----------|---------|-----|
| `copy-button.ts` (url, text) | `navigator.clipboard.writeText()` — no `.catch()` | Add `.catch()` → `error.set('Copy failed')`; clear `setTimeout` on destroy |
| `supabase.service.ts` (text) | `console.warn` on all CRUD failures | Add `syncError = signal('')`; set on failure, clear on success; quick-notes template shows banner when set |
| `background-remover.ts` (image) | `URL.createObjectURL()` never revoked | Store object URL in local var; revoke before creating new one and in `ngOnDestroy` |
| `currency-converter.ts` (calc) | Fetches every visit, no cache | `localStorage` read/write with `TTL = 12 h`; show "rates as of {date}" |

## Font Loading Strategy

Import order in each app's `styles.css`:
```css
@import '@fontsource-variable/ibm-plex-sans';
@tailwind base;  /* font-family applied in @layer base */
@tailwind components;
@tailwind utilities;
```

Remove Google Fonts `<link>` and preconnects from `index.html`. Remove Space Grotesk references (unused in Tailwind config). Fallback stack: `"IBM Plex Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.

## Mobile Nav Component Architecture (url app)

Port from landing's nav (inline SVG hamburger, `aria-expanded`, `@if` mobile menu). Structure:

```
url/src/app/components/layout/nav/
├── nav.ts       ← Add RouterLink import, mobileOpen signal, toggle/close methods
├── nav.html     ← Replace <a href> → routerLink; add hamburger button + @if mobile menu
├── nav.css      ← Minimal (Tailwind handles layout)
```

No new component — extend existing `NavComponent`. Remove unused `faLink` import. Same pattern as landing: inline SVG for hamburger icon (no FA dependency), md:hidden toggle, click-outside-close via `(click)="closeMenu()"` on links.

## Open Questions

- [ ] Should P2-3 (pnpm workspace dedup) be split into its own SDD change? (Proposal says yes — P2 is planning only for design; actual implementation deferred.)
- [ ] Does AGPL-3.0 source-disclosure obligation for `@imgly/background-removal` need action beyond the existing `licenses-attributions` page?
