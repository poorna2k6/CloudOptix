import React from "react";
import { ScanSearch, MapPin, Zap, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { HOW_WE_WORK_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  ScanSearch,
  MapPin,
  Zap,
  BarChart3,
};

const STEP_COLORS = [
  "border-cyan-500 bg-cyan-500 text-white shadow-cyan-500/30",
  "border-blue-500 bg-blue-500 text-white shadow-blue-500/30",
  "border-violet-500 bg-violet-500 text-white shadow-violet-500/30",
  "border-teal-500 bg-teal-500 text-white shadow-teal-500/30",
];

const CONNECTOR_COLORS = [
  "from-cyan-500/40 to-blue-500/40",
  "from-blue-500/40 to-violet-500/40",
  "from-violet-500/40 to-teal-500/40",
];

export function HowWeWork() {
  return (
    <section className="section-y relative overflow-hidden bg-[#070C18]/50">
      <div className="absolute inset-0 grid-pattern pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="violet" className="mb-4">How We Work</Badge>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            A Proven Process for
            <span className="gradient-text"> Cloud Success</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our structured engagement model ensures clarity, accountability, and measurable value at each milestone.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_WE_WORK_STEPS.map((step, index) => {
              const Icon = ICON_MAP[step.icon] || Zap;
              return (
                <div key={step.step} className="relative flex flex-col items-center text-center group">
                  {/* Step bubble */}
                  <div className={cn(
                    "relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 shadow-lg mb-6",
                    "group-hover:scale-110 transition-transform duration-300",
                    STEP_COLORS[index]
                  )}>
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                    {/* Number badge */}
                    <span className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#070C18] border border-white/15 text-xs font-bold text-slate-300">
                      {step.step}
                    </span>
                  </div>

                  {/* Connector line — hidden on mobile */}
                  {index < HOW_WE_WORK_STEPS.length - 1 && (
                    <div className={cn(
                      "absolute top-8 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-px hidden lg:block",
                      `bg-gradient-to-r ${CONNECTOR_COLORS[index]}`
                    )} />
                  )}

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-[200px]">
                    {step.description}
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
