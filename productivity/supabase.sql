-- Productivity app remote sync schema (apply manually in Supabase before enabling sync).

alter table notes
  add column if not exists horizon text not null default 'week'
  check (horizon in ('today', 'week', 'someday'));

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
