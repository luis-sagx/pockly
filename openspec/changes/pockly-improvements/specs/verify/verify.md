# Verification Checklist — pockly-improvements

Per-app execution checklist derived from IMPROVEMENTS.md.

## Pre-Change Baseline

- [ ] Run `pnpm build` from the app directory and record initial `main.js` size.

## P0 Verification

- [ ] No `cdnjs.cloudflare.com` FA stylesheet link in any app's `index.html`.
- [ ] `pnpm build` passes after dead-deps removal; lockfile updated.
- [ ] Inspect `dist/<app>/browser/*/index.html` — unique `<title>`, meta description, canonical, and OG tags per route.
- [ ] `robots.txt` and `sitemap.xml` present in every `public/` directory.
- [ ] `url/src/styles.css` uses light `#fdfdf8` base and IBM Plex Sans; no `bg-zinc-900` or Space Grotesk.
- [ ] No empty `.css` files, orphaned configs, or unused imports remain.

## P1 Verification

- [ ] All internal nav links use `routerLink`; no `window.location.href` for intra-app navigation.
- [ ] After `loadComponent` conversion, `main.js` is under 500 kB per app.
- [ ] No `fonts.googleapis.com` or `fonts.gstatic.com` requests in any app.
- [ ] Image background-remover revokes object URLs on `clear()` and `ngOnDestroy`.
- [ ] Progress messages visible during model download and inference.
- [ ] Drop zone rejects oversized files with a translated error.
- [ ] Supabase sync failures show a non-blocking banner.
- [ ] Currency converter shows "rates as of <date>" and reads from `localStorage` within 12 h.
- [ ] Copy-button catches clipboard errors and clears timers on destroy.
- [ ] QR generator renders the `loading` state or the signal is removed.
- [ ] `landing/vercel.json` has `framework: "angular"` or immutable cache headers.
- [ ] URL app nav shows a hamburger with `aria-expanded` on mobile.

## P2 Verification

- [ ] `landing` builds with Angular 21.2, zoneless, and static prerender.
- [ ] `text`, `json`, `image`, `calculator` run zoneless without CDK breakage.
- [ ] `pnpm-workspace.yaml` and `packages/shared/` exist; apps consume shared code.
- [ ] Service worker registers and offline tooling works.
- [ ] `dist/<app>/browser/404/index.html` exists for every app.
- [ ] ARIA attributes present on dropdowns; inputs have labels; error messages are i18n-ready.
- [ ] Large inputs show a processing state; UI does not freeze.
- [ ] `angular-eslint` configured per app; GitHub Actions CI runs build + test.

## Cross-Cutting

- [ ] `pnpm test` passes per app.
- [ ] Manual smoke test: nav (no full-page reloads), each tool's happy path, mobile viewport.
- [ ] No console errors on happy-path smoke test.
- [ ] `landing/src/app/config/projects.ts` links still match deployed routes.
