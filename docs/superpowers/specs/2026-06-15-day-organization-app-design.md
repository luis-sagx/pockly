# Design Spec — Pockly personal-organization app (`day/`)

**Date:** 2026-06-15
**Status:** Draft — pending user review
**Author:** brainstorming session (Luis + Claude)

---

## 1. Summary

Extract the `quick-notes` feature out of the `text/` app into a **new, independent
Pockly app focused on personal daily organization**. The new app ships three tools
that cover the three distinct shapes of "my day" — **one-off tasks**, **recurring
routines**, and **loose thoughts** — without overlapping each other and without
becoming a Trello/Jira/Notion clone.

| Tool | What it does | Replaces / new |
| --- | --- | --- |
| **Board** | Task board organized by **time horizon** (Today / This week / Someday) | Rework of `quick-notes` |
| **Habits** | Recurring daily habits with streaks | New |
| **Scratchpad** | Single ultra-fast autosaving markdown pad | New (restores the *original* quick-notes spirit) |

All three are **offline-first** (localStorage always) with **optional Supabase sync**
when the user signs in — the same pattern `quick-notes` uses today, extended to every
tool.

---

## 2. Context & problem

Pockly is a flat monorepo of **independent Angular 21.2 apps**, one per category, each
with its own `package.json` / `angular.json` / Tailwind config / `ngsw-config` (PWA) /
Vercel project. Apps share `@pockly/shared` (i18n, SEO, a few UI primitives).

| App | Category |
| --- | --- |
| `landing/` | marketing site |
| `text/` | text tools (word-count, text-case, diff-checker) **+ quick-notes** |
| `json/` | JSON tools |
| `image/` | image tools |
| `url/` | developer tools |
| `calculator/` | calculator tools |

**The problem (confirmed in code):** `quick-notes` is no longer a "quick note". It is
already a full kanban board — 3 priority columns (`high`/`medium`/`low`), drag & drop,
per-note checklist, categories, a detail modal, and Supabase + localStorage sync
(`text/src/app/components/pages/quick-notes/quick-notes.ts`). It is also the **only**
stateful, account-backed feature in an app otherwise full of stateless text utilities —
it does not belong in `text/`, and its priority-column model is exactly the generic
"project board" shape the product wants to avoid.

---

## 3. Decisions made (brainstorming)

1. **Lens:** personal daily productivity (for anyone) — maximizes differentiation from
   Trello/Jira, which are team/project tools. Guiding rule: if a decision pushes toward
   "generic project board," go the other way.
2. **Notes rework:** the board's 3 columns change from **priority** to **time horizon**
   — `Today / This week / Someday`. Priority is demoted to an optional tag/color.
3. **Extra tools (1–2):** **Habits tracker** + **Scratchpad**. (Pomodoro and
   time-blocking were considered and deferred to v2.)
4. **Persistence:** offline-first + optional Supabase sync for **all three** tools.
   Reuse and extend the existing Supabase pattern.
5. **Shared refactor:** promote Supabase auth/client to `@pockly/shared` since a second
   app now needs it.

---

## 4. Naming (to confirm)

Directory follows the short single-word convention (`text`, `json`, `url`).

- **`day/`** — proposed default — "Pockly Day · your day, organized."
- `organize/` — closest to the word the user used.
- `desk/` — workspace metaphor (a board, a habit tracker and a pad on your desk).

This spec uses **`day/`** as the working name throughout. Swapping it is a
find-and-replace on the directory name, the Vercel project name, and SEO copy — no
architectural impact.

---

## 5. App architecture

New Angular 21.2 app, scaffolded by copying an existing app's shape (recommend `text/`
since it already wires `@pockly/shared` + the Supabase pattern). Standalone components,
signals, `@if`/`@for` control flow, 2-space indent, `kebab-case` selectors — same
conventions as the rest of the repo (`AGENTS.md`).

```
day/
├── angular.json · tsconfig*.json · tailwind.config.js · ngsw-config.json · vercel.json
├── package.json            # depends on @pockly/shared (workspace:*)
├── src/
│   ├── environments/environment.ts   # supabaseUrl + supabaseAnonKey (same project)
│   ├── index.html · main.ts · main.server.ts · styles.css
│   └── app/
│       ├── app.ts · app.config.ts · app.config.server.ts
│       ├── app.routes.ts · app.routes.server.ts
│       ├── seo.config.ts
│       ├── translations.ts            # app-local i18n strings
│       ├── services/
│       │   ├── board.service.ts        # tasks: localStorage + Supabase sync
│       │   ├── habits.service.ts       # habits + logs: localStorage + Supabase sync
│       │   └── scratchpad.service.ts   # single pad: localStorage + Supabase sync
│       └── components/
│           ├── layout/  (nav, footer)         # copied from text/ pattern
│           ├── pages/
│           │   ├── home/         # 3-tool grid (like other multi-tool apps)
│           │   ├── board/        # the time-horizon board (ex quick-notes)
│           │   ├── habits/       # habit tracker
│           │   ├── scratchpad/   # markdown pad
│           │   ├── auth/         # sign-in (copied from text/)
│           │   └── not-found/
│           └── ui/
│               ├── task-card/ · task-column/ · task-detail/ · create-task-form/  # ex note-*
│               ├── habit-row/ · create-habit-form/
│               └── (scratchpad is a single self-contained page, no extra ui)
```

### Routes (`app.routes.ts`)

| Path | Component | Notes |
| --- | --- | --- |
| `/` | `Home` | tool grid + intro |
| `/board` | `Board` (lazy) | time-horizon task board |
| `/habits` | `Habits` (lazy) | habit tracker |
| `/scratchpad` | `Scratchpad` (lazy) | markdown pad |
| `/sign-in` | `Auth` (lazy) | login / signup |
| `/404` + `**` | `NotFound` | redirect catch-all |

PWA: copy `ngsw-config.json` + service-worker registration, matching the recent
`url`/`calculator` PWA work (`3b401d9`, `dbf1697`). `outputMode: "static"` SSG
prerendering like every other app.

---

## 6. Shared package refactor — promote auth to `@pockly/shared`

Today `SupabaseService` lives only in `text/` and mixes two concerns:

1. **Auth + client lifecycle** — `createClient`, session restore, `onAuthStateChange`,
   `signInWithGoogle` / `signUp` / `signInWithPassword` / `signOut`, and the
   `user` / `session` / `isLoggedIn` / `displayName` / `syncError` signals.
2. **Notes CRUD** — `fetchNotes` / `createNote` / `updateNote` / `deleteNote` + row
   mapping, which is feature-specific.

**Refactor:** move concern (1) into `@pockly/shared` as an `AuthService` (or
`SupabaseAuthService`); leave concern (2) out of shared. Each app/tool builds its own
data service on top of the shared client.

```ts
// @pockly/shared — new export
export class AuthService {
  user = signal<User | null>(null);
  session = signal<Session | null>(null);
  isLoggedIn = computed(() => !!this.session());
  displayName = computed(() => /* username | email prefix */);
  syncError = signal('');

  /** the underlying client, for feature data-services to query */
  get client(): SupabaseClient | null { ... }

  signInWithGoogle(redirectPath = '/'): Promise<void>;   // redirectTo parametrized
  signUp(email, password, username): Promise<{ error; needsConfirmation }>;
  signInWithPassword(email, password): Promise<{ error }>;
  signOut(): Promise<void>;
}
```

Notes:

- **Bug to fix while moving:** `signInWithGoogle` currently hardcodes
  `redirectTo: ${origin}/quick-notes`. Parametrize it (`redirectPath`) so each app
  passes its own post-login route (`/board` for the new app).
- `environment.supabaseUrl` / `environment.supabaseAnonKey` stay per-app (each app has
  its own `environment.ts`), pointing at the **same Supabase project** so accounts and
  data are shared across apps.
- `@pockly/shared` must add `@supabase/supabase-js` to its peer deps and be rebuilt
  (`pnpm --filter @pockly/shared build`) — remember shared is compiled to `dist/`
  (`77bbb4d`).
- `text/` is updated to consume the shared `AuthService` (it keeps a thin local notes
  data-service only if quick-notes survives during the deprecation window — see §11).

---

## 7. Data models

### 7.1 Board (tasks)

`Note` is renamed to **`Task`** in the new app (it is conceptually a task). The Supabase
table stays named `notes` for data continuity (see §11); the mapping bridges the names.

```ts
// day/src/app/components/pages/board/task.model.ts
export type Horizon = 'today' | 'week' | 'someday';   // drives the column
export type Priority = 'high' | 'medium' | 'low';      // optional tag/color now

export interface ChecklistItem { id: string; text: string; checked: boolean; }

export interface Task {
  id: string;
  title: string;
  description: string;
  category?: string;
  horizon: Horizon;        // NEW — replaces priority as the column key
  priority?: Priority;      // DEMOTED — optional tag, no longer a column
  checklist: ChecklistItem[];
  createdAt: number;
  updatedAt: number;
}

export interface BoardState { tasks: Task[]; version: number; }

export const STORAGE_KEY = 'pockly-board-v1';
export const CURRENT_VERSION = 1;
```

### 7.2 Habits

```ts
// day/src/app/components/pages/habits/habit.model.ts
export interface Habit {
  id: string;
  name: string;
  color: string;        // reuse the palette used for priority chips
  createdAt: number;
  archived: boolean;
  sortOrder: number;
}

/** one entry per habit per completed day */
export interface HabitLog {
  habitId: string;
  date: string;         // 'YYYY-MM-DD' in the user's local timezone
}

export interface HabitsState { habits: Habit[]; logs: HabitLog[]; version: number; }
export const STORAGE_KEY = 'pockly-habits-v1';
```

Streaks are **computed client-side** from `logs` (no stored streak counter): current
streak = consecutive days up to today; "best" optional for v2.

### 7.3 Scratchpad

```ts
// day/src/app/components/pages/scratchpad/scratchpad.model.ts
export interface Scratchpad { content: string; updatedAt: number; }  // markdown
export const STORAGE_KEY = 'pockly-scratchpad-v1';
```

A **single** pad per user (v1). This deliberately restores what quick-notes *originally*
was before it grew into a kanban — the legacy-migration code in `quick-notes.ts` shows
the old data was a single plain-text blob. Multiple named pads are a v2 idea.

---

## 8. Persistence

Same contract as today's quick-notes: **localStorage is the source of truth offline; on
login, Supabase syncs and localStorage acts as cache.** Debounced save (~500 ms) on
every state change, mirroring `DEBOUNCE_MS` in `quick-notes.ts`.

| Tool | localStorage key | Supabase table(s) |
| --- | --- | --- |
| Board | `pockly-board-v1` | `notes` (existing; **+ `horizon` column**) |
| Habits | `pockly-habits-v1` | `habits`, `habit_logs` |
| Scratchpad | `pockly-scratchpad-v1` | `scratchpad` |

### 8.1 Supabase DDL

```sql
-- BOARD: extend the existing notes table (do NOT recreate)
alter table notes
  add column if not exists horizon text not null default 'week'
  check (horizon in ('today', 'week', 'someday'));

-- backfill horizon from the old priority columns
update notes set horizon = case priority
  when 'high'   then 'today'
  when 'medium' then 'week'
  when 'low'    then 'someday'
  else 'week'
end;
-- priority stays as an (now optional) tag column

-- HABITS
create table if not exists habits (
  id          uuid primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  color       text,
  created_at  timestamptz not null default now(),
  archived    boolean not null default false,
  sort_order  int
);

create table if not exists habit_logs (
  habit_id  uuid not null references habits(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  log_date  date not null,
  primary key (habit_id, log_date)
);

-- SCRATCHPAD (one row per user)
create table if not exists scratchpad (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  content    text not null default '',
  updated_at timestamptz not null default now()
);

-- RLS: each user only sees their own rows
alter table habits      enable row level security;
alter table habit_logs  enable row level security;
alter table scratchpad  enable row level security;

create policy "own habits"     on habits     for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own habit_logs" on habit_logs for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own scratchpad" on scratchpad for all using (user_id = auth.uid()) with check (user_id = auth.uid());
```

> Confirm `notes` already has RLS scoped to `user_id = auth.uid()`; if not, add the same
> policy. The existing CRUD already filters by `user_id`.

---

## 9. Tool A — Board (rework of quick-notes)

**Goal:** same drag-and-drop board, reframed from priority to time horizon.

What is **reused almost verbatim** from quick-notes:

- The whole drag/drop + reorder + cross-column merge logic
  (`onNoteDropped`, `onColumnReordered`, `mergePriorityNotes`) — rename `priority` →
  `horizon`, keep the algorithm.
- `task-column` (ex `note-column`): swap the `priority`-based title/color getters for
  `horizon` values; the red/amber/green color logic maps to today/week/someday.
- `task-card`, `task-detail`, `create-task-form` (ex `note-*`): drop the priority
  **column selector**; add an **optional priority tag** picker and a horizon picker.
- localStorage load/save + debounce + Supabase sync flow.

What **changes**:

- Columns: `Today` / `This week` / `Someday` (3 columns, `cdkDropListGroup` unchanged).
- `priority` is no longer the column key. It becomes an optional colored chip on the card.
- `create-task-form` defaults new tasks to `horizon: 'today'`.
- Column titles/colors:
  - Today → accent strong (e.g. olive-deep / orange per `DESIGN.md`)
  - This week → mid accent
  - Someday → muted/sage
  - (keep within the PostHog sage/olive system, not the raw red/amber/green — see §13)

**Column → data mapping table**

| Old (priority) | New (horizon) | Backfill |
| --- | --- | --- |
| high | today | high → today |
| medium | week | medium → week |
| low | someday | low → someday |

---

## 10. Tool B — Habits

**Goal:** track recurring daily habits with a streak — the recurring side the board
handles poorly.

- **Layout:** list of habit rows. Each row = habit name + a strip of the last N days
  (e.g. 7) as toggleable dots + current streak count.
- **Interaction:** tap today's dot to mark done (writes a `HabitLog` for today's local
  date); tap again to undo. Add habit via `create-habit-form` (name + color). Archive /
  delete habit.
- **Streak:** computed from `logs` — count back consecutive days including today.
- **Persistence:** `habits.service.ts` mirrors the board service — localStorage + on
  login push/pull `habits` and `habit_logs`. Marking a day = upsert/delete a
  `habit_logs` row.

Edge cases to handle:

- Timezone: store `log_date` as the user's **local** date string, not UTC, so "today"
  matches what the user sees.
- Idempotent toggles (unique PK `(habit_id, log_date)` already enforces this server-side).

---

## 11. Tool C — Scratchpad

**Goal:** the "quick" capture that the board lost — a single fast pad.

- A single full-height `<textarea>` (or contenteditable) bound to a `content` signal.
- **Autosave** on input, debounced (~500 ms) to localStorage; synced to the `scratchpad`
  row on login.
- Render mode (markdown preview) is optional for v1 — plain markdown text editing is
  enough; a preview toggle can come later. **Decide before build:** edit-only vs
  edit+preview (recommend edit-only for v1 to stay "quick").
- A subtle "saved" indicator + last-updated timestamp.

---

## 12. Migration & `text/` cleanup

> ⚠️ **Cross-domain reality:** each app is a separate Vercel project = separate origin.
> `localStorage` is per-origin, so a user's `pockly-quick-notes-v2` data lives on the
> `text` domain and will **not** be visible to the new `day` domain automatically.

**Continuity strategy**

- **Logged-in users:** automatic. The new Board reads the **same `notes` table** in the
  **same Supabase project**; the `horizon` backfill (§8.1) makes existing notes land in
  sensible columns. Nothing to export.
- **Local-only users:** their board data is stranded on the old origin. Provide a
  one-time bridge:
  1. Before removing quick-notes from `text/`, replace its page with a **deprecation
     view**: a banner "Quick Notes moved to Pockly Day" + an **Export (JSON)** button.
  2. The new Board offers an **Import (JSON)** action that maps old notes
     (`priority` → `horizon`) into the local board state.
  3. Keep the deprecation page for ~1 release, then convert `/quick-notes` to a redirect.

**`text/` removal checklist**

- Delete `src/app/components/pages/quick-notes/` (page, model, css, html) — **after** the
  deprecation window, or convert it to the deprecation view first.
- Delete `src/app/components/ui/note-card/`, `note-column/`, `note-detail/`,
  `create-note-form/`.
- Remove the `quick-notes` route from `text/src/app/app.routes.ts`; add a redirect or
  deprecation route.
- `text/` used `SupabaseService` **only** for quick-notes. Once quick-notes is gone,
  remove the local `SupabaseService` (or replace with the shared `AuthService` if any
  residual deprecation/export view still needs auth). Drop `@supabase/supabase-js` from
  `text/` deps if fully unused.
- Update `text/` nav + home tool grid to drop the Quick Notes entry.
- Update `text/src/app/translations.ts` to remove now-unused quick-notes keys.

**Docs to update**

- Root `README.md`: remove "Quick Notes" from the Text table and the quick-reference;
  add the new app's category + its three tools.
- `AGENTS.md`: add `day/` to the apps table.
- `landing/`: add the new app/category to whatever drives the marketing tool list, and
  remove Quick Notes from the Text category there.

---

## 13. Design system & i18n

- **Reuse the existing PostHog-inspired `DESIGN.md`** (warm parchment `#fdfdf8`, olive
  ink `#4d4f46`, sage borders `#bfc1b7`, orange `#F54E00` hover flash, IBM Plex Sans).
  Copy `DESIGN.md` into `day/` and keep the same Tailwind tokens. The current quick-notes
  uses raw `text-red-600/amber-600/green-600` for columns — **re-map horizon colors into
  the sage/olive system** rather than carrying the raw traffic-light palette over.
- **i18n:** the app gets its own `translations.ts` consumed via the shared
  `LanguageService` (same pattern as every other app). New keys for board horizons,
  habits, scratchpad; drop the priority-column keys.
- **SEO:** per-route `seo.config.ts` via the shared `SeoService`, like the other apps.

---

## 14. Out of scope (v2+)

Pomodoro / focus timer · time-blocking / daily planner · multiple named scratchpads ·
markdown preview pane · habit reminders / push notifications · sharing / collaboration ·
cross-device real-time (current sync is load/save, not live).

---

## 15. Build phases

1. **Scaffold `day/`** — copy app shape from `text/`, wire `@pockly/shared`, PWA, env,
   routes, home, nav/footer, empty pages.
2. **Shared auth refactor** — extract `AuthService` into `@pockly/shared` (parametrized
   `redirectTo`), rebuild shared, point `text/` at it.
3. **Board** — move + rework quick-notes → horizon columns + priority-as-tag; board
   service (localStorage + `notes` sync); `horizon` DDL + backfill.
4. **Scratchpad** — simplest tool; validates the new persistence/sync service shape.
5. **Habits** — habits + logs model, services, streak logic, DDL + RLS.
6. **Migration & cleanup** — deprecation/export in `text/`, import in `day`, remove
   quick-notes + unused Supabase from `text/`, update README/AGENTS/landing.

Each phase is independently shippable; phases 3–5 are parallelizable after 1–2.

---

## 16. Open questions / risks

- **Name** — confirm `day/` vs `organize/` vs `desk/` (§4).
- **Scratchpad scope** — edit-only vs edit+preview for v1 (recommend edit-only).
- **`notes` RLS** — confirm the existing table already enforces `user_id = auth.uid()`.
- **Deprecation window** — keep a quick-notes export page in `text/` for one release, or
  hard-redirect immediately? (recommend: one release with export.)
- **Vercel** — a new Vercel project + domain/subdomain must be provisioned for `day/`.
```
