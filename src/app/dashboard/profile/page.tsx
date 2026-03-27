import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";
import { ProfileForm } from "./profile-form";
import type { UserProfile } from "@/types";

export const dynamic = 'force-dynamic';
export const metadata = { title: "My Profile | Dashboard" };

export default async function ProfilePage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single() as { data: UserProfile | null };

  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <p className="text-slate-400 text-sm mt-1">Update your personal information.</p>
      </div>
      <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
