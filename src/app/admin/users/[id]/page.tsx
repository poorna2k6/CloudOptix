import { notFound, redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { UserRoleForm } from "./user-role-form";
import type { UserProfile } from "@/types";

export const dynamic = 'force-dynamic';
export const metadata = { title: "User Detail | Admin" };

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params is a Promise in Next.js 16
  const { id } = await params;

  const supabase = await createServerSupabase();
  const { data: u, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", id)
    .single() as { data: UserProfile | null; error: any };

  if (error || !u) notFound();

  return (
    <div className="max-w-xl">
      <div className="mb-6">
        <a href="/admin/users" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
          ← Back to users
        </a>
        <h1 className="text-2xl font-bold text-white mt-3">{u.full_name || u.email}</h1>
        <p className="text-slate-400 text-sm mt-1">{u.email}</p>
      </div>

      <div className="bg-white/[0.03] border border-white/8 rounded-xl p-6 space-y-6">
        {/* Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <InfoRow label="Role">
            <Badge variant={u.role === "admin" ? "violet" : "outline"}>{u.role}</Badge>
          </InfoRow>
          <InfoRow label="Status">
            <Badge variant={u.is_active ? "teal" : "outline"}>
              {u.is_active ? "Active" : "Inactive"}
            </Badge>
          </InfoRow>
          <InfoRow label="Company">{u.company || "—"}</InfoRow>
          <InfoRow label="Phone">{u.phone || "—"}</InfoRow>
          <InfoRow label="Joined">
            {new Date(u.created_at).toLocaleDateString("en-US", {
              month: "long", day: "numeric", year: "numeric",
            })}
          </InfoRow>
        </div>

        <div className="border-t border-white/8 pt-5">
          <UserRoleForm user={u} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <div className="text-slate-200">{children}</div>
    </div>
  );
}
