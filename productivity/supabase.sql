-- Productivity app remote sync schema (apply manually in Supabase before enabling sync).

alter table notes
  add column if not exists horizon text not null default 'week'
  check (horizon in ('today', 'week', 'someday'));

-- SECURITY: the `notes` table is shared by the productivity (tasks) and text
-- (quick-notes) apps, and both read it with select('*') relying entirely on RLS
-- to isolate rows per user. RLS MUST be enabled with an owner-only policy,
-- otherwise every user can read every other user's notes and tasks.
alter table notes enable row level security;
drop policy if exists "own notes" on notes;
create policy "own notes" on notes for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

update notes set horizon = case priority
  when 'high' then 'today'
  when 'medium' then 'week'
  when 'low' then 'someday'
  else 'week'
end;

create table if not exists habits (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text,
  created_at timestamptz not null default now(),
  archived boolean not null default false,
  sort_order int
);

create table if not exists habit_logs (
  habit_id uuid not null references habits(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  log_date date not null,
  primary key (habit_id, log_date)
);

create table if not exists scratchpad (
  user_id uuid primary key references auth.users(id) on delete cascade,
  content text not null default '',
  updated_at timestamptz not null default now()
);

alter table habits enable row level security;
alter table habit_logs enable row level security;
alter table scratchpad enable row level security;

drop policy if exists "own habits" on habits;
drop policy if exists "own habit_logs" on habit_logs;
drop policy if exists "own scratchpad" on scratchpad;

create policy "own habits" on habits for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own habit_logs" on habit_logs for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own scratchpad" on scratchpad for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Notification preferences
create table if not exists notification_preferences (
  user_id              uuid primary key references auth.users(id) on delete cascade,
  timezone             text not null default 'UTC',
  reminder_time        time not null default '20:00',
  habit_reminder_on    boolean not null default true,
  task_reminder_on     boolean not null default true,
  streak_alert_on      boolean not null default true,
  push_enabled         boolean not null default true,
  updated_at           timestamptz not null default now()
);

alter table notification_preferences enable row level security;
drop policy if exists "own notification_preferences" on notification_preferences;
create policy "own notification_preferences" on notification_preferences for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Push subscriptions (one per device per user)
create table if not exists push_subscriptions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  endpoint    text not null,
  p256dh      text not null,
  auth_key    text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, endpoint)
);

alter table push_subscriptions enable row level security;
drop policy if exists "own push_subscriptions" on push_subscriptions;
create policy "own push_subscriptions" on push_subscriptions for all using (user_id = auth.uid()) with check (user_id = auth.uid());
