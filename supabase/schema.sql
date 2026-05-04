-- Run this in your Supabase SQL editor to set up the database
-- If the database already exists, run only the NEW POLICY below:
--   create policy "Tips with messages are publicly readable" on tips
--     for select using (message is not null);

-- ── Chefs ────────────────────────────────────────────────
create table if not exists chefs (
  id            uuid references auth.users(id) on delete cascade primary key,
  slug          text unique not null,
  name          text,
  role          text,
  restaurant    text,
  hook          text,
  avatar_url    text,
  cover_url     text,
  goal_label    text,
  goal_target   integer default 0,
  goal_current  integer default 0,
  stripe_account_id text,
  instagram_url text,
  tiktok_url    text,
  youtube_url   text,
  created_at    timestamptz default now()
);

alter table chefs enable row level security;

create policy "Chefs are publicly readable" on chefs
  for select using (true);

create policy "Chef can update own profile" on chefs
  for update using (auth.uid() = id);

create policy "Chef can insert own profile" on chefs
  for insert with check (auth.uid() = id);

-- ── Tips ─────────────────────────────────────────────────
create table if not exists tips (
  id                 uuid default gen_random_uuid() primary key,
  chef_id            uuid references chefs(id) on delete cascade not null,
  amount_cents       integer not null,
  message            text,
  tipper_name        text default 'Anonymous',
  stripe_payment_id  text unique,
  created_at         timestamptz default now()
);

alter table tips enable row level security;

create policy "Tips are readable by chef" on tips
  for select using (
    auth.uid() = chef_id
  );

-- Allow public read of tips that have a message (Wall of Love on public profiles)
create policy "Tips with messages are publicly readable" on tips
  for select using (
    message is not null
  );

create policy "Anyone can insert a tip" on tips
  for insert with check (true);

-- ── Extras ───────────────────────────────────────────────
create table if not exists extras (
  id          uuid default gen_random_uuid() primary key,
  chef_id     uuid references chefs(id) on delete cascade not null,
  title       text not null,
  description text,
  price_cents integer not null,
  emoji       text default '📄',
  tag         text,
  active      boolean default true,
  created_at  timestamptz default now()
);

alter table extras enable row level security;

create policy "Extras are publicly readable" on extras
  for select using (active = true);

create policy "Chef manages own extras" on extras
  for all using (auth.uid() = chef_id);

-- ── Function: update goal_current on new tip ─────────────
create or replace function update_chef_goal()
returns trigger as $$
begin
  update chefs
  set goal_current = goal_current + (new.amount_cents / 100)
  where id = new.chef_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_tip_created
  after insert on tips
  for each row execute function update_chef_goal();
