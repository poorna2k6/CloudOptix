import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata = { title: "Verify your email" };

export default function VerifyEmailPage() {
  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-5">
        <Mail className="w-7 h-7 text-cyan-400" />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Check your inbox</h1>
      <p className="text-sm text-slate-400 mb-1">
        We&apos;ve sent a confirmation link to your email address.
      </p>
      <p className="text-sm text-slate-500 mb-8">
        Click the link in the email to activate your account.
      </p>
      <Link
        href="/login"
        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
      >
        Back to sign in
      </Link>
    </div>
  );
}
