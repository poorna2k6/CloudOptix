import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "cyan" | "blue" | "violet" | "teal" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-white/10 text-slate-300": variant === "default",
          "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20": variant === "cyan",
          "bg-blue-500/15 text-blue-400 border border-blue-500/20": variant === "blue",
          "bg-violet-500/15 text-violet-400 border border-violet-500/20": variant === "violet",
          "bg-teal-500/15 text-teal-400 border border-teal-500/20": variant === "teal",
          "border border-white/15 text-slate-400 bg-transparent": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
