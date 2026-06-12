# P2 Delta Spec — Structural Improvements

## Requirement: Landing Angular 21 Upgrade

The system MUST upgrade `landing` to Angular 21.2 with zoneless change detection and `outputMode: "static"` prerender.

### Scenario: Build passes

- GIVEN `landing/`
- WHEN `pnpm build` runs
- THEN the app builds with Angular 21.2, no zone.js, and produces prerendered pages

### Scenario: Tests pass

- GIVEN `landing/`
- WHEN `pnpm test` runs
- THEN tests pass with the new unit-test builder

## Requirement: Zoneless Other Apps

The system MUST migrate `text`, `json`, `image`, and `calculator` to zoneless.

### Scenario: Zoneless config

- GIVEN `app.config.ts`
- WHEN `provideZonelessChangeDetection()` replaces zone.js
- THEN the app builds and tests pass

### Scenario: Drag-drop still works

- GIVEN text Quick Notes
- WHEN a user drags a note
- THEN CDK DragDrop continues to function correctly

## Requirement: pnpm Workspace Dedup

The system MUST convert the repo to a pnpm workspace with a `packages/shared` library.

### Scenario: Workspace created

- GIVEN the repo root
- WHEN `pnpm-workspace.yaml` and `packages/shared/` are added
- THEN all apps consume shared services and UI components without duplication

## Requirement: PWA / Offline Support

The system MUST add `@angular/pwa` and a service worker for offline tooling.

### Scenario: Offline install

- GIVEN an app
- WHEN the PWA is configured
- THEN the service worker registers and tools work offline

### Scenario: Model caching

- GIVEN the background removal model
- WHEN a repeat visit occurs
- THEN the model is served from the service worker cache, not re-downloaded

## Requirement: Real 404 Pages

The system MUST prerender a `/404` page and route wildcard `**` to a `NotFoundComponent`.

### Scenario: Unknown route

- GIVEN an unmatched URL
- WHEN a user visits it
- THEN a 404 page is rendered (not a soft-200 redirect to `/`)

### Scenario: Prerendered 404

- GIVEN `pnpm build`
- WHEN it completes
- THEN `dist/<app>/browser/404/index.html` exists

## Requirement: Accessibility Pass

The system MUST add ARIA attributes, i18n error messages, and consistent focus rings.

### Scenario: Nav dropdowns

- GIVEN JSON nav dropdowns
- WHEN they open
- THEN `role="menu"`, `aria-haspopup`, and `aria-expanded` are present

### Scenario: Input labels

- GIVEN URL input-box
- WHEN it renders
- THEN it has an `id`/`for` or `aria-label` association

### Scenario: i18n errors

- GIVEN hardcoded English error messages
- WHEN components render errors
- THEN messages use the `languageService` for translation

## Requirement: Heavy-Computation Hygiene

The system MUST guard large inputs and show processing state before main-thread work.

### Scenario: Large input guard

- GIVEN a 10 MB JSON paste
- WHEN conversion is triggered
- THEN a "Processing…" state is shown and the UI does not freeze

### Scenario: YAML safety

- GIVEN a YAML string with leading `-` or `[`
- WHEN it is serialized
- THEN it is properly quoted or escaped

## Requirement: Repo Hygiene

The system MUST add ESLint, a CI workflow, and remove dev-only waste.

### Scenario: Lint configured

- GIVEN each app
- WHEN `angular-eslint` is added
- THEN `pnpm lint` runs without fatal errors

### Scenario: CI workflow

- GIVEN a GitHub Actions workflow
- WHEN a PR is opened
- THEN `pnpm build` and `pnpm test` run per changed app

### Scenario: Dev waste removed

- GIVEN `calculator` serve config
- WHEN inspected
- THEN `--poll 2000` is absent
