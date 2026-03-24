import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";
import { Sidebar } from "@/components/dashboard/sidebar";
import type { UserProfile } from "@/types";

// Admin layout reuses the same sidebar but verifies admin role server-side too
// (proxy.ts handles the first check; this is defence-in-depth)
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single<UserProfile>();

  if (!profile || profile.role !== "admin") redirect("/dashboard");

  return (
    <div className="flex h-screen bg-[#0A0F1E] overflow-hidden">
      <Sidebar profile={profile} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
