"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUserRole, toggleUserActive } from "@/lib/actions/admin";
import type { AdminActionState } from "@/lib/actions/admin";
import type { UserProfile } from "@/types";

const initialState: AdminActionState = {};

export function UserRoleForm({ user }: { user: UserProfile }) {
  const [roleState, roleAction, rolePending] = useActionState(updateUserRole, initialState);
  const [activeState, activeAction, activePending] = useActionState(toggleUserActive, initialState);

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-white">Admin controls</h3>

      {/* Role */}
      <form action={roleAction} className="space-y-3">
        <input type="hidden" name="user_id" value={user.id} />
        {roleState.message && (
          <div className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${roleState.success ? "bg-teal-500/10 border border-teal-500/20 text-teal-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
            {roleState.success && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {roleState.message}
          </div>
        )}
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <Select name="role" defaultValue={user.role}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="secondary" size="md" disabled={rolePending}>
            {rolePending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update role"}
          </Button>
        </div>
      </form>

      {/* Active / Inactive toggle */}
      <form action={activeAction}>
        <input type="hidden" name="user_id" value={user.id} />
        <input type="hidden" name="is_active" value={String(user.is_active)} />
        {activeState.message && (
          <div className={`mb-3 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${activeState.success ? "bg-teal-500/10 border border-teal-500/20 text-teal-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
            {activeState.success && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {activeState.message}
          </div>
        )}
        <Button
          type="submit"
          variant={user.is_active ? "destructive" : "secondary"}
          disabled={activePending}
        >
          {activePending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {user.is_active ? "Deactivate user" : "Activate user"}
        </Button>
      </form>
    </div>
  );
}
