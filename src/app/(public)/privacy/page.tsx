import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300">
      <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
      <p className="text-slate-400 mb-8">Last updated: {BRAND.company.founded}</p>

      <p className="mb-6">
        {BRAND.company.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed
        to protecting your personal information. This Privacy Policy explains how we
        collect, use, and safeguard your data when you use {BRAND.name}.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">1. Information We Collect</h2>
      <p className="mb-6">
        We collect information you provide directly (such as your name, email address,
        and company) and information automatically collected when you use our services
        (such as usage data and log information).
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">2. How We Use Your Information</h2>
      <p className="mb-6">
        We use your information to provide and improve our services, communicate with
        you, and comply with legal obligations. We do not sell your personal data to
        third parties.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">3. Data Security</h2>
      <p className="mb-6">
        We implement industry-standard security measures to protect your data. However,
        no method of transmission over the Internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">4. Your Rights</h2>
      <p className="mb-6">
        Depending on your location, you may have rights to access, correct, or delete
        your personal data. Contact us to exercise these rights.
      </p>

      <h2 className="text-xl font-semibold text-white mt-10 mb-3">5. Contact</h2>
      <p>
        Questions about this policy? Contact us at{" "}
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
