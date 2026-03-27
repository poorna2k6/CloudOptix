import Link from "next/link";
import { Cloud } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center px-4 py-12">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* Brand logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <Cloud className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">
          <span className="gradient-text">Qor</span>
          <span className="text-white">vari</span>
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white/[0.03] border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black/40 relative z-10">
        {children}
      </div>

      <p className="mt-6 text-xs text-slate-600 text-center">
        © {new Date().getFullYear()} Qorvari · All rights reserved
      </p>
    </div>
  );
}
