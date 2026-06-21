# Design Spec — Pockly technical SEO + indexation + discreet monetization readiness

**Date:** 2026-06-21
**Status:** Draft — pending user review
**Author:** brainstorming session (Luis + Codex)

---

## 1. Summary

Improve the **technical SEO** of all 7 independent Angular apps in this repo so they are
better understood, crawled, indexed, and migrated to a future unified brand architecture:

- `pockly.com` → brand / authority hub
- `image.pockly.com`
- `json.pockly.com`
- `text.pockly.com`
- `url.pockly.com`
- `calculator.pockly.com`
- `productivity.pockly.com`

The scope is **technical SEO first**, not a content rewrite. The implementation must also
leave every app **ready for discreet ads** later without damaging UX, Core Web Vitals, or
Google indexation quality.

---

## 2. Verified current state

This was confirmed directly in code:

1. Every app already has some static metadata in `src/index.html`.
2. Metadata is mostly **home-level only**; tool routes do not have strong route-specific SEO.
3. Several apps still hardcode their current **Vercel domains** in OG URLs and images.
4. SEO depth is inconsistent:
   - `landing/` is the most complete today.
   - `productivity/` is clearly behind in OG/Twitter/canonical coverage.
5. The repo is a **flat multi-app monorepo**, but each app is independently built and deployed.
6. Commands and build logic are **per app**, not repo-root orchestrated.

This means Google can crawl these apps, but today it gets a shallow signal set and weak
per-route semantics.

---

## 3. Goals

### Primary goals

- Make each app and each important route more understandable to Google.
- Prepare clean migration from current Vercel domains to `*.pockly.com`.
- Standardize canonical, robots, sitemap, Open Graph, Twitter, and structured data.
- Preserve or improve Core Web Vitals.

### Secondary goals

- Leave all apps ready for **future AdSense-first monetization**.
- Keep monetization **discreet** and UX-safe.
- Support English and Spanish in product UI without creating SEO chaos.

### Non-goals

- No large-scale landing-page copy rewrite in this phase.
- No promise of “first place in Google” — that depends on authority, competition,
  backlinks, intent match, and time, not technical SEO alone.

---

## 4. Key decisions

1. **Technical SEO only in this phase.**
2. **Final domain model is subdomain-based** under `pockly.com`.
3. **Public slugs remain in English.**
4. **Monetization is discreet**, not aggressive.
5. **English is the primary indexable SEO language for now.**

### Why English is the primary indexable SEO language for now

This is the most important architectural decision in the design.

The apps must work in English and Spanish, but the user explicitly does **not** want
localized URLs. Without separate crawlable URLs per language, Google does **not** get a
clean bilingual indexation model. In practice, that means:

- `hreflang` cannot be meaningfully used for English/Spanish alternates unless there are
  separate alternate URLs.
- A single URL rendering different languages client-side is fine for UX, but weak for
  multilingual SEO targeting.

Therefore, phase 1 will use this rule:

- **Indexable SEO target = English**
- **Spanish = supported UI language**
- If later the product wants true bilingual organic growth, it should add **separate
  crawlable language URLs** while still keeping English slugs if desired.

This avoids sending contradictory signals to Google now.

---

## 5. Recommended approach

### Option A — Minimal patch

- Patch only home metadata in each app
- Add simple `robots.txt` and `sitemap.xml`
- Swap domains later

**Pros:** fast  
**Cons:** weak per-route SEO, misses most tool intent

### Option B — Balanced architecture (**recommended**)

- Reusable SEO layer per app
- Route-level metadata
- Canonical + migration-ready domain handling
- App sitemap + robots
- Structured data
- Discreet ad-readiness foundations

**Pros:** best impact/effort ratio  
**Cons:** requires touching multiple apps and route definitions

### Option C — Full multilingual SEO system

- All of Option B
- Dedicated crawlable language variants
- Full hreflang matrix

**Pros:** best multilingual SEO ceiling  
**Cons:** out of scope for this phase; needs URL strategy change

**Decision:** implement **Option B** now.

---

## 6. Architecture

Each app gets a small reusable SEO system instead of relying only on `index.html`.

### 6.1 Per-app SEO base

Each app should define:

- app name
- final production origin (`https://text.pockly.com`, etc.)
- default title
- default description
- default OG image
- site/application schema identity
- robots defaults

Suggested file:

```ts
src/app/seo/seo.config.ts
```

### 6.2 Route-level SEO metadata

Each important route should define:

- `title`
- `description`
- `canonicalPath`
- `robots`
- `ogType`
- optional `schema`

Suggested route metadata shape:

```ts
data: {
  seo: {
    title: 'Word Counter - Free Online Character, Word and Sentence Counter',
    description: 'Count words, characters, sentences and paragraphs instantly.',
    canonicalPath: '/word-count',
    robots: 'index,follow'
  }
}
```

### 6.3 Runtime SEO updater

Each app should have a central service that reads route metadata and updates:

- `<title>`
- `meta[name="description"]`
- canonical link
- Open Graph tags
- Twitter tags
- `meta[name="robots"]`
- structured data script
- `<html lang>`

Suggested files:

```ts
src/app/seo/seo.service.ts
src/app/seo/seo.models.ts
src/app/seo/route-seo.resolver.ts (optional)
```

### 6.4 Static fallback in `index.html`

Keep a good default in `src/index.html`, but treat it as a **fallback**, not the real
SEO source of truth for all pages.

---

## 7. Indexation model

### 7.1 Canonical

Every indexable route must emit a self-referencing canonical using the **future**
`*.pockly.com` origin model.

Examples:

- `https://text.pockly.com/word-count`
- `https://json.pockly.com/utils/format`
- `https://image.pockly.com/remove-background`

During the migration window, this is implemented through centralized origin config so the
domains can be switched once, not hardcoded in random files.

### 7.2 Robots

Rules:

- indexable tool pages → `index, follow`
- thin / duplicate / transition routes → `noindex, follow`
- 404 pages → `noindex, nofollow`

Routes that are redirects today should not accidentally become indexable duplicates.

### 7.3 XML sitemaps

Each app should expose a sitemap that includes all important public routes.

Examples:

- `https://text.pockly.com/sitemap.xml`
- `https://image.pockly.com/sitemap.xml`

`landing/` should also expose either:

- its own sitemap only, or
- a sitemap index for the ecosystem later if desired

### 7.4 robots.txt

Each app should expose:

- `User-agent: *`
- `Allow: /`
- sitemap location

This must be generated from the same origin config used by canonical URLs.

### 7.5 Status pages

- `404` → noindex
- avoid soft-404 behavior on tool pages with empty states
- preserve real route rendering for SSG/prerender

---

## 8. Structured data

### 8.1 App-level schema

Every app should at minimum output a consistent base schema:

- `WebSite` for brand/site context
- `WebApplication` for the tool app itself
- `Organization` for Pockly identity where relevant

### 8.2 Tool-level schema

Important utility routes should emit route-specific `WebApplication` data.

Examples:

- Word Counter
- JSON Formatter
- Background Remover
- QR Generator
- Percentage Calculator

This gives Google clearer entity-level understanding of each tool.

### 8.3 Breadcrumb schema

For nested routes like `json/convert/json-to-csv`, breadcrumb schema is recommended.

---

## 9. English/Spanish strategy

### Phase 1

- URLs remain English-only
- canonical remains the English URL
- app UI may switch between English and Spanish
- `html[lang]` should reflect current UI language for accessibility/UX

### SEO rule

Do **not** pretend there are multilingual alternates if there are not.

That means:

- no fake `hreflang` English/Spanish alternates pointing to the same URL as if they were
  distinct localized pages
- optionally keep only `x-default` if a future selector page needs it, but do not force a
  misleading hreflang graph now

### Future expansion path

If bilingual SEO becomes a real acquisition goal later:

- add separate crawlable locale URLs
- keep English slugs if desired
- then add full `hreflang`

---

## 10. Monetization readiness (discreet)

The sites should be prepared for **AdSense-first** monetization, with later evaluation of
Journey by Mediavine or Ezoic once traffic and quality justify it.

### 10.1 Technical prerequisites

- `ads.txt` ready at root of each future subdomain
- privacy policy
- terms page
- contact/about presence
- cookie/consent solution suitable for relevant regions
- ad placeholders with reserved space to avoid CLS

### 10.2 UX constraints

- no sticky ad overload
- no interstitials blocking tool usage
- no ad-first homepages
- ads must never dominate the useful tool content

### 10.3 SEO constraints

- preserve LCP/CLS/INP budgets
- do not create thin pages that exist only to carry ads
- do not delay tool usability behind banners/popups

This protects both AdSense approval chances and long-term search performance.

---

## 11. App-by-app implementation targets

### `landing/`

Role: brand authority and cross-linking hub

- strengthen canonical/domain config
- add sitemap + robots
- add organization/website schema
- ensure links to all tool subdomains are crawlable and descriptive

### `image/`

Role: image utility suite

- route-level SEO for converter/remover/editor routes
- noindex duplicate redirect aliases
- structured data per major tool

### `json/`

Role: developer/data tool suite

- route-level SEO for generator, templates, format, validate, convert pages
- breadcrumb schema for nested routes

### `text/`

Role: text utility suite

- route-level SEO for word count, text case, diff checker, password generator

### `url/`

Role: URL and QR utilities

- route-level SEO for QR generator, encoder, decoder, UTM builder, cleaner
- remove dependence on old Vercel hostnames in metadata

### `calculator/`

Role: calculators and converters

- route-level SEO for percentage, currency, and unit converters
- clear calculator-specific schema where useful

### `productivity/`

Role: productivity app

- bring OG/Twitter/canonical baseline up to parity
- define indexing policy carefully for app-like routes
- likely index home and useful public tools; evaluate auth pages as `noindex`

---

## 12. File-level design

Per app, expected additions or changes are roughly:

- `src/index.html`
- `src/app/app.routes.ts`
- `src/app/seo/seo.config.ts`
- `src/app/seo/seo.service.ts`
- `src/app/seo/seo.models.ts`
- `src/app/app.ts` or root shell bootstrapping to listen to route changes
- public `robots.txt`
- public `sitemap.xml` or generated equivalent
- optional policy pages or shared footer links where needed for monetization readiness

Because each app is independent, this should be implemented as a **repeatable pattern**
across the 7 apps, not 7 unrelated one-off hacks.

---

## 13. Migration to `*.pockly.com`

When the custom domain migration happens:

1. Add subdomains in Vercel.
2. Update centralized origin config.
3. Deploy canonical/OG/sitemap/robots with final domains.
4. Add **301 redirects** from old Vercel domains to new subdomains.
5. Submit new properties/sitemaps in Google Search Console.
6. Monitor indexing and coverage after migration.

This migration must be treated as an SEO event, not just infrastructure cleanup.

---

## 14. Verification strategy

Before calling this successful:

1. Build each app successfully.
2. Inspect rendered HTML for:
   - title
   - description
   - canonical
   - robots
   - OG/Twitter tags
   - JSON-LD
3. Confirm `robots.txt` and `sitemap.xml` resolve correctly.
4. Check that redirect/alias routes do not produce duplicate-indexing signals.
5. Confirm 404 is `noindex`.
6. Confirm reserved ad slots do not cause layout shift.

---

## 15. Risks and tradeoffs

### Risk 1 — multilingual ambiguity

If the same URL flips language client-side, Google may not reliably treat it as two
distinct language assets.

**Mitigation:** treat English as canonical SEO target for now.

### Risk 2 — migration losses

Moving from current Vercel domains to subdomains can temporarily affect indexing.

**Mitigation:** 301 redirects + canonical consistency + Search Console submission.

### Risk 3 — over-indexing thin routes

Some app-like or duplicate routes may not deserve indexation.

**Mitigation:** explicit per-route index/noindex decisions.

### Risk 4 — monetization harming CWV

Ads can damage CLS/LCP if added carelessly.

**Mitigation:** discreet placements + reserved slots + delayed rollout.

---

## 16. Implementation order

Recommended order:

1. Build the reusable SEO pattern
2. Apply it to `landing/`
3. Apply it to the 6 tool apps
4. Add sitemap/robots per app
5. Add monetization-readiness assets
6. Verify builds and rendered metadata

This keeps the work systematic and reviewable.

---

## 17. Final recommendation

Proceed with the **balanced architecture**:

- route-level technical SEO across all 7 apps
- migration-ready `*.pockly.com` domain model
- English canonical indexing first
- Spanish UI support without fake multilingual SEO
- discreet ad-readiness baked into the architecture from day one

This is the right foundation. It does not guarantee top rankings — NOTHING honest can —
but it gives Google a much cleaner technical surface and avoids the amateur mistakes that
kill growth before content and authority even have a chance to work.
