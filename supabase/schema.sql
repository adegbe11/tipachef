-- Run this in your Supabase SQL editor to set up the database
-- If the database already exists, run these migrations:
--   create policy "Tips with messages are publicly readable" on tips
--     for select using (message is not null);
--
--   alter table chefs add column if not exists tip_reward text;

-- ── Chefs ────────────────────────────────────────────────
create table if not exists chefs (
  id            uuid references auth.users(id) on delete cascade primary key,
  slug          text unique not null,
  name          text,
  role          text,
  restaurant    text,
  hook          text,
  bio           text,
  image_url     text,
  avatar_url    text,
  cover_url     text,
  goal_label    text,
  goal_target   integer default 0,
  goal_current  integer default 0,
  stripe_account_id text,
  instagram_url text,
  tiktok_url    text,
  youtube_url   text,
  tip_reward    text,
  city          text,
  cuisines      text,
  available_for_hire boolean default false,
  hire_event_types text,
  hire_rate     text,
  hire_bio      text,
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

-- Tip rows are written only by the verified Stripe webhook through the
-- service-role client. No public insert policy is intentionally defined.

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

-- Posts and recipes
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  chef_id uuid references chefs(id) on delete cascade not null,
  title text not null check (char_length(title) between 1 and 160),
  body text,
  post_type text not null default 'update' check (post_type in ('update', 'recipe')),
  ingredients text,
  prep_time text,
  cook_time text,
  servings text,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table posts enable row level security;
create policy "Public posts are readable" on posts for select using (is_public = true or auth.uid() = chef_id);
create policy "Chef manages own posts" on posts for all using (auth.uid() = chef_id) with check (auth.uid() = chef_id);

-- Hiring leads are private to the recipient chef. Inserts are performed by
-- the validated server route with the service-role client.
create table if not exists hire_inquiries (
  id uuid default gen_random_uuid() primary key,
  chef_id uuid references chefs(id) on delete cascade not null,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) <= 254),
  event_type text,
  event_date date,
  guest_count integer check (guest_count between 1 and 1000),
  message text check (char_length(message) <= 2000),
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'closed')),
  created_at timestamptz not null default now()
);
alter table hire_inquiries enable row level security;
create policy "Chef reads own hire inquiries" on hire_inquiries for select using (auth.uid() = chef_id);
create policy "Chef updates own hire inquiries" on hire_inquiries for update using (auth.uid() = chef_id) with check (auth.uid() = chef_id);
