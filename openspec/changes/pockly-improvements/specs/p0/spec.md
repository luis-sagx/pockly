# P0 Delta Spec — Critical Fixes

## Requirement: Remove Font Awesome CDN

The system MUST NOT load external Font Awesome CSS. Raw `<i class="fa">` icons MUST migrate to `<fa-icon>` or inline SVG.

### Scenario: No external FA request

- GIVEN any app page
- WHEN the document renders
- THEN no `cdnjs.cloudflare.com` FA stylesheet link is present

### Scenario: Icon migration

- GIVEN text nav or copy-button
- WHEN the component mounts
- THEN imported SVG icons render via `<fa-icon>`

## Requirement: Remove Unused Dependencies

The system MUST eliminate dependencies with zero imports in `src/`.

### Scenario: Dead deps removed

- GIVEN an app with unused deps (e.g., `lucide-angular`, `nspell`, `@angular/forms`)
- WHEN `pnpm remove` is run and `pnpm build` succeeds
- THEN those deps are absent from `package.json` and `pnpm-lock.yaml`

## Requirement: SEO Metadata Pipeline

The system MUST serve unique `<title>`, meta description, canonical URL, and OG tags per prerendered route. `robots.txt` and `sitemap.xml` MUST exist in every app's `public/`.

### Scenario: Per-route meta

- GIVEN a non-home route
- WHEN prerender completes
- THEN the generated `index.html` contains a unique title, description, canonical link, and OG tags

### Scenario: Crawler files

- GIVEN an app build
- WHEN `pnpm build` runs
- THEN `public/robots.txt` and `public/sitemap.xml` are emitted with one `<url>` per route

## Requirement: Fix Contradictory Global Styles

The system MUST use a consistent light theme and IBM Plex Sans across all apps.

### Scenario: url styles aligned

- GIVEN `url/src/styles.css`
- WHEN it is rewritten
- THEN `bg-zinc-900` and Space Grotesk are removed; IBM Plex Sans is imported

### Scenario: Other apps cleaned

- GIVEN `text`, `json`, `image`, `calculator`
- WHEN `index.html` is inspected
- THEN no Google Fonts or Space Grotesk links remain

## Requirement: Dead Code Cleanup

The system MUST delete orphaned configs, empty CSS files, and unused imports.

### Scenario: Orphans removed

- GIVEN landing `externalDependencies`, empty `.css` files, `faLink` imports
- WHEN cleanup is applied
- THEN dead entries, empty files, and unused imports are gone and build still passes
