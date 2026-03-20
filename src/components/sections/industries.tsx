import React from "react";
import { Landmark, HeartPulse, ShoppingCart, Factory, Code2, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { INDUSTRIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Landmark,
  HeartPulse,
  ShoppingCart,
  Factory,
  Code2,
  Truck,
};

// Gradient per card for visual variety
const GRADIENTS = [
  "from-cyan-500/20 to-blue-500/10",
  "from-blue-500/20 to-violet-500/10",
  "from-violet-500/20 to-purple-500/10",
  "from-teal-500/20 to-cyan-500/10",
  "from-indigo-500/20 to-blue-500/10",
  "from-blue-500/20 to-teal-500/10",
];

const ICON_COLORS = [
  "text-cyan-400",
  "text-blue-400",
  "text-violet-400",
  "text-teal-400",
  "text-indigo-400",
  "text-sky-400",
];

export function Industries() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] rounded-full bg-cyan-500/4 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="teal" className="mb-4">Industries We Serve</Badge>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Expertise Across
            <span className="gradient-text"> Every Sector</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Deep industry knowledge combined with cloud expertise to deliver outcomes tailored to your sector&apos;s unique requirements and compliance needs.
          </p>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry, index) => {
            const Icon = ICON_MAP[industry.icon] || Code2;
            return (
              <div
                key={industry.name}
                className="group relative rounded-2xl border border-white/8 bg-[#0D1530]/40 p-6 hover:border-white/15 transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Background gradient on hover */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                  GRADIENTS[index]
                )} />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/8 group-hover:border-white/15 transition-colors">
                    <Icon className={cn("h-6 w-6", ICON_COLORS[index])} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base group-hover:text-cyan-300 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{industry.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
