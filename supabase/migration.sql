-- ─────────────────────────────────────────────────────────────────────────────
-- TipAChef full migration — safe to run on ANY existing database
-- Adds every column that might be missing. Skips ones that already exist.
-- Run this once in the Supabase SQL editor.
-- ─────────────────────────────────────────────────────────────────────────────

-- Chefs: add all columns that were introduced after initial launch
alter table chefs add column if not exists hook          text;
alter table chefs add column if not exists cover_url     text;
alter table chefs add column if not exists goal_label    text;
alter table chefs add column if not exists goal_target   integer default 0;
alter table chefs add column if not exists goal_current  integer default 0;
alter table chefs add column if not exists stripe_account_id text;
alter table chefs add column if not exists instagram_url text;
alter table chefs add column if not exists tiktok_url    text;
alter table chefs add column if not exists youtube_url   text;
alter table chefs add column if not exists tip_reward    text;

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
