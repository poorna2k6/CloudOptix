-- CloudOptix: Contact Leads Table
-- Run this in your Supabase SQL editor or via supabase db push

create table if not exists public.contact_leads (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  company      text not null,
  phone        text,
  service      text not null,
  message      text not null,
  status       text not null default 'new',   -- new | contacted | qualified | closed
  notes        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Row Level Security: only service role can read/write (API routes use service role key)
alter table public.contact_leads enable row level security;

create policy "Service role full access"
  on public.contact_leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at
  before update on public.contact_leads
  for each row execute function public.handle_updated_at();

-- Index for fast email lookups
create index if not exists contact_leads_email_idx on public.contact_leads (email);
create index if not exists contact_leads_status_idx on public.contact_leads (status);
create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);
