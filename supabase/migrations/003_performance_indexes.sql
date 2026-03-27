-- ─────────────────────────────────────────────────────────────────────────────
-- 003_performance_indexes.sql
-- Performance optimization indexes for CloudOptix
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Contact Leads Performance Indexes ────────────────────────────────────────

-- Composite index for common query patterns (status + created_at)
CREATE INDEX IF NOT EXISTS contact_leads_created_at_status_idx 
  ON public.contact_leads (created_at DESC, status);

-- Index for company lookups
CREATE INDEX IF NOT EXISTS contact_leads_company_idx 
  ON public.contact_leads (company);

-- Index for service type filtering
CREATE INDEX IF NOT EXISTS contact_leads_service_idx 
  ON public.contact_leads (service);

-- ── User Profiles Performance Indexes ─────────────────────────────────────────

-- Index for sorting by creation date
CREATE INDEX IF NOT EXISTS user_profiles_created_at_idx 
  ON public.user_profiles (created_at DESC);

-- Composite index for active users by role (most common admin query)
CREATE INDEX IF NOT EXISTS user_profiles_role_active_idx 
  ON public.user_profiles (role, is_active) 
  WHERE is_active = true;

-- Index for audit queries (updated_at)
CREATE INDEX IF NOT EXISTS user_profiles_updated_at_idx 
  ON public.user_profiles (updated_at DESC);

-- Partial index for admin user lookups (smaller, faster)
CREATE INDEX IF NOT EXISTS user_profiles_admin_lookup_idx 
  ON public.user_profiles (role, is_active, created_at DESC) 
  WHERE role = 'admin';

-- ── Query Performance Statistics ──────────────────────────────────────────────

-- Update table statistics for query planner optimization
ANALYZE public.contact_leads;
ANALYZE public.user_profiles;

-- ── Comments for Documentation ────────────────────────────────────────────────

COMMENT ON INDEX contact_leads_created_at_status_idx IS 
  'Optimizes queries filtering by status and sorting by creation date';

COMMENT ON INDEX user_profiles_role_active_idx IS 
  'Optimizes admin dashboard queries for active users by role';

COMMENT ON INDEX user_profiles_admin_lookup_idx IS 
  'Partial index for faster admin user queries';

-- Made with Bob
