import { createServerSupabase } from "@/lib/supabase";
import { Users, MessageSquare, TrendingUp, Clock } from "lucide-react";
import type { UserProfile } from "@/types";

export const dynamic = 'force-dynamic';
export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { count: leadsCount }, { count: newLeadsCount }] = await Promise.all([
    supabase.from("user_profiles").select("*").eq("id", user!.id).single() as Promise<{ data: UserProfile | null }>,
    supabase.from("contact_leads").select("*", { count: "exact", head: true }),
    supabase.from("contact_leads").select("*", { count: "exact", head: true }).eq("status", "new"),
  ]);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";

  const stats = [
    { label: "Total Leads", value: leadsCount ?? 0, icon: MessageSquare, color: "cyan" },
    { label: "New Leads", value: newLeadsCount ?? 0, icon: TrendingUp, color: "blue" },
    { label: "Avg Response", value: "< 24h", icon: Clock, color: "violet" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Good morning, {firstName} 👋
        </h1>
        <p className="text-slate-400 text-sm">Here&apos;s what&apos;s happening with Qorvari today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-white/[0.03] border border-white/8 rounded-xl p-5 flex items-center gap-4"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-500/10 border border-${color}-500/20`}>
              <Icon className={`w-5 h-5 text-${color}-400`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6">
        <h2 className="text-base font-semibold text-white mb-4">Quick actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <QuickLink
            href="/dashboard/leads"
            icon={MessageSquare}
            title="View all leads"
            desc="Manage and respond to contact inquiries"
          />
          <QuickLink
            href="/dashboard/profile"
            icon={Users}
            title="Update your profile"
            desc="Edit your name, company, and contact info"
          />
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  href, icon: Icon, title, desc,
}: { href: string; icon: React.ElementType; title: string; desc: string }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 p-4 rounded-lg border border-white/8 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
    >
      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-colors">
        <Icon className="w-4 h-4 text-cyan-400" />
      </div>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </a>
  );
}
