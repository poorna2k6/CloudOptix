import type { Metadata } from "next";
import { Services } from "@/components/sections/services";
import { Framework } from "@/components/sections/framework";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore CloudOptix cloud transformation services: Discovery & Assessment, Cloud Migration, Application Modernization, and Cloud Optimization & FinOps.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Page hero */}
      <div className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/6 blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4">
          <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">
            What We Do
          </p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            End-to-end cloud transformation services designed to take you from clarity to value — faster, with less risk, and more confidence.
          </p>
        </div>
      </div>

      <Services />
      <Framework />
      <CtaBanner />
    </div>
  );
}
