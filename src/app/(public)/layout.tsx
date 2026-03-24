import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createServerSupabase } from "@/lib/supabase";
import type { UserProfile } from "@/types";

// Public pages layout — wraps all marketing pages with Header + Footer
export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let headerUser = null;
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("email, full_name, avatar_url")
        .eq("id", user.id)
        .single<Pick<UserProfile, "email" | "full_name" | "avatar_url">>();
      if (profile) headerUser = profile;
    }
  } catch {
    // Missing env vars during build — header falls back to "Get Started"
  }

  return (
    <>
      <Header user={headerUser} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
