"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase, createAdminSupabase } from "@/lib/supabase";

export type AdminActionState = { message?: string; success?: boolean };

// Verify the caller is an admin before any mutation
async function assertAdmin() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") throw new Error("Not authorized");
  return supabase;
}

export async function updateUserRole(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    const supabase = await assertAdmin();
    const userId = formData.get("user_id") as string;
    const role = formData.get("role") as string;

    if (!["admin", "member"].includes(role)) {
      return { message: "Invalid role" };
    }

    const { error } = await supabase
      .from("user_profiles")
      .update({ role })
      .eq("id", userId);

    if (error) return { message: error.message };

    revalidatePath(`/admin/users/${userId}`);
    revalidatePath("/admin/users");
    return { success: true, message: "Role updated." };
  } catch (e) {
    return { message: (e as Error).message };
  }
}

export async function toggleUserActive(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    const supabase = await assertAdmin();
    const userId = formData.get("user_id") as string;
    const isActive = formData.get("is_active") === "true";

    const { error } = await supabase
      .from("user_profiles")
      .update({ is_active: !isActive })
      .eq("id", userId);

    if (error) return { message: error.message };

    // If deactivating, also revoke all sessions via admin client
    if (isActive) {
      const admin = createAdminSupabase();
      await admin.auth.admin.signOut(userId);
    }

    revalidatePath(`/admin/users/${userId}`);
    revalidatePath("/admin/users");
    return { success: true, message: `User ${isActive ? "deactivated" : "activated"}.` };
  } catch (e) {
    return { message: (e as Error).message };
  }
}
