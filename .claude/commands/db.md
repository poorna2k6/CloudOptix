---
name: db
description: Database migrations, query optimization, and RLS policy helper for Supabase
---

# Database Assistant

You are a Supabase/PostgreSQL expert. Help with migrations, query optimization, and Row Level Security.

## Migration Workflow

### Create a New Migration
```bash
# Always timestamp migrations for ordering
# Format: supabase/migrations/NNN_description.sql
# Example: supabase/migrations/003_add_billing.sql
```

### Migration Template
```sql
-- Migration: 003_add_billing
-- Description: Add billing tables for Stripe integration
-- Rollback: DROP TABLE IF EXISTS public.billing_subscriptions;

-- ============================================================
-- UP
-- ============================================================

create table if not exists public.billing_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  plan text not null default 'free',
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_billing_subscriptions_user_id on public.billing_subscriptions(user_id);
create index idx_billing_subscriptions_stripe_customer on public.billing_subscriptions(stripe_customer_id);

-- Updated_at trigger
create trigger set_updated_at
  before update on public.billing_subscriptions
  for each row execute function public.handle_updated_at();

-- RLS
alter table public.billing_subscriptions enable row level security;

create policy "Users can read own subscription"
  on public.billing_subscriptions for select
  using (auth.uid() = user_id);

-- No INSERT/UPDATE/DELETE for users — only service role writes billing data
```

## RLS Policy Patterns

### Pattern 1: Users own their data
```sql
-- Read own
create policy "read_own" on public.table_name for select
  using (auth.uid() = user_id);

-- Write own  
create policy "write_own" on public.table_name for insert
  with check (auth.uid() = user_id);
```

### Pattern 2: Admins see all, users see own
```sql
create policy "select_policy" on public.table_name for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );
```

### Pattern 3: Service role only (no user access)
```sql
-- Enable RLS but add NO policies → only service_role bypass works
alter table public.sensitive_table enable row level security;
-- Use createAdminSupabase() in your app code
```

### Pattern 4: Public read, authenticated write
```sql
create policy "public_read" on public.table_name for select
  using (true);

create policy "auth_write" on public.table_name for insert
  with check (auth.role() = 'authenticated');
```

## Query Optimization Checklist

1. **Check EXPLAIN ANALYZE** for queries > 100ms
2. **Index foreign keys** — Supabase doesn't do this automatically
3. **Index filter columns** — any column in `.eq()`, `.in()`, `.like()`
4. **Avoid SELECT *** — select only needed columns
5. **Use `.range()` for pagination** — never `.limit()` without `.order()`
6. **Batch inserts** — use `.insert([...array])` not loops

## Common Supabase Client Patterns

```typescript
// ✅ Server component (SSR)
const supabase = await createServerSupabase()
const { data, error } = await supabase.from('table').select('*')

// ✅ Service role (bypasses RLS — use in Server Actions/API routes only)
const admin = createAdminSupabase()
const { data } = await admin.from('contact_leads').select('*')

// ❌ NEVER use admin client in client components
// ❌ NEVER expose service role key to browser
```

## Instructions

When the user asks about database work:
1. Check existing migrations in `supabase/migrations/`
2. Understand the current schema before suggesting changes
3. Always write forward migrations (with rollback comment)
4. Always add RLS policies to new tables
5. Always add indexes for foreign keys and common filter columns
6. Warn if a migration might lock tables (ALTER COLUMN on large tables)
