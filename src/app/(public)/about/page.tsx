import type { Metadata } from "next";
import Link from "next/link";
import {
  Eye, Target, Users, Star, ShieldCheck, RefreshCw,
  Globe, ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Qorvari — our vision, mission, core values, and the philosophy behind our cloud-agnostic, automation-first approach to cloud transformation.",
};

const CORE_VALUES = [
  {
    icon: Star,
    title: "Customer Value First",
    description:
      "We prioritize measurable business outcomes over technical complexity. Every engagement is designed to deliver clear value, not just cloud adoption.",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Eye,
    title: "Clarity Through Intelligence",
    description:
      "We believe informed decisions drive successful transformations. Data, automation, and insights guide everything we do.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Users,
    title: "Trusted Partnership",
    description:
      "We operate as an extension of our customers' teams — transparent, accountable, and committed for the long term.",
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: RefreshCw,
    title: "Automation with Purpose",
    description:
      "We leverage automation and third-party platforms to accelerate delivery, reduce risk, and improve consistency.",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Continuous Optimization",
    description:
      "Cloud transformation doesn't end at migration. We focus on ongoing improvement in cost, performance, and governance.",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Globe,
    title: "Vendor Neutrality",
    description:
      "Cloud-agnostic recommendations aligned to your business goals — not tool limitations. Best solution, always.",
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/6 blur-[100px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Badge variant="blue" className="mb-4">Our Story</Badge>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-6">
            About <span className="gradient-text">Qorvari</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            We started with a simple belief: organizations deserve clarity before they move to the cloud and measurable value after they arrive.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vision & Mission */}
        <div id="approach" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          <div className="gradient-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20">
                <Eye className="h-5 w-5 text-cyan-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To simplify cloud transformation and empower organizations to unlock measurable business value through intelligent, automated, and trusted cloud solutions.
            </p>
          </div>
          <div className="gradient-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20">
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To help organizations confidently discover, migrate, modernize, and optimize their IT environments — delivering faster outcomes, reduced risk, and continuous optimization.
            </p>
          </div>
        </div>

        {/* Founder's Message */}
        <div className="mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6">Founder&apos;s Message</Badge>
            <blockquote className="text-xl sm:text-2xl font-medium text-slate-300 leading-relaxed italic mb-8">
              &ldquo;Cloud transformation is not just about moving workloads — it&apos;s about making the right decisions at the right time. Too many cloud initiatives fail due to poor visibility, rushed decisions, and lack of continuous optimization.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Founder &amp; CEO</p>
                <p className="text-xs text-slate-500">Qorvari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <Badge variant="cyan" className="mb-4">Core Values</Badge>
            <h2 className="text-4xl font-black text-white">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-white/8 bg-[#0D1530]/50 p-6 hover:border-white/15 transition-colors"
                >
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center mb-4 ${value.color}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partner Philosophy */}
        <div id="partners" className="mb-24">
          <div className="rounded-3xl border border-white/8 bg-gradient-to-br from-[#0D1530]/80 to-[#111827]/80 p-10 sm:p-14">
            <div className="max-w-2xl">
              <Badge variant="blue" className="mb-4">Partner Philosophy</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                ISV &amp; Hyperscaler
                <span className="gradient-text"> Ecosystem Approach</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                We believe the best outcomes are achieved through strong ecosystems. We partner with leading cloud providers and best-in-class ISVs to deliver scalable, secure, and future-ready solutions.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Our vendor-agnostic approach ensures customers receive unbiased recommendations aligned to their business goals — not tool limitations. By combining platform intelligence with expert guidance, we help organizations reduce risk, accelerate execution, and maximize return on cloud investments.
              </p>
              <Button variant="secondary" size="md" asChild>
                <Link href="/contact" className="group">
                  Become a Partner
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CtaBanner />
    </div>
  );
}
