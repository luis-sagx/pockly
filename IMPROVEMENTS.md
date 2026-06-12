# Pockly Improvement Plan

Audit of all 6 apps (landing, text, json, image, calculator, url) deployed as separate Vercel **free-plan** projects with **no backend** (Supabase free tier in `text` only). Verdict up front: **do NOT change frameworks**. Every real problem found is an implementation issue — dead dependencies, duplicated icon delivery, eager routing, broken per-page SEO, full-page-reload navigation — all fixable inside Angular at a fraction of the cost of a rewrite. This document is the work order: each item has evidence (file:line), the fix, and expected impact, ordered by priority.

> **For executing agents:** items are independent unless marked otherwise. Work one app at a time, verify with `pnpm build` from that app's directory (see AGENTS.md), and keep each fix as its own commit. Budgets in `angular.json` (500 kB warn / 1 MB error initial) are the success metric for bundle work.

---

## Constraints (do not violate)

| Constraint | Implication |
|---|---|
| Vercel free plan, no extra spend | No paid APIs, no serverless function quotas to burn — keep deployments **fully static** (current `outputMode: "static"` + prerender is correct, keep it) |
| No backend | All tools stay client-side; Supabase (free tier, anon key + RLS) is the only remote dependency, in `text` only |
| 6 independent Vercel projects | No root workspace orchestration; commands run per-app directory |
| `landing` is Angular 20, others 21.2 | Don't use Angular 21 APIs in `landing` until it's upgraded (see P2-1) |

---

## Framework question — answered

**Keep Angular for all 6 apps.** Reasons:

1. The apps are already statically prerendered (SSG) — the main "SSR/framework overhead" concern doesn't apply; Vercel serves plain HTML/JS/CSS, zero serverless invocations.
2. Measured bundles (text 724 kB raw / 209 kB gzip, image 617 kB, calculator 484 kB, json 448 kB) are inflated by **fixable causes**: eager routes, statically-imported heavy libs, a ~500-line i18n dictionary in the main chunk, and zone.js. Fixing those (P0/P1 below) gets every app under budget without a rewrite.
3. A migration (e.g. Astro/SvelteKit) would cost weeks, lose the shared Angular component patterns across 6 apps, and save maybe 30–60 kB gzip per app — the same or less than the P0 items below save for hours of work.

**One optional exception:** `landing` is a single-route static page running Angular 20 + zone.js + Karma. If a rewrite is ever justified, it's this one (Astro or plain HTML would serve it at near-zero JS). But the recommended path is cheaper: upgrade it to Angular 21 zoneless + prerender to match the siblings (P2-1). Decide only after P0/P1 are done.

---

## Quick path (priority order)

1. **P0** — Remove dead weight and duplicate icon delivery (pure deletion, biggest KB-per-effort ratio).
2. **P0** — Fix broken SEO (wrong titles, dead meta configs, missing robots/sitemap) — these pages are invisible to search today.
3. **P1** — Routing: `routerLink` everywhere + lazy `loadComponent` routes.
4. **P1** — Functional bugs (background-remover leak, silent Supabase failures, currency caching).
5. **P2** — Structural: zoneless, landing upgrade, shared-code dedup, PWA, dark mode.

---

## P0 — Dead weight removal (hours of work, immediate payoff)

### P0-1. Delete the Font Awesome CDN stylesheet (5 apps)

**Problem:** `text`, `json`, `image`, `calculator`, `url` each load the **entire** Font Awesome 6.5.1 CSS pack from cdnjs in `index.html` (render-blocking CSS + icon font download) **while also** bundling `@fortawesome/angular-fontawesome` with individually imported SVG icons. `landing` loads FA 6.5.0 from CDN (no SRI hash) for a **single** GitHub icon.

**Evidence:**
- `text/src/index.html:15-21`, `json/src/index.html:15-21`, `image/src/index.html:14-19` (≈ lines), `calculator/src/index.html:14-19`, `url/src/index.html:15-21`
- `landing/src/index.html:40` (no SRI, used only by `<i class="fab fa-github">` in `landing/.../footer/footer.html`)
- Raw `<i class="fas fa-...">` usage that depends on the CDN pack: `text/src/app/components/layout/nav/nav.html:59,66,81,88`, `text/src/app/components/ui/copy-button/copy-button.html:6,8`

**Fix:** remove the CDN `<link>` from every `index.html`. First migrate any raw `<i class="fa...">` usages to `<fa-icon>` with individually imported icons (text nav + copy-button; landing footer GitHub icon → inline SVG, no library needed for one icon).

**Impact:** removes a render-blocking external request (~100 kB+ CSS plus webfont files) from every page of 6 sites. Largest single LCP win available.

### P0-2. Remove unused dependencies

| App | Dependency | Evidence |
|---|---|---|
| `url`, `json`, `image`, `calculator` | `lucide-angular` | Zero imports in any `src/` (grep verified); pnpm-lock flags it as deprecated upstream. Also remove its entry from `image/.../licenses-attributions.html:66-68` |
| `text` | `nspell`, `@types/nspell` | Zero references in `src/` since commit `b4cbd56` removed the spell checker; deps were never uninstalled |
| `text` | `@tailwindcss/postcss` (v4 plugin) | Not referenced by `postcss.config.json` (which uses v3 syntax); AGENTS.md says don't migrate to v4 — so remove the stray plugin |
| `text` | `@fortawesome/free-regular-svg-icons` | Only `free-solid-svg-icons` is imported (verify with full grep before removing) |
| `url` | `@angular/forms` | Zero usages — forms are hand-rolled with signals |
| `url` | `@types/qrcode` | Move from `dependencies` to `devDependencies` |

**Fix:** `pnpm remove <dep>` per app, rebuild, commit per app.

### P0-3. Fix the SEO disaster (all apps)

These sites are prerendered specifically for SEO, and the prerendered pages ship wrong or generic metadata. This is the highest-value usability-of-the-product-as-a-business fix.

| # | Issue | Evidence | Fix |
|---|---|---|---|
| a | **json app's `<title>` says "Text Tools - Free Online Text Utilities"** — copy-paste bug | `json/src/index.html:5` | Change to "JSON Tools — Free Online JSON Utilities" |
| b | `SeoService.setMeta()` is only ever called from `home.ts` in every app → all other routes prerender with the generic/default title and description (6 routes in text, 18 in json, 13 in image, 8 of 9 in calculator, 5 of 6 in url) | e.g. `text/src/app/components/pages/home/home.ts:111-117`; grep `setMeta` per app | Call `seo.setMeta()` in each page component's `ngOnInit` (or better: put meta in route `data` and have a single router-events subscriber apply it — works at prerender time) |
| c | `PAGE_CONFIGS` keys don't match real route paths (e.g. image config has `background-remover` but the route is `remove-background`; calculator config describes word counters and JSON tools that don't exist in that app) | `image/src/app/services/seo.service.ts:17-49`, `calculator/src/app/services/seo.service.ts:17-133`, `url/src/app/services/seo.service.ts` (4 of 6 routes have no entry, no `''` fallback) | Rewrite each app's `PAGE_CONFIGS` to exactly its own routes; delete entries for other apps' tools; delete the dead `url-shortener` entry |
| d | **No `robots.txt` / `sitemap.xml`** in text, json, image, calculator, url; landing's `robots.txt` points to a `sitemap.xml` that doesn't exist | `*/public/` contents; `landing/public/robots.txt` | Add `robots.txt` + `sitemap.xml` (static files in `public/`, one `<url>` per route) to every app; fix landing's sitemap reference |
| e | No canonical URLs anywhere (`canonicalUrl` field exists but is never populated) | every `seo.service.ts` | Populate canonical per route with the production domain |
| f | landing's OG/Twitter image points to `https://pockly.vercel.app/og-image.png` which **does not exist** | `landing/src/index.html:14-20`; `landing/public/` has no `og-image.png` | Add a real `og-image.png` (1200×630) to `landing/public/`; add OG tags + images to the other 5 apps too (they have none in static HTML) |
| g | No cross-linking back to the hub: landing links out to all tool apps, but no tool app links back to landing or siblings | url/text/json/image/calculator footers | Add a small footer section "More Pockly tools" with links to `https://pockly.vercel.app` and sibling apps — internal-linking signal + user discoverability |

**Verification:** after `pnpm build`, inspect `dist/<app>/browser/<route>/index.html` — each must have a unique `<title>`, meta description, canonical, and OG tags baked in.

### P0-4. Fix `url` app's contradictory global stylesheet

**Problem:** `url/src/styles.css:6-17` sets `html/body` to `bg-zinc-900` dark + `Space Grotesk` font while every component uses the light `olive-*` palette with IBM Plex Sans → dark background flash on load and a dead font request.

**Fix:** rewrite `url/src/styles.css` to match `landing`'s (light `#fdfdf8` base, IBM Plex Sans). Then remove the `Space Grotesk` Google-Fonts request — and check the other apps: `text`, `json`, `image`, `calculator` also request Space Grotesk in `index.html` without referencing it in their Tailwind configs (verify per app, then drop).

### P0-5. Misc dead code (one cleanup commit per app)

- `landing/angular.json:30-34` — `externalDependencies` block referencing `@imgly/background-removal`/`onnxruntime-web` (copy-pasted from image, dead config).
- `landing/src/frontend/components/layout/footer/footer.frontend.html` — orphaned near-duplicate of the real footer.
- `landing/src/app/app.config.ts:17` — `provideClientHydration(withEventReplay())` with no SSR build target (no-op).
- `landing` `SeoService` `PAGE_CONFIGS`: 23 entries for routes that don't exist in landing (it has 1 route).
- `url/src/app/components/layout/footer/footer.ts` and `nav.ts` — `faLink` imported/registered, never rendered.
- 16 empty component `.css` files (12 in url, 4 in landing) — delete files and their `styleUrl` references.
- `landing/vercel.json` — `Permissions-Policy: ""` empty header (placeholder, does nothing).

---

## P1 — Routing & performance (the bundle-size fixes)

### P1-1. Use `routerLink` for internal navigation (url, text, json, image)

**Problem:** nav/footer/home cards in 4 apps use plain `<a href="/...">` or `window.location.href`, so **every internal click is a full page reload** — discarding the SPA runtime, hydration, and event replay the apps already pay to ship. `calculator` does it correctly and is the reference implementation.

**Evidence:**
- `url/src/app/components/layout/nav/nav.html` (all 6 links), `url/.../home/home.ts:116-118` (`window.location.href`)
- `text/src/app/components/layout/nav/nav.html:13-47,116-156` (all except `/sign-in`)
- `json/src/app/components/layout/nav/nav.html` (`RouterLink` not even imported in `nav.ts`), `json/.../home/home.ts:68-70`
- `image/src/app/components/layout/nav/nav.html:12,17,23,29,…`
- Reference: `calculator/src/app/components/layout/nav/nav.html:14-17,30-46`

**Fix:** import `RouterLink` and replace `href` → `routerLink` for same-app routes; replace `window.location.href = path` with `Router.navigate`. Keep plain `<a target="_blank">` only for cross-app/external links.

### P1-2. Lazy-load routes with `loadComponent` (all apps except landing)

**Problem:** every route in every app is an eager `component:` import → one monolithic `main.js` per app. Worst offenders:

- **text:** `main-*.js` = 724 kB raw (209 kB gzip) — **exceeds its own 500 kB warning budget**. Supabase client + CDK DragDrop (Quick Notes only) ship to users of every page. `text/src/app/app.routes.ts` (7 eager routes).
- **image:** main = 594 kB raw — over budget. `cropperjs` (`crop.ts:15`) and `browser-image-compression` (`compress.ts:12`) are **static top-level imports** pulled into main via eager routes. `image/src/app/app.routes.ts` (14 eager routes).
- **json:** 19 eager routes (448 kB); **calculator:** 10 eager routes (484 kB, ~16 kB from budget); **url:** 6 eager routes.

**Fix:** convert all non-home routes to `loadComponent: () => import(...).then(m => m.X)`. This automatically pushes cropperjs/browser-image-compression/Supabase/CDK into per-route chunks (no need to make those imports dynamic by hand). Add `withPreloading(PreloadAllModules)` to `provideRouter` so chunks load idle-time after first paint. Note: `@imgly/background-removal`, `jspdf`, `jszip`, `imagetracerjs`, `qrcode` are already correctly dynamic — don't touch them.

**Expected impact:** text main bundle roughly halves (i18n dictionary + Supabase + CDK out of the critical path); image drops under budget; every app's first load improves.

### P1-3. Self-host fonts

**Problem:** all 6 apps load IBM Plex Sans (+ mostly-unused Space Grotesk, see P0-4) from Google Fonts — 2 external origins on the critical render path of static sites.

**Fix:** `pnpm add @fontsource-variable/ibm-plex-sans` per app, import in `styles.css`, remove the Google Fonts `<link>`s and preconnects. Fonts then ship hashed from the same origin with Vercel's immutable caching.

### P1-4. Functional bugs

| # | App | Bug | Evidence | Fix |
|---|---|---|---|---|
| a | image | Background-remover result object URL never revoked → memory leak across repeated use | `background-remover.ts:76` (created), `clear():96-103` and `ngOnDestroy` don't revoke | Revoke previous URL in `clear()`, before overwriting, and in `ngOnDestroy` |
| b | image | `progressMessage` signal set ("Loading AI model…" / "Processing…") but **never rendered**; model download is 40–80 MB and can take 10–60 s with only a generic spinner | `background-remover.ts:68,71,78,81` vs `background-remover.html:40-46` | Render `progressMessage()` under the spinner; ideally show download-vs-inference stage |
| c | image | No max-file-size validation in drop zone — 50 MB photos go straight into canvas/AI ops, can crash mobile tabs | `image/src/app/components/ui/drop-zone/drop-zone.ts:49-74` (type check only) | Add configurable size limit + translated error message |
| d | text | Supabase sync failures are silent — `createNote/updateNote/deleteNote/fetchNotes` errors only `console.warn`, user thinks notes are saved | `text/src/app/services/supabase.service.ts:102,125,147,159` | Surface a non-blocking "sync failed, notes stored locally" toast/banner state |
| e | calculator | Exchange rates fetched on every visit, no caching; prerendered HTML also bakes build-time rates that get silently replaced | `currency-converter.ts:8,49,56-65` | Cache rates in `localStorage` with a TTL (e.g. 12 h — open.er-api.com updates daily); show "rates as of <date>" |
| f | url | `copy-button.ts:27` — `navigator.clipboard.writeText(...)` has no `.catch()`; failures are silent | also check the equivalent copy-button in other apps | Add `.catch` → error state; clear the 2 s `setTimeout` on destroy |
| g | url | QR generator has a `loading` signal that's never rendered in the template | `qr-generator.ts` vs `qr-generator.html` | Render loading state or remove the signal |

### P1-5. Caching headers for landing

**Problem:** `landing/vercel.json` uses manual `rewrites`/`headers` (no `framework: "angular"`), so hashed assets (`outputHashing: all`) get no long-term caching. The other 5 apps use `framework: "angular"` and inherit Vercel's defaults.

**Fix:** either switch landing's `vercel.json` to the `framework: "angular"` form used by the others, or add `Cache-Control: public, max-age=31536000, immutable` headers for `/*.js`, `/*.css`, and image assets. Free-plan friendly: better caching = less bandwidth quota burned.

### P1-6. Mobile nav for `url`

**Problem:** `url`'s nav renders 6 links in one fixed horizontal row — no hamburger, no responsive breakpoints → overflow on phones. Every other app has a working mobile menu.

**Fix:** port the hamburger pattern from `landing/.../nav` (it has correct `aria-expanded`/`aria-label`).

---

## P2 — Structural improvements (plan as separate changes, higher effort)

### P2-1. Upgrade `landing` to Angular 21 + zoneless + prerender

Currently Angular 20 + zone.js + Karma, deployed as CSR-only SPA (its meta tags exist only because they're hand-written in `index.html`). Upgrading to match the siblings (21.2, `outputMode: "static"` + prerender, zoneless, vitest builder) removes zone.js (~30 kB gzip), removes the Angular-20-only constraint from AGENTS.md, and unifies tooling. **Alternative considered:** rewrite landing in Astro/static HTML (it's one route) — better end result for a landing page (near-zero JS) but loses stack consistency; only worth it if landing grows no further interactivity. Recommended: Angular 21 upgrade first; revisit Astro only if Lighthouse still disappoints.

### P2-2. Zoneless change detection (text, json, image, calculator)

`url` is already zoneless and proves the pattern works in this codebase. The other Angular 21 apps still ship zone.js. Switch to `provideZonelessChangeDetection()` and drop the polyfill — components already use signals throughout, so risk is low. Do this **after** P1-2 (smaller diff noise) and test interactive flows per app (drag-drop in text's Quick Notes is the riskiest — CDK DragDrop under zoneless needs verification).

### P2-3. De-duplicate shared code with a pnpm workspace

Six apps carry byte-identical or drifted copies of: `language.service.ts` (343–523 lines each), `seo.service.ts` (the drift already caused the P0-3 bugs), nav/footer, copy-button/input-box/output-box, Tailwind config/palette, `DESIGN.md`. Convert the repo to a pnpm workspace with a `packages/shared` library (services, UI components, Tailwind preset) consumed by each app. Vercel free supports monorepo subdirectory projects, so deployment doesn't change. This is the single biggest maintainability fix, but it's a large refactor — do it as its own SDD change after P0/P1, not mixed with them.

Also part of this change: split the i18n dictionaries into lazy-loaded per-locale JSON so the non-active language stops shipping in the main bundle.

### P2-4. PWA / offline support

All tools except currency rates and Supabase sync are fully client-side — ideal PWA candidates. `@angular/pwa` + service worker gives offline tooling and cuts repeat-visit bandwidth (relevant on the free plan). For the image app, consider passing a `publicPath` option and caching strategy note for `@imgly/background-removal`: today the 40–80 MB ONNX model re-downloads whenever the HTTP cache is cold (`background-remover.ts:72-74` uses the default staticimgly.com CDN). A service worker cache-first rule for that origin materially improves repeat use.

### P2-5. Real 404 pages

Every app wildcard-redirects `**` → `/` (soft-200s for garbage URLs). Add a prerendered `/404` page per app and a `NotFound` component for the wildcard route.

### P2-6. Accessibility pass

- json nav dropdowns: hover-only menus lack `role="menu"`/`aria-haspopup`/`aria-expanded`; hamburger missing `aria-expanded` (`json/.../nav.html:17-74,81`).
- `url` input-box: inputs without `id` get no label association and no `aria-label` fallback.
- Hardcoded English in error messages bypassing i18n: `image/compress.ts:77`, `image/image-resize.ts:91`, `text/.../note-detail.html:95`, text copy-button "Copy/Copied".
- Focus ring color `blue-500` doesn't match brand palette (url inputs).
- Dark mode: absent everywhere; if desired, design-token work belongs in P2-3's shared Tailwind preset.

### P2-7. Heavy-computation hygiene (json, text, image)

Synchronous main-thread work that freezes the UI with no feedback on large inputs: json convert/utils (`convert.service.ts`, `utils.service.ts` — JSON/CSV/XML/YAML on main thread), text diff-checker (O(m×n) LCS matrix, `diff-checker.ts:32-52`), image canvas ops (`format-converter.service.ts`, `crop.ts:253-269`). Pragmatic fix: input-size guard + "processing…" state first; move to Web Workers only if real usage shows large inputs. Also: the hand-rolled YAML serializer (`convert.service.ts:102-126`) quotes strings incompletely (misses leading `-`, `[`, `*`, `&`, etc.) — either harden it or swap for `yaml` (lazy-imported).

### P2-8. Repo hygiene

- No ESLint anywhere (AGENTS.md acknowledges this) — add `angular-eslint` per app.
- No CI — add a GitHub Actions workflow that runs `pnpm build` + `pnpm test` per changed app (free for public repos).
- `calculator`'s `--poll 2000` (`package.json` start + `angular.json` serve options) is dev-only CPU waste on native Linux — likely a WSL leftover; remove unless someone develops on a mounted FS.
- `image/scripts/append-license-record.mjs` is a manual license-compliance aid (keep — `@imgly/background-removal` is **AGPL-3.0**, which the licenses page correctly discloses; verify the source-disclosure obligation is actually satisfied for network use).
- Decide the fate of the unused SSR Express servers (`src/server.ts` in 5 apps): deployments are static, so either delete server.ts + express deps (keep `outputMode: "static"` prerendering, which doesn't need Express) or document why they stay.

---

## Execution checklist (per app, for applying agents)

- [ ] Run `pnpm build` from the app directory **before** changes (baseline bundle sizes from build output).
- [ ] Apply fixes in priority order; one concern per commit (conventional commits, no AI attribution).
- [ ] After P0/P1: `pnpm build` again — initial bundle must be under the 500 kB warning budget; record before/after.
- [ ] Inspect 2–3 prerendered files in `dist/<app>/browser/*/index.html` for unique title/description/canonical/OG.
- [ ] `pnpm test` passes (tests are sparse; don't let that excuse breaking the ones that exist).
- [ ] Manual smoke test per AGENTS.md: nav (no full-page reloads), each tool's happy path, mobile viewport.
- [ ] Cross-check `landing/src/app/config/projects.ts` links still match deployed routes (note: the `url` app deploys as `pockly-qr.vercel.app` — naming mismatch is expected).

## Out of scope (deliberate)

- Framework migration of the tool apps (rejected above).
- Building a URL shortener (the `url` app has no shortener despite stale SEO copy referencing one — product decision, not tech debt).
- Supabase RLS policy audit (not verifiable from this repo; anon key in `environment.ts` is the standard public pattern, but RLS must be confirmed in the Supabase dashboard).
- Tailwind v4 migration (explicitly deferred by AGENTS.md).
