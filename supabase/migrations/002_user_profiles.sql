-- ─────────────────────────────────────────────────────────────────────────────
-- 002_user_profiles.sql
-- Stores extended profile data for every authenticated user.
-- auth.users is managed by Supabase; this table adds app-specific fields.
-- ─────────────────────────────────────────────────────────────────────────────

create type public.user_role as enum ('admin', 'member');

create table public.user_profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text        not null,
  full_name     text        not null default '',
  avatar_url    text,
  role          public.user_role not null default 'member',
  company       text,
  phone         text,
  is_active     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Indexes ──────────────────────────────────────────────────────────────────
create index user_profiles_role_idx    on public.user_profiles(role);
create index user_profiles_email_idx   on public.user_profiles(email);
create index user_profiles_active_idx  on public.user_profiles(is_active);

-- ── Row-Level Security ───────────────────────────────────────────────────────
alter table public.user_profiles enable row level security;

-- Users can read their own profile
create policy "users_read_own_profile"
  on public.user_profiles for select
  using (auth.uid() = id);

-- Users can update their own profile (but NOT their role or is_active)
create policy "users_update_own_profile"
  on public.user_profiles for update
  using (auth.uid() = id)
  with check (
    auth.uid() = id
    and role = (select role from public.user_profiles where id = auth.uid())
    and is_active = (select is_active from public.user_profiles where id = auth.uid())
  );

-- Admins can read all profiles
create policy "admins_read_all_profiles"
  on public.user_profiles for select
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins can update any profile (including role and is_active)
create policy "admins_update_all_profiles"
  on public.user_profiles for update
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── Auto-update updated_at ────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger user_profiles_updated_at
  before update on public.user_profiles
  for each row execute function public.handle_updated_at();

-- ── Auto-create profile on signup ─────────────────────────────────────────────
-- Fires whenever a new row is inserted into auth.users (i.e., on every signup).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.user_profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
