import React from "react";
import Link from "next/link";
import {
  Search, CloudUpload, Layers, TrendingDown, CheckCircle2, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  Search,
  CloudUpload,
  Layers,
  TrendingDown,
};

export function Services() {
  return (
    <section id="services" className="section-y relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Our Services</Badge>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            End-to-End Cloud
            <span className="gradient-text"> Transformation</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From initial discovery to continuous optimization — we cover every phase of your cloud journey with automation, intelligence, and deep expertise.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Search;
            return (
              <div
                key={service.id}
                id={service.id}
                className="group relative rounded-2xl border border-white/8 bg-[#0D1530]/60 p-8 hover:border-white/15 hover:bg-[#0D1530]/80 transition-all duration-300"
              >
                {/* Gradient accent top bar */}
                <div className={cn("absolute top-0 left-8 right-8 h-px bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300", service.color)} />

                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                    service.color,
                    "shadow-lg"
                  )}>
                    <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      0{index + 1}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-cyan-400/80 font-medium mb-3">{service.subtitle}</p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-5">
                      {service.description}
                    </p>

                    {/* Benefits list */}
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact" className="group">
              Discuss Your Requirements
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
