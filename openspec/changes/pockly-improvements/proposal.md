# Proposal: pockly-improvements

## Intent
Fix structural debt, SEO, routing, and performance issues across 6 Angular apps (landing v20, text/json/image/calculator/url v21.2) deployed as static prerendered Vercel free-plan projects. All problems are implementation-level; framework stays Angular.

## Scope

### In Scope
- **P0**: Remove dead weight (unused deps, FA CDN, contradictory global styles), fix broken SEO (wrong titles, missing meta/robots/sitemap/canonical/OG), delete orphan configs
- **P1**: `routerLink` everywhere + lazy `loadComponent` routes, self-host fonts, fix 7 functional bugs
- **P2**: Plan Angular 21 upgrade for landing, zoneless, monorepo dedup, PWA, 404 pages, accessibility, heavy-computation hygiene

### Out of Scope
- Framework migration (rejected — Astro/Svelte/etc.)
- Tailwind v4 migration (deferred per AGENTS.md)
- Building a URL shortener (product decision)
- Supabase RLS policy audit (not verifiable from repo)

## Capabilities

### New Capabilities
- `static-font-hosting`: Self-hosted @fontsource-variable/ibm-plex-sans — eliminates Google Fonts external requests
- `per-route-chunks`: `loadComponent` lazy loading splits main bundle per route
- `seo-metadata-pipeline`: Route-driven meta via router-events subscriber; canonical + OG tags per page
- `memory-safe-background-remover`: Proper URL revocation for object URLs
- `cached-currency-rates`: localStorage TTL cache for exchange rates (12 h)
- `mobile-responsive-nav`: Hamburger menu for url app

### Modified Capabilities
- `navigation`: Full-page reload (`<a href>`, `window.location.href`) → SPA navigation (`routerLink`, `Router.navigate`)
- `bundle-assets`: Removes FA CDN, unused deps, dead configs — reduces initial bundle size

## Approach
Per-app, priority order. Each app: baseline `pnpm build`, apply fixes P0→P1→P2, one concern per commit, rebuild to verify bundle sizes under 500 kB warning budget.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `landing/` | Modified | P0 dead configs + P2-1 (Angular 21 upgrade path) |
| `text/` | Modified | P0-2/3/4 + P1-1/2/3 + P1-4d (Supabase surfacing) |
| `json/` | Modified | P0-2/3 + P1-1/2/3 + P2-6/7 |
| `image/` | Modified | P0-2/3 + P1-1/2/3 + P1-4a/b/c (memory leak, progress, file size) |
| `calculator/` | Modified | P0-2/3 + P1-1/2/3 + P1-4e (currency cache) |
| `url/` | Modified | P0-2/3/4 + P1-1/2/3/6 (mobile nav) + P1-4f/g (copy/QR) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Zoneless CDK DragDrop break in text | Low | Test Quick Notes drag-drop after P2-2; revert to zone if needed |
| FA icon migration miss | Med | Grep for raw `<i class="fa` before removing CDN link |
| @fontsource breaking font overrides | Low | Verify styles.css import order; test fallback stack |

## Rollback Plan
Each app's changes are isolated commits. To revert: `git revert <commit>` per app. P0 deletions (deps, CDN, configs) are safe to rollback by restoring the deleted lines. If any app exceeds 500 kB warning budget after P1-2, `loadComponent` conversions revert to eager `component:` imports. P1-4 functional bugs are self-contained and individually revertable.

## Dependencies
- `@fontsource-variable/ibm-plex-sans` per app
- `@angular/pwa` (P2-4, deferred)
- Vercel free plan (static only)

## Success Criteria
- [ ] All 6 apps: `pnpm build` passes; main.js under 500 kB warning budget (currently text=724 kB, image=617 kB)
- [ ] All prerendered pages have unique `<title>`, meta description, canonical URL, and OG tags
- [ ] Internal navigation uses `routerLink` (no full-page reload) in all apps
- [ ] `robots.txt` + `sitemap.xml` present in all 6 `public/` directories
- [ ] `pnpm test` passes per app
- [ ] No console errors on happy-path smoke test per app
- [ ] landing's vercel.json has proper caching headers or `framework: "angular"`
- [ ] text currency converter shows "rates as of <date>" with 12 h localStorage cache
- [ ] image background-remover shows progress messages and revokes object URLs