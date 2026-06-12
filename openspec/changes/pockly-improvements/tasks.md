# Tasks: pockly-improvements

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~2500–3500 (rough; P0 + P1 across 6 apps) |
| 400-line budget risk | High |
| Chained PRs recommended | No (user chose single PR C2 with explicit unlimited budget D3) |
| Suggested split | Single PR (user decision overrides default) |
| Delivery strategy | single-pr |
| Chain strategy | size-exception (user-approved) |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: High

### Suggested Work Units

Not applicable — user explicitly chose C2 (single PR) and D3 (line count doesn't matter). All concerns land in one PR, one concern per commit (per IMPROVEMENTS.md execution checklist).

## Pre-flight (one-time, all apps)

- [ ] 0.1 Baseline: from each app dir (`landing`, `text`, `json`, `image`, `calculator`, `url`) run `pnpm build` and record `main-*.js` size; commit-free snapshot
- [ ] 0.2 Capture prerendered sample (`dist/<app>/browser/index.html` + 1 nested route) per app for SEO comparison later
- [ ] 0.3 Verify each app passes `pnpm test` on baseline

## Phase 1: P0 — Dead weight removal (landing)

- [ ] 1.1 `landing/angular.json:30-34` — drop `externalDependencies` block (imgly/onnxruntime ghost config)
- [ ] 1.2 `landing/src/index.html` — remove FA 6.5.0 CDN `<link>` (no SRI, single icon)
- [ ] 1.3 `landing/src/app/components/layout/footer/footer.html` — replace `<i class="fab fa-github">` with inline SVG (GitHub glyph)
- [ ] 1.4 `landing/src/frontend/components/layout/footer/footer.frontend.html` — delete orphan near-duplicate of real footer
- [ ] 1.5 `landing/src/app/app.config.ts:17` — remove `provideClientHydration(withEventReplay())` (no SSR build target)
- [ ] 1.6 `landing/src/app/services/seo.service.ts` — trim `PAGE_CONFIGS` to landing's 1 route (delete 23 stale entries)
- [ ] 1.7 `landing/vercel.json` — drop empty `Permissions-Policy: ""` placeholder
- [ ] 1.8 `landing/src/app/components/...` — delete 4 empty `.css` files + their `styleUrl` references
- [ ] 1.9 `landing/public/og-image.png` — add real 1200×630 image, update OG/Twitter meta to point at it
- [ ] 1.10 `landing/public/sitemap.xml` — add (landing has 1 route); `robots.txt` already exists, fix broken sitemap ref
- [ ] 1.11 `pnpm build` — verify landing still builds, no console errors; commit per concern

## Phase 2: P0 — Dead weight removal (text)

- [ ] 2.1 `text/src/index.html` — remove FA 6.5.1 CDN `<link>` (lines 15-21)
- [ ] 2.2 `text/src/app/components/layout/nav/nav.html:59,66,81,88` — migrate 4 raw `<i class="fas fa-...">` to `<fa-icon>` with solid SVG imports
- [ ] 2.3 `text/src/app/components/ui/copy-button/copy-button.html:6,8` — migrate 2 raw FA icons to `<fa-icon>`
- [ ] 2.4 `text/package.json` — `pnpm remove nspell @types/nspell @tailwindcss/postcss @fortawesome/free-regular-svg-icons` (verify zero usage first)
- [ ] 2.5 `text/src/index.html` — remove Google Fonts + Space Grotesk `<link>`s + preconnects
- [ ] 2.6 `text/src/app/components/pages/home/home.ts:111-117` — already calls `seo.setMeta()`; wire other 6 page components' `ngOnInit` to call it (or move to router-events subscriber)
- [ ] 2.7 `text/src/app/services/seo.service.ts` — rewrite `PAGE_CONFIGS` to text's own routes only; drop json/image/calculator entries
- [ ] 2.8 `text/public/robots.txt` + `text/public/sitemap.xml` — create (one `<url>` per route); populate canonical with production domain
- [ ] 2.9 `text/src/app/components/layout/footer/footer.html` — add "More Pockly tools" cross-link section (landing + siblings)
- [ ] 2.10 `pnpm build` + `pnpm test` — verify main bundle under 500 kB; commit per concern

## Phase 3: P0 — Dead weight removal (json)

- [ ] 3.1 `json/src/index.html:5` — change title from "Text Tools" → "JSON Tools"
- [ ] 3.2 `json/src/index.html` — remove FA 6.5.1 CDN `<link>`
- [ ] 3.3 `json/package.json` — `pnpm remove lucide-angular`
- [ ] 3.4 `json/src/index.html` — remove Google Fonts + Space Grotesk `<link>`s + preconnects
- [ ] 3.5 `json/src/app/services/seo.service.ts` — rewrite `PAGE_CONFIGS` to json's 18 real routes; populate canonical
- [ ] 3.6 `json/src/app/components/pages/home/home.ts` + 17 page components — call `seo.setMeta()` per route
- [ ] 3.7 `json/public/robots.txt` + `json/public/sitemap.xml` — create
- [ ] 3.8 `json/src/app/components/layout/nav/nav.ts` — add OG tags to static `index.html`; import `RouterLink` (deferred to P1-1, but flag here)
- [ ] 3.9 `json/src/app/components/layout/footer/footer.html` — add cross-link footer
- [ ] 3.10 `pnpm build` + `pnpm test` — verify build passes; commit per concern

## Phase 4: P0 — Dead weight removal (image)

- [ ] 4.1 `image/src/index.html` — remove FA 6.5.1 CDN `<link>`
- [ ] 4.2 `image/package.json` — `pnpm remove lucide-angular`; also remove from `image/.../licenses-attributions.html:66-68`
- [ ] 4.3 `image/src/index.html` — remove Google Fonts + Space Grotesk `<link>`s + preconnects
- [ ] 4.4 `image/src/app/services/seo.service.ts:17-49` — fix `PAGE_CONFIGS` keys (e.g., `background-remover` → `remove-background`); add missing routes
- [ ] 4.5 `image/src/app/components/pages/home/home.ts` + 12 page components — call `seo.setMeta()` per route
- [ ] 4.6 `image/public/robots.txt` + `image/public/sitemap.xml` — create
- [ ] 4.7 `image/src/app/components/layout/footer/footer.html` — add cross-link footer
- [ ] 4.8 `pnpm build` + `pnpm test` — verify build passes; commit per concern

## Phase 5: P0 — Dead weight removal (calculator)

- [ ] 5.1 `calculator/src/index.html` — remove FA 6.5.1 CDN `<link>`
- [ ] 5.2 `calculator/package.json` — `pnpm remove lucide-angular`; also remove `start` script `--poll 2000` and `angular.json` serve `poll` option (P2-8 hygiene, brought forward)
- [ ] 5.3 `calculator/src/index.html` — remove Google Fonts + Space Grotesk `<link>`s + preconnects
- [ ] 5.4 `calculator/src/app/services/seo.service.ts:17-133` — rewrite `PAGE_CONFIGS` to calculator's 9 real routes (current config describes word counters / JSON tools that don't exist here)
- [ ] 5.5 `calculator/src/app/components/pages/home/home.ts` + 8 page components — call `seo.setMeta()` per route
- [ ] 5.6 `calculator/public/robots.txt` + `calculator/public/sitemap.xml` — create
- [ ] 5.7 `calculator/src/app/components/layout/footer/footer.html` — add cross-link footer
- [ ] 5.8 `pnpm build` + `pnpm test` — verify build passes; commit per concern

## Phase 6: P0 — Dead weight removal (url)

- [ ] 6.1 `url/src/index.html` — remove FA 6.5.1 CDN `<link>`
- [ ] 6.2 `url/package.json` — `pnpm remove lucide-angular @angular/forms`; move `@types/qrcode` to `devDependencies`
- [ ] 6.3 `url/src/index.html` — remove Google Fonts + Space Grotesk `<link>`s + preconnects
- [ ] 6.4 `url/src/styles.css:6-17` — rewrite: drop `bg-zinc-900` + Space Grotesk; align with landing's `#fdfdf8` light + IBM Plex Sans
- [ ] 6.5 `url/src/app/services/seo.service.ts` — add `''` home fallback; add entries for all 6 routes (4 currently missing); delete dead `url-shortener` entry
- [ ] 6.6 `url/src/app/components/pages/home/home.ts:116-118` — replace `window.location.href` (also part of P1-1; do SEO service fix first)
- [ ] 6.7 `url/src/app/components/layout/footer/footer.ts` + `nav.ts` — remove `faLink` import/registration (never rendered)
- [ ] 6.8 `url/src/app/components/...` — delete 12 empty `.css` files + their `styleUrl` references
- [ ] 6.9 `url/public/robots.txt` + `url/public/sitemap.xml` — create
- [ ] 6.10 `url/src/app/components/layout/footer/footer.html` — add cross-link footer
- [ ] 6.11 `pnpm build` + `pnpm test` — verify build passes; commit per concern

## Phase 7: P0 verification gate

- [ ] 7.1 All 6 apps: `pnpm build` succeeds
- [ ] 7.2 Inspect `dist/<app>/browser/<route>/index.html` (2–3 routes per app) for unique title, meta description, canonical, OG tags
- [ ] 7.3 All 6 apps: `robots.txt` + `sitemap.xml` present and non-empty
- [ ] 7.4 All 6 apps: zero `cdnjs.cloudflare.com` / `fonts.googleapis.com` / `fonts.gstatic.com` requests in built HTML
- [ ] 7.5 All 6 apps: `pnpm test` passes

## Phase 8: P1 — routerLink conversion (text)

- [ ] 8.1 `text/src/app/components/layout/nav/nav.ts` — import `RouterLink`
- [ ] 8.2 `text/src/app/components/layout/nav/nav.html:13-47,116-156` — replace `<a href>` with `routerLink` (except `/sign-in` external)
- [ ] 8.3 `text/src/app/components/pages/home/home.ts` + home card templates — replace `href` with `routerLink`
- [ ] 8.4 `pnpm build` — verify no full-page reloads on intra-app nav; commit

## Phase 9: P1 — routerLink conversion (json)

- [ ] 9.1 `json/src/app/components/layout/nav/nav.ts` — import `RouterLink`
- [ ] 9.2 `json/src/app/components/layout/nav/nav.html` — replace `<a href>` with `routerLink`
- [ ] 9.3 `json/src/app/components/pages/home/home.ts:68-70` + home card templates — replace `href` with `routerLink`
- [ ] 9.4 `pnpm build` — verify; commit

## Phase 10: P1 — routerLink conversion (image)

- [ ] 10.1 `image/src/app/components/layout/nav/nav.ts` — import `RouterLink` (verify present)
- [ ] 10.2 `image/src/app/components/layout/nav/nav.html:12,17,23,29,...` — replace `<a href>` with `routerLink`
- [ ] 10.3 `image/src/app/components/pages/home/home.ts` + home card templates — replace `href` with `routerLink`
- [ ] 10.4 `pnpm build` — verify; commit

## Phase 11: P1 — routerLink conversion (url)

- [ ] 11.1 `url/src/app/components/layout/nav/nav.ts` — import `RouterLink`
- [ ] 11.2 `url/src/app/components/layout/nav/nav.html` (all 6 links) — replace `<a href>` with `routerLink`
- [ ] 11.3 `url/src/app/components/pages/home/home.ts:116-118` — replace `window.location.href` with `Router.navigate`
- [ ] 11.4 `pnpm build` — verify; commit

## Phase 12: P1 — Lazy routes (text)

- [ ] 12.1 `text/src/app/app.routes.ts` — convert 6 non-home routes from eager `component:` → `loadComponent: () => import(...).then(m => m.X)`
- [ ] 12.2 `text/src/app/app.config.ts` — add `withPreloading(PreloadAllModules)` to `provideRouter`
- [ ] 12.3 `pnpm build` — record main bundle size; expect Supabase + CDK out of main; commit

## Phase 13: P1 — Lazy routes (json)

- [ ] 13.1 `json/src/app/app.routes.ts` — convert 18 non-home routes to `loadComponent`
- [ ] 13.2 `json/src/app/app.config.ts` — add `withPreloading(PreloadAllModules)`
- [ ] 13.3 `pnpm build` — record main bundle size; commit

## Phase 14: P1 — Lazy routes (image)

- [ ] 14.1 `image/src/app/app.routes.ts` — convert 13 non-home routes to `loadComponent` (cropperjs + browser-image-compression pushed to per-route chunks)
- [ ] 14.2 `image/src/app/app.config.ts` — add `withPreloading(PreloadAllModules)`
- [ ] 14.3 `pnpm build` — record main bundle size (target: under 500 kB); commit

## Phase 15: P1 — Lazy routes (calculator)

- [ ] 15.1 `calculator/src/app/app.routes.ts` — convert 9 non-home routes to `loadComponent`
- [ ] 15.2 `calculator/src/app/app.config.ts` — add `withPreloading(PreloadAllModules)`
- [ ] 15.3 `pnpm build` — record main bundle size; commit

## Phase 16: P1 — Lazy routes (url)

- [ ] 16.1 `url/src/app/app.routes.ts` — convert 5 non-home routes to `loadComponent`
- [ ] 16.2 `url/src/app/app.config.ts` — add `withPreloading(PreloadAllModules)`
- [ ] 16.3 `pnpm build` — record main bundle size; commit

## Phase 17: P1 — Self-host fonts (all 6 apps)

- [ ] 17.1 Each app: `pnpm add @fontsource-variable/ibm-plex-sans` (6 separate adds, 6 commits)
- [ ] 17.2 Each `src/styles.css` — add `@import '@fontsource-variable/ibm-plex-sans';` before `@tailwind base`; verify font stack in `@layer base`
- [ ] 17.3 Each `src/index.html` — remove Google Fonts `<link>`s and preconnects (already partial from P0)
- [ ] 17.4 `pnpm build` per app — verify font renders, no external font requests; commit per app

## Phase 18: P1 — Functional bugs (image)

- [ ] 18.1 `image/.../background-remover.ts:76,96-103` — store object URL in local var; revoke before overwrite, on `clear()`, and in `ngOnDestroy`
- [ ] 18.2 `image/.../background-remover.html:40-46` — render `progressMessage()` under spinner; distinguish "Loading AI model…" vs "Processing…"
- [ ] 18.3 `image/.../ui/drop-zone/drop-zone.ts:49-74` — add configurable max-size guard with translated error; plumb to `background-remover`, `crop`, `compress`, `resize`
- [ ] 18.4 `pnpm test` + smoke test; commit per bug

## Phase 19: P1 — Functional bugs (text)

- [ ] 19.1 `text/src/app/services/supabase.service.ts:102,125,147,159` — add `syncError = signal('')`; set on failure, clear on success
- [ ] 19.2 `text/src/app/components/pages/quick-notes/...` template — render non-blocking banner "sync failed, notes stored locally" when `syncError()` set
- [ ] 19.3 `pnpm test` + smoke test (toggle network off, create note); commit

## Phase 20: P1 — Functional bugs (calculator)

- [ ] 20.1 `calculator/.../currency-converter.ts:8,49,56-65` — `localStorage` cache with 12 h TTL (`{ rates, fetchedAt }`); read on load, fetch+write on miss/expired
- [ ] 20.2 `calculator/.../currency-converter` template — render "rates as of {date}"
- [ ] 20.3 `pnpm test` + smoke test (clear localStorage, verify fetch; revisit, verify cache hit); commit

## Phase 21: P1 — Functional bugs (url)

- [ ] 21.1 `url/.../copy-button.ts:27` — wrap `navigator.clipboard.writeText(...)` in `.catch()` → `error.set('Copy failed')`; clear `setTimeout` in `ngOnDestroy`
- [ ] 21.2 `url/.../qr-generator.ts` + `qr-generator.html` — render `loading` signal in template (or remove signal if unused)
- [ ] 21.3 `pnpm test` + smoke test; commit per bug

## Phase 22: P1 — Landing caching headers

- [ ] 22.1 `landing/vercel.json` — switch to `framework: "angular"` form (matches siblings) OR add `Cache-Control: public, max-age=31536000, immutable` for `/*.js`, `/*.css`, image assets
- [ ] 22.2 Verify deploy preview inherits long-term caching; commit

## Phase 23: P1 — Mobile nav (url)

- [ ] 23.1 `url/src/app/components/layout/nav/nav.ts` — add `mobileOpen = signal(false)`, `toggleMenu()`, `closeMenu()`; import `RouterLink`
- [ ] 23.2 `url/src/app/components/layout/nav/nav.html` — replace `<a href>` with `routerLink`; add hamburger button (inline SVG, md:hidden) with `aria-expanded`/`aria-label`; add `@if (mobileOpen())` mobile menu
- [ ] 23.3 `url/src/app/components/layout/nav/nav.html` — click-outside-close: add `(click)="closeMenu()"` to mobile menu links
- [ ] 23.4 Smoke test: viewport < 768 px, toggle menu opens/closes, no overflow; commit

## Phase 24: P1 verification gate

- [ ] 24.1 All 6 apps: `pnpm build` succeeds; record before/after main.js sizes
- [ ] 24.2 All apps: `main.js` under 500 kB warning budget (text was 724 kB, image 617 kB, json 448 kB, calculator 484 kB, url 384 kB-ish, landing 4xx kB)
- [ ] 24.3 All 5 tool apps: intra-app nav uses `routerLink` (no full-page reload — verify via DevTools)
- [ ] 24.4 All 6 apps: `pnpm test` passes
- [ ] 24.5 All 7 functional bugs: manual smoke test per app
- [ ] 24.6 landing: deploy preview shows immutable caching on hashed assets
- [ ] 24.7 url: mobile viewport (≤768 px) shows hamburger, toggles `aria-expanded`, menu opens

## Phase 25: Post-implementation (deferred — separate SDD change)

- [ ] 25.1 **P2 NOT in scope for this change** — Angular 21 upgrade for landing, zoneless migration, pnpm workspace dedup, PWA, 404 pages, accessibility, heavy-computation hygiene, repo hygiene (ESLint/CI/dev waste) → queue as new SDD change `pockly-structural` or similar after this PR merges

## Notes

- Per IMPROVEMENTS.md execution checklist: one concern per commit, conventional commits only (no AI attribution)
- P0 changes are pure deletion / correction; safe to revert per-app via `git revert`
- P1 lazy-route conversions revertable to eager `component:` imports if any app exceeds 500 kB budget after commit
- P1-4 functional bugs are self-contained; each individually revertable
- The "verify" directory under `openspec/changes/pockly-improvements/` belongs to the verify phase, not this phase
