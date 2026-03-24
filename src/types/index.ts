export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  color: string;
}

export interface Industry {
  icon: string;
  name: string;
  description: string;
}

// ─── Auth / User Management ───────────────────────────────────────────────────

export type UserRole = "admin" | "member";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
  company: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
