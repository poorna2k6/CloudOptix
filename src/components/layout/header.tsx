"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Cloud, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0A0F1E]/95 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300">
              <Cloud className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="gradient-text">Cloud</span>
              <span className="text-white">Optix</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/10 bg-[#0D1530]/95 backdrop-blur-md shadow-2xl shadow-black/50 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="secondary" size="sm" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-white/8 bg-[#0A0F1E]/98 backdrop-blur-md">
          <nav className="mx-auto max-w-7xl px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center pl-8 pr-4 py-2 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-3 pb-1">
              <Button variant="primary" size="md" className="w-full" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
