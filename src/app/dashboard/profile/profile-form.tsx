"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions/auth";
import type { AuthActionState } from "@/lib/actions/auth";
import type { UserProfile } from "@/types";

const initialState: AuthActionState = {};

export function ProfileForm({ profile }: { profile: UserProfile | null }) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.success && (
        <div className="flex items-center gap-2 rounded-lg bg-teal-500/10 border border-teal-500/20 px-4 py-3 text-sm text-teal-400">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {state.message}
        </div>
      )}
      {state.message && !state.success && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          name="full_name"
          defaultValue={profile?.full_name ?? ""}
          error={state.errors?.full_name?.[0]}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email (read-only)</Label>
        <Input id="email" value={profile?.email ?? ""} readOnly disabled />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          defaultValue={profile?.company ?? ""}
          placeholder="Acme Corp"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile?.phone ?? ""}
          placeholder="+1 555 000 0000"
        />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
