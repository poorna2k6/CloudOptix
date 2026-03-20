"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Cloud, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TRUST_BADGES = [
  { icon: Cloud, label: "Multi-Cloud Ready" },
  { icon: Zap, label: "Automation-First" },
  { icon: Shield, label: "Risk Mitigation" },
];

const STATS = [
  { value: "4x", label: "Faster Migration" },
  { value: "40%", label: "Cost Reduction" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "100+", label: "Workloads Migrated" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-pattern">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-violet-600/6 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="cyan" className="gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              Intelligent Cloud Transformation Platform
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Clarity Before Cloud.</span>
            <br />
            <span className="gradient-text-wide">Value After.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Trusted partner for Cloud Discovery, Migration, Modernization, and Optimization —
            turning IT complexity into strategic advantage through data-driven intelligence and automation.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                <Icon className="h-4 w-4 text-cyan-500" />
                {label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact" className="group">
                Start Your Cloud Journey
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/services">
                Explore Services
              </Link>
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                <div className="text-xs text-slate-500 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cloud transformation visual card */}
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="gradient-border rounded-2xl p-1 glow-cyan">
            <div className="rounded-xl bg-[#0D1530] overflow-hidden">
              {/* Fake dashboard header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="mx-auto text-xs text-slate-500 font-mono">
                  CloudOptix — Cloud Transformation Dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Workloads Discovered", value: "847", color: "text-cyan-400", change: "+12%" },
                  { label: "Migration Progress", value: "73%", color: "text-blue-400", change: "On Track" },
                  { label: "Cost Savings (YTD)", value: "$284K", color: "text-teal-400", change: "+38%" },
                  { label: "Risks Mitigated", value: "124", color: "text-violet-400", change: "Critical: 0" },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl bg-white/4 border border-white/5 p-4">
                    <p className="text-xs text-slate-500 mb-2">{card.label}</p>
                    <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{card.change}</p>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { phase: "Discovery", pct: 100, color: "bg-cyan-500" },
                  { phase: "Migration", pct: 73, color: "bg-blue-500" },
                  { phase: "Optimization", pct: 45, color: "bg-teal-500" },
                ].map((item) => (
                  <div key={item.phase}>
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>{item.phase}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} opacity-80`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating check marks */}
          <div className="absolute -left-4 top-1/3 hidden lg:flex items-center gap-2 bg-[#111827]/90 backdrop-blur border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Zero Downtime</p>
              <p className="text-xs text-slate-400">Migration Complete</p>
            </div>
          </div>
          <div className="absolute -right-4 top-2/3 hidden lg:flex items-center gap-2 bg-[#111827]/90 backdrop-blur border border-white/10 rounded-xl px-4 py-3 shadow-xl">
            <Zap className="h-5 w-5 text-cyan-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">40% Cost Saved</p>
              <p className="text-xs text-slate-400">FinOps Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
