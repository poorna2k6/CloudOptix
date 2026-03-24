import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the CloudOptix team. Start your free cloud assessment, schedule a discovery call, or ask us anything about your cloud transformation journey.",
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@cloudoptix.com",
    href: "mailto:hello@cloudoptix.com",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: null,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "United States",
    href: null,
  },
];

const WHAT_TO_EXPECT = [
  "Free initial consultation — no commitment required",
  "Discovery of your current environment & challenges",
  "Tailored recommendations and roadmap overview",
  "Transparent pricing and engagement options",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-blue-600/6 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <Badge variant="cyan" className="mb-4">Get In Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Start Your Cloud
            <span className="gradient-text"> Journey Today</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tell us about your cloud transformation goals. Our experts will get back to you within 24 hours with tailored recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left sidebar — info */}
          <div className="space-y-8">
            {/* Contact details */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1530]/60 p-6 space-y-5">
              <h2 className="text-base font-semibold text-white">Contact Information</h2>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <Icon className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm text-slate-200 hover:text-cyan-400 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-200">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="rounded-2xl border border-white/8 bg-[#0D1530]/60 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-4 w-4 text-cyan-400" />
                <h2 className="text-base font-semibold text-white">What to Expect</h2>
              </div>
              <ul className="space-y-3">
                {WHAT_TO_EXPECT.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <ArrowRight className="h-3.5 w-3.5 text-cyan-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tagline card */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-600/15 via-blue-600/15 to-violet-600/15 border border-white/10 p-6 text-center">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Our Promise</p>
              <p className="text-white font-bold text-lg leading-snug">
                &ldquo;Clarity Before Cloud.
                <br />
                <span className="gradient-text">Value After.&rdquo;</span>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/8 bg-[#0D1530]/60 p-8">
              <h2 className="text-xl font-bold text-white mb-1">Send Us a Message</h2>
              <p className="text-sm text-slate-400 mb-8">
                Fill in the form below and one of our cloud transformation experts will reach out.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
