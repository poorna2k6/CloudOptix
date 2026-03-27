import { createServerSupabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import type { ContactLead } from "@/types";

export const dynamic = 'force-dynamic';
export const metadata = { title: "Leads | Dashboard" };

const STATUS_STYLES: Record<string, "cyan" | "blue" | "violet" | "teal" | "outline"> = {
  new: "cyan",
  contacted: "blue",
  qualified: "teal",
  closed: "outline",
};

export default async function LeadsPage() {
  const supabase = await createServerSupabase();
  const { data: leads, error } = await supabase
    .from("contact_leads")
    .select("*")
    .order("created_at", { ascending: false }) as { data: ContactLead[] | null; error: any };

  if (error) {
    return <p className="text-red-400 text-sm">Failed to load leads: {error.message}</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Leads</h1>
          <p className="text-sm text-slate-400 mt-1">{leads?.length ?? 0} total inquiries</p>
        </div>
      </div>

      {!leads?.length ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-white/8 rounded-xl bg-white/[0.02]">
          <MessageSquare className="w-10 h-10 text-slate-600 mb-3" />
          <p className="text-slate-400 font-medium">No leads yet</p>
          <p className="text-slate-600 text-sm mt-1">Leads will appear here when someone submits the contact form.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/[0.02]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{lead.company}</td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{lead.service}</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_STYLES[lead.status] ?? "outline"}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">
                    {new Date(lead.created_at).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
