import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-white/5 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500",
            "border-white/10 focus:border-cyan-500/50 focus:bg-white/8 focus:outline-none focus:ring-1 focus:ring-cyan-500/30",
            "transition-all duration-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
