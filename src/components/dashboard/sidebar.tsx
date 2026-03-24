"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cloud, LayoutDashboard, Users, MessageSquare, User, LogOut, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/actions/auth";
import type { UserProfile } from "@/types";

interface SidebarProps {
  profile: UserProfile | null;
}

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: MessageSquare },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
];

const adminLinks = [
  { href: "/admin/users", label: "Users", icon: Users },
];

export function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const isAdmin = profile?.role === "admin";

  return (
    <aside className="w-60 shrink-0 flex flex-col h-full bg-[#070C18] border-r border-white/8">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">Cloud</span>
            <span className="text-white">Optix</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <NavItem key={href} href={href} label={label} icon={Icon} active={pathname === href} />
        ))}

        {isAdmin && (
          <>
            <div className="pt-4 pb-1 px-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Admin
              </p>
            </div>
            {adminLinks.map(({ href, label, icon: Icon }) => (
              <NavItem key={href} href={href} label={label} icon={Icon} active={pathname.startsWith(href)} />
            ))}
          </>
        )}
      </nav>

      {/* User footer */}
      <div className="border-t border-white/8 px-3 py-4">
        {profile && (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg mb-1">
            <Avatar name={profile.full_name || profile.email} url={profile.avatar_url} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{profile.full_name || "User"}</p>
              <p className="text-xs text-slate-500 truncate">{profile.email}</p>
            </div>
          </div>
        )}
        <form action={signOut}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

function NavItem({
  href, label, icon: Icon, active,
}: { href: string; label: string; icon: React.ElementType; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        active
          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
    </Link>
  );
}

function Avatar({ name, url }: { name: string; url?: string | null }) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={name} className="w-8 h-8 rounded-full object-cover" />;
  }
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
      {initials}
    </div>
  );
}
