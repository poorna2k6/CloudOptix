import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${BRAND.name}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-4">Terms of Service</h1>
      <p className="text-slate-400 mb-8">Last updated: {BRAND.company.founded}</p>

      <p className="mb-6">
        By accessing or using {BRAND.name}, you agree to be bound by these Terms of
        Service. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">1. Use of Service</h2>
      <p className="mb-6">
        {BRAND.name} provides enterprise cloud transformation services. You agree to
        use the platform only for lawful purposes and in accordance with these terms.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">2. Accounts</h2>
      <p className="mb-6">
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities that occur under your account.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">3. Intellectual Property</h2>
      <p className="mb-6">
        All content, features, and functionality are owned by {BRAND.company.legalName}{" "}
        and are protected by applicable intellectual property laws.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">4. Limitation of Liability</h2>
      <p className="mb-6">
        To the fullest extent permitted by law, {BRAND.company.legalName} shall not be
        liable for any indirect, incidental, or consequential damages arising from your
        use of the service.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">5. Contact</h2>
      <p>
        Questions about these terms? Contact us at{" "}
        <a
          href={`mailto:${BRAND.contact.email}`}
          className="text-cyan-400 hover:text-cyan-300 underline"
        >
          {BRAND.contact.email}
        </a>
        .
      </p>
    </div>
  );
}
