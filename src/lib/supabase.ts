import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// ─── Browser client (use inside "use client" components) ─────────────────────
export function createBrowserSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase public env vars");
  return createBrowserClient(url, key);
}

// ─── Server client (Server Components, Server Actions, Route Handlers) ────────
// Reads/writes HTTP-only cookies to maintain the user session.
export async function createServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase public env vars");

  // cookies() is async in Next.js 16
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll called from a Server Component — cookies can't be set.
          // Safe to ignore; the middleware (proxy.ts) handles session refresh.
        }
      },
    },
  });
}

// ─── Admin / service-role client (API routes only, never expose to browser) ───
export function createAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase service-role env vars");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

// Legacy alias kept for existing /api/contact route
export { createAdminSupabase as createServerSupabase_Admin };
