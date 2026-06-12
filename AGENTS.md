# AGENTS.md

## Structure

This is a flat multi-app repo. Each directory is an **independent Angular application**:

| Directory    | Angular | SSR | Test runner                  |
| ------------ | ------- | --- | ---------------------------- |
| `landing/`   | 21.2    | No  | unit-test (`@angular/build:unit-test`) |
| `image/`     | 21.2    | No  | unit-test (`@angular/build:unit-test`) |
| `json/`      | 21.2    | No  | unit-test                    |
| `text/`      | 21.2    | No  | unit-test                    |
| `url/`       | 21.2    | No  | unit-test                    |
| `calculator/`| 21.2    | No  | unit-test                    |

All commands MUST be run from inside the target app's directory. There is no root-level workspace orchestration.

## Commands (per app, from its directory)

```bash
pnpm install       # install deps for that app
pnpm start         # dev server on localhost:4200
pnpm test          # runs project-specific tests
pnpm build         # production build

# SSR apps only (image, json, text, url, calculator):
pnpm run build:ssr # full build + server bundle
```

`landing` is the main marketing site (routes to `/` only). All other apps host tool collections with multi-route setup.

## Angular versions

- All apps use Angular 21.2. They share a similar structure but have separate `package.json`, `angular.json`, and `tsconfig` files.

## Testing

- All apps use Angular's unit-test builder (`@angular/build:unit-test`). Run with `pnpm test` from the app directory.
- Tests are sparse. Most apps only have `app.spec.ts`. `image/` and `landing/` have additional component spec files.
- No vitest or jest - ignore `vitest` in devDependencies, it's unused.

## SSR / Prerendering

All apps use `outputMode: "static"` for SSG prerendering. No Express server required — deployments are fully static. The `src/main.server.ts` entry point is used by the build pipeline for prerendering routes at build time.

## Styles

- All projects use **Tailwind CSS 3.x** with custom config files per project.
- **text/** has `@tailwindcss/postcss` (Tailwind v4 postcss plugin) in devDeps but still uses Tailwind v3 config. Do not convert to v4 unless explicitly asked.

## Formatting

Prettier config in each sub-project (`.prettierrc`): `printWidth: 100`, `singleQuote: true`, Angular parser for `*.html`.

No ESLint config exists anywhere. If you need linting, add it.

## No CI / no pre-commit hooks

There are no GitHub Actions workflows and no pre-commit hooks. Build and test verification is manual.

## Existing conventions (from landing/AGENTS.md)

These apply across all apps:

- Standalone components only, no NgModules.
- Prefer `signal()` and `@if`/`@for`/`@switch` control flow.
- Component files: `xxx.ts`, `xxx.html`, `xxx.css`. Co-locate `.spec.ts` files.
- Pages in `src/app/components/pages/<feature>/`, shared UI in `src/app/components/ui/`, layout in `src/app/components/layout/`.
- Routes in `src/app/app.routes.ts`.
- kebab-case for component directories and selectors (e.g., `text-image`, `format-converter`).
- 2-space indentation.

## Deployment

Deployed to Vercel. Each app has its own Vercel project. The root `package.json` is minimal (only `cropperjs`) and is NOT the deployment entrypoint.
