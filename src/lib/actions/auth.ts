"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase";

// ─── Zod v4 schemas ───────────────────────────────────────────────────────────

const signInSchema = z.object({
  email: z.string().email({ error: "Enter a valid email address" }),
  password: z.string().min(6, { error: "Password must be at least 6 characters" }),
});

const signUpSchema = z.object({
  full_name: z.string().min(2, { error: "Name must be at least 2 characters" }).trim(),
  email: z.string().email({ error: "Enter a valid email address" }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { error: "Include at least one uppercase letter" })
    .regex(/[0-9]/, { error: "Include at least one number" }),
  confirm_password: z.string(),
});

const resetRequestSchema = z.object({
  email: z.string().email({ error: "Enter a valid email address" }),
});

const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { error: "Include at least one uppercase letter" })
    .regex(/[0-9]/, { error: "Include at least one number" }),
  confirm_password: z.string(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type AuthActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

// ─── Sign in ─────────────────────────────────────────────────────────────────

export async function signIn(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { message: error.message };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  redirect(redirectTo ?? "/dashboard");
}

// ─── Sign up ─────────────────────────────────────────────────────────────────

export async function signUp(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    full_name: formData.get("full_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };

  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  if (parsed.data.password !== parsed.data.confirm_password) {
    return { errors: { confirm_password: ["Passwords do not match"] } };
  }

  const supabase = await createServerSupabase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.full_name },
      emailRedirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    return { message: error.message };
  }

  redirect("/verify-email");
}

// ─── Sign out ─────────────────────────────────────────────────────────────────

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/login");
}

// ─── Send password reset email ────────────────────────────────────────────────

export async function sendPasswordReset(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = { email: formData.get("email") as string };
  const parsed = resetRequestSchema.safeParse(raw);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createServerSupabase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${siteUrl}/reset-password`,
  });

  if (error) {
    return { message: error.message };
  }

  return { success: true, message: "Check your email for a password reset link." };
}

// ─── Update password (after clicking reset link) ──────────────────────────────

export async function updatePassword(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };

  const parsed = updatePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  if (parsed.data.password !== parsed.data.confirm_password) {
    return { errors: { confirm_password: ["Passwords do not match"] } };
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

  if (error) {
    return { message: error.message };
  }

  redirect("/dashboard");
}

// ─── Google OAuth ─────────────────────────────────────────────────────────────

export async function signInWithGoogle(): Promise<{ url: string | null; error: string | null }> {
  const supabase = await createServerSupabase();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl}/auth/callback` },
  });

  if (error) return { url: null, error: error.message };
  return { url: data.url, error: null };
}

// ─── Update own profile ───────────────────────────────────────────────────────

const profileSchema = z.object({
  full_name: z.string().min(2, { error: "Name must be at least 2 characters" }).trim(),
  company: z.string().optional(),
  phone: z.string().optional(),
});

export async function updateProfile(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    full_name: formData.get("full_name") as string,
    company: (formData.get("company") as string) || undefined,
    phone: (formData.get("phone") as string) || undefined,
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { message: "Not authenticated" };

  const { error } = await supabase
    .from("user_profiles")
    .update({ full_name: parsed.data.full_name, company: parsed.data.company, phone: parsed.data.phone })
    .eq("id", user.id);

  if (error) return { message: error.message };
  return { success: true, message: "Profile updated." };
}
