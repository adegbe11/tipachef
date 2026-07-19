-- ─────────────────────────────────────────────────────────────────────────────
-- TipAChef full migration — safe to run on ANY existing database
-- Adds every column that might be missing. Skips ones that already exist.
-- Run this once in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- Chefs: add all columns that were introduced after initial launch
alter table chefs add column if not exists hook          text;
alter table chefs add column if not exists bio           text;
alter table chefs add column if not exists image_url     text;
alter table chefs add column if not exists cover_url     text;
alter table chefs add column if not exists goal_label    text;
alter table chefs add column if not exists goal_target   integer default 0;
alter table chefs add column if not exists goal_current  integer default 0;
alter table chefs add column if not exists stripe_account_id text;
alter table chefs add column if not exists instagram_url text;
alter table chefs add column if not exists tiktok_url    text;
alter table chefs add column if not exists youtube_url   text;
alter table chefs add column if not exists tip_reward    text;
alter table chefs add column if not exists city          text;
alter table chefs add column if not exists updated_at    timestamptz default now();
alter table chefs add column if not exists cuisines      text;
alter table chefs add column if not exists available_for_hire boolean default false;
alter table chefs add column if not exists hire_event_types text;
alter table chefs add column if not exists hire_rate     text;
alter table chefs add column if not exists hire_bio      text;

-- Index for fast city lookups (powers /chefs/[city] pages)
create index if not exists chefs_city_idx on chefs (city);

-- Tips: add columns used by webhook and Wall of Love
alter table tips add column if not exists tipper_name       text;
alter table tips add column if not exists stripe_payment_id text;

-- Tips: ensure public Wall-of-Love policy exists (skip if already there)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'tips'
      and policyname = 'Tips with messages are publicly readable'
  ) then
    execute $p$
      create policy "Tips with messages are publicly readable" on tips
        for select using (message is not null)
    $p$;
  end if;
end $$;

-- Refresh PostgREST schema cache so new columns are visible immediately
notify pgrst, 'reload schema';

-- Chef posts and recipes
create table if not exists posts (
  id          uuid default gen_random_uuid() primary key,
  chef_id     uuid references chefs(id) on delete cascade not null,
  title       text not null check (char_length(title) between 1 and 160),
  body        text,
  post_type   text not null default 'update' check (post_type in ('update', 'recipe')),
  ingredients text,
  prep_time   text,
  cook_time   text,
  servings    text,
  is_public   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists posts_chef_created_idx on posts (chef_id, created_at desc);
alter table posts enable row level security;

drop policy if exists "Public posts are readable" on posts;
create policy "Public posts are readable" on posts for select using (is_public = true or auth.uid() = chef_id);
drop policy if exists "Chef manages own posts" on posts;
create policy "Chef manages own posts" on posts for all using (auth.uid() = chef_id) with check (auth.uid() = chef_id);

-- Private hiring leads. Only the owning chef can read or update them; public
-- submissions go through the validated server route using the service role.
create table if not exists hire_inquiries (
  id          uuid default gen_random_uuid() primary key,
  chef_id     uuid references chefs(id) on delete cascade not null,
  name        text not null check (char_length(name) between 1 and 100),
  email       text not null check (char_length(email) <= 254),
  event_type  text,
  event_date  date,
  guest_count integer check (guest_count between 1 and 1000),
  message     text check (char_length(message) <= 2000),
  status      text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed')),
  created_at  timestamptz not null default now()
);

create index if not exists hire_inquiries_chef_created_idx on hire_inquiries (chef_id, created_at desc);
alter table hire_inquiries enable row level security;

drop policy if exists "Chef reads own hire inquiries" on hire_inquiries;
create policy "Chef reads own hire inquiries" on hire_inquiries for select using (auth.uid() = chef_id);
drop policy if exists "Chef updates own hire inquiries" on hire_inquiries;
create policy "Chef updates own hire inquiries" on hire_inquiries for update using (auth.uid() = chef_id) with check (auth.uid() = chef_id);

notify pgrst, 'reload schema';
