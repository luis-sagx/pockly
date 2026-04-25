# AGENTS.md

Coding standards for **Pockly**.

## Stack

- Angular 20
- TypeScript
- Tailwind CSS
- Standalone components
- Angular Signals

## General rules

- Keep components small, focused, and reusable.
- Prefer composition over large monolithic components.
- Follow the existing folder structure under `src/app/components/`.
- Use English names for files, folders, components, and routes.
- Co-locate related files: `.ts`, `.html`, `.css`, and `.spec.ts` when applicable.

## TypeScript and Angular

- Use 2 spaces for indentation.
- Prefer `signal()` and computed state over `EventEmitter` when appropriate.
- Prefer modern Angular control flow such as `@if`, `@for`, and `@switch`.
- Keep template logic simple; move non-trivial logic into the component class.
- Use explicit, readable types instead of implicit `any`.
- Keep inputs, outputs, and public APIs minimal.

## UI and styles

- Use Tailwind CSS for most styling.
- Keep component CSS minimal and only use it when Tailwind is not enough.
- Preserve the existing visual style and spacing conventions.
- Build responsive layouts by default.

## Architecture

- Pages should coordinate features; shared UI belongs in `src/app/components/ui/`.
- Layout elements belong in `src/app/components/layout/`.
- Feature pages belong in `src/app/components/pages/`.
- Add new routes in `src/app/app.routes.ts` when introducing pages.

## Quality

- Update or add the nearest spec file when changing behavior.
- Prefer small, incremental changes over broad rewrites.
- Keep functions and templates easy to scan.
- Avoid unnecessary abstraction unless the pattern repeats.

## Naming

- Components and files should use kebab-case, for example:
  - `copy-button`
  - `json-generator`
  - `background-remover`
- Use descriptive names that match the tool or feature.

## Contribution checklist

- Verify the change in the browser when it affects UI.
- Make sure the changed area still passes its relevant tests.
- Keep commits focused on a single concern.
