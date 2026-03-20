import React from "react";
import {
  BrainCircuit, Zap, Globe, ShieldCheck, Handshake, RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WHY_CHOOSE_US } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  BrainCircuit,
  Zap,
  Globe,
  ShieldCheck,
  Handshake,
  RefreshCw,
};

const COLORS = [
  { icon: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: "text-violet-400", bg: "bg-violet-500/10 border-violet-500/20" },
  { icon: "text-teal-400", bg: "bg-teal-500/10 border-teal-500/20" },
  { icon: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
  { icon: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
];

export function WhyUs() {
  return (
    <section className="section-y relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 rounded-full bg-blue-600/6 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <Badge variant="blue" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6">
              Built for Enterprises.
              <br />
              <span className="gradient-text">Trusted by Leaders.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              We combine deep cloud expertise with intelligent automation to deliver outcomes that matter — faster time to value, lower risk, and continuous improvement.
            </p>

            {/* Key differentiators */}
            <div className="space-y-4">
              {[
                { check: "Tool-Driven, Insight-Led Decisions" },
                { check: "Cloud-Agnostic & Vendor Neutral" },
                { check: "Automation-First Delivery Model" },
                { check: "Long-Term Optimization Focus" },
              ].map(({ check }) => (
                <div key={check} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_CHOOSE_US.map((item, index) => {
              const Icon = ICON_MAP[item.icon] || BrainCircuit;
              const color = COLORS[index];
              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-white/8 bg-[#0D1530]/50 p-5 hover:border-white/15 hover:bg-[#0D1530]/80 transition-all duration-300"
                >
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center border mb-4",
                    color.bg
                  )}>
                    <Icon className={cn("h-5 w-5", color.icon)} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
