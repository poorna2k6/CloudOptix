import React from "react";
import Link from "next/link";
import { Linkedin, Twitter, Github, Mail, MapPin } from "lucide-react";
import { QorvariLogo } from "@/components/brand/qorvari-logo";
import { BRAND, BRAND_MESSAGING } from "@/lib/brand";

const FOOTER_LINKS = {
  Services: [
    { label: "Discovery & Assessment", href: "/services#discovery" },
    { label: "Cloud Migration", href: "/services#migration" },
    { label: "App Modernization", href: "/services#modernization" },
    { label: "Cloud Optimization", href: "/services#optimization" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Approach", href: "/about#approach" },
    { label: "Partners", href: "/about#partners" },
    { label: "Contact", href: "/contact" },
  ],
  Industries: [
    { label: "Financial Services", href: "/services" },
    { label: "Healthcare", href: "/services" },
    { label: "Retail & eCommerce", href: "/services" },
    { label: "Manufacturing", href: "/services" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#070C18]">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="w-fit block">
              <QorvariLogo size="lg" />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {BRAND.description}
            </p>

            <p className="text-xs font-semibold text-cyan-400 italic">
              &ldquo;{BRAND.tagline}&rdquo;
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-slate-400">
              <a href={`mailto:${BRAND.contact.email}`} className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                {BRAND.contact.email}
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {BRAND.company.location}
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-white">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {BRAND.company.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
