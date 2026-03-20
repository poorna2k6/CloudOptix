import React from "react";
import { Radar, PenTool, Rocket, LineChart, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FRAMEWORK_PHASES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Radar,
  PenTool,
  Rocket,
  LineChart,
};

export function Framework() {
  return (
    <section className="section-y relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="blue" className="mb-4">Our Framework</Badge>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Cloud Transformation
            <span className="gradient-text"> Framework</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A proven, structured approach that delivers measurable outcomes at every phase of your cloud journey.
          </p>
        </div>

        {/* Framework phases — horizontal flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-[4.5rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FRAMEWORK_PHASES.map((phase, index) => {
              const Icon = ICON_MAP[phase.icon] || Rocket;
              return (
                <div key={phase.phase} className="relative flex flex-col items-center text-center group">
                  {/* Step number */}
                  <div className="text-xs font-bold text-slate-600 mb-3 font-mono">0{index + 1}</div>

                  {/* Icon circle */}
                  <div className={cn(
                    "relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border-2 mb-6 transition-all duration-300",
                    "group-hover:scale-110 group-hover:shadow-lg",
                    phase.color
                  )}>
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />

                    {/* Arrow connector — shown on desktop */}
                    {index < FRAMEWORK_PHASES.length - 1 && (
                      <div className="absolute -right-9 top-1/2 -translate-y-1/2 hidden lg:block text-slate-700">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {phase.phase}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-[200px]">
                    {phase.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcome banner */}
        <div className="mt-16 gradient-border rounded-2xl p-8 text-center">
          <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-2">Outcome</p>
          <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            Your cloud environment becomes a{" "}
            <span className="gradient-text">strategic asset</span>
            {" "}—
            <br className="hidden sm:block" />
            scalable, efficient, and future-ready.
          </p>
        </div>
      </div>
    </section>
  );
}
