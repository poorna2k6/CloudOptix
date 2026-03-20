import { createClient } from "@supabase/supabase-js";

// Lazy client — safe when env vars aren't set at build time
let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error("Supabase env vars not set");
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Server-side client — only used in API routes, never at build time
export function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase server env vars not set");
  return createClient(url, key);
}
