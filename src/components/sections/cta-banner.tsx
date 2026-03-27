import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-violet-600/20 border border-white/10 p-12 sm:p-16 text-center">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
          </div>

          {/* Content */}
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-4">
              Ready to Transform?
            </p>
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Start Your Cloud Journey
              <br />
              <span className="gradient-text">With Confidence</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Get a free cloud readiness assessment and discover how Qorvari can accelerate your transformation — with zero risk.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="xl" asChild>
                <Link href="/contact" className="group">
                  Get Free Assessment
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/contact" className="group">
                  <Calendar className="h-5 w-5" />
                  Schedule a Call
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <p className="text-xs text-slate-500 mt-8">
              No commitment required · Response within 24 hours · Free discovery session
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
