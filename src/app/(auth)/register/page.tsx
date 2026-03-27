"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import type { AuthActionState } from "@/lib/actions/auth";

const initialState: AuthActionState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <>
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
        <p className="text-sm text-slate-400">Get started with Qorvari — no credit card required</p>
      </div>

      <form action={formAction} className="space-y-5">
        {state.message && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {state.message}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            error={state.errors?.full_name?.[0]}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            error={state.errors?.email?.[0]}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            error={state.errors?.password?.[0]}
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm_password">Confirm password</Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            error={state.errors?.confirm_password?.[0]}
            required
          />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {pending ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          By signing up you agree to our{" "}
          <Link href="/terms" className="text-cyan-400 hover:underline">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-cyan-400 hover:underline">Privacy Policy</Link>.
        </p>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </>
  );
}
