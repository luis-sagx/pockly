# P1 Delta Spec — Performance & Routing

## Requirement: SPA Navigation

The system MUST use `routerLink` for internal same-app routes; `window.location.href` MUST NOT be used for intra-app navigation.

### Scenario: Internal links

- GIVEN nav, footer, or home-card links in `url`, `text`, `json`, `image`
- WHEN a user clicks an internal link
- THEN `routerLink` or `Router.navigate` triggers SPA navigation without a full page reload

## Requirement: Per-Route Lazy Loading

The system MUST convert non-home routes to `loadComponent` and add `withPreloading(PreloadAllModules)`.

### Scenario: Bundle under budget

- GIVEN an app with eager routes
- WHEN `pnpm build` runs
- THEN `main.js` is under 500 kB and heavy deps are in separate route chunks

## Requirement: Self-Host Fonts

The system MUST serve `@fontsource-variable/ibm-plex-sans` from the same origin.

### Scenario: No external fonts

- GIVEN any app page
- WHEN resources are requested
- THEN no `fonts.googleapis.com` or `fonts.gstatic.com` requests occur and the font renders correctly

## Requirement: Memory-Safe Background Remover

The system MUST revoke `URL.createObjectURL` results before creating new ones and on destroy.

### Scenario: Lifecycle cleanup

- GIVEN an active result object URL
- WHEN `clear()` is called or the component is destroyed
- THEN the previous object URL is revoked

## Requirement: Progress Feedback

The system MUST render `progressMessage` during model download and inference.

### Scenario: Model loading visible

- GIVEN the background remover opens
- WHEN the AI model downloads or processes
- THEN the progress message is visible under the spinner

## Requirement: Drop Zone Size Guard

The system MUST reject files exceeding a configurable size limit with a translated error.

### Scenario: Oversized rejection

- GIVEN a file exceeding the limit
- WHEN it is dropped
- THEN the drop zone rejects it and shows a translated error

## Requirement: Supabase Error Surfacing

The system MUST display a non-blocking banner when Supabase sync fails.

### Scenario: Sync failure visible

- GIVEN a `createNote` call fails
- WHEN the error returns
- THEN a banner reads "sync failed, notes stored locally"

## Requirement: Cached Currency Rates

The system MUST cache exchange rates in `localStorage` with a 12-hour TTL and show "rates as of <date>".

### Scenario: Cache behavior

- GIVEN no cached rates or cache over 12 hours old
- WHEN the converter loads
- THEN rates are fetched and stored with a timestamp; under 12h old rates are read from `localStorage`

### Scenario: Date display

- GIVEN rates are loaded
- WHEN the UI renders
- THEN "rates as of <date>" is visible

## Requirement: Copy Error Handling

The system MUST handle `navigator.clipboard.writeText` failures and clean up timers on destroy.

### Scenario: Copy failure caught

- GIVEN clipboard access is denied
- WHEN `copy()` is called
- THEN an error state is shown and the promise is caught; timers clear on destroy

## Requirement: QR Loading State

The system MUST render the `loading` signal or remove it from the component.

### Scenario: QR generation visible

- GIVEN a QR code is requested
- WHEN it is generating
- THEN the loading state is visible in the template

## Requirement: Landing Caching Headers

The system MUST serve hashed assets with immutable caching.

### Scenario: vercel.json updated

- GIVEN `landing/vercel.json`
- WHEN it is updated
- THEN it either sets `framework: "angular"` or adds `Cache-Control: public, max-age=31536000, immutable` for JS/CSS

## Requirement: Mobile Responsive Nav

The system MUST provide a hamburger menu with `aria-expanded`/`aria-label` on mobile viewports in the `url` app.

### Scenario: Responsive toggle

- GIVEN viewport width under 768 px
- WHEN the user clicks the hamburger
- THEN `aria-expanded` toggles, the menu opens, and the horizontal nav is hidden
