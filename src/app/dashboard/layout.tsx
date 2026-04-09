import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";
import { Sidebar } from "@/components/dashboard/sidebar";
import type { UserProfile } from "@/types";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  // Proxy handles unauthenticated redirects, but double-check here for type safety
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single<UserProfile>();

  if (profile && !profile.is_active) redirect("/login?reason=disabled");

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
