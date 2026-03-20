"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(1, "Company name is required"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(20, "Please describe your needs in at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const SERVICE_OPTIONS = [
  { value: "discovery", label: "Discovery & Assessment" },
  { value: "migration", label: "Cloud Migration" },
  { value: "modernization", label: "Application Modernization" },
  { value: "optimization", label: "Cloud Optimization & FinOps" },
  { value: "general", label: "General Inquiry" },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 border border-green-500/30 mb-5">
          <CheckCircle2 className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-slate-400 mb-6 max-w-sm">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Row: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Smith"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </div>

      {/* Row: Company + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            placeholder="Acme Corporation"
            {...register("company")}
            error={errors.company?.message}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
        </div>
      </div>

      {/* Service select */}
      <div className="space-y-1.5">
        <Label>Service of Interest *</Label>
        <Select onValueChange={(val) => setValue("service", val, { shouldValidate: true })}>
          <SelectTrigger error={errors.service?.message}>
            <SelectValue placeholder="Select a service..." />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.service && (
          <p className="text-xs text-red-400">{errors.service.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message">Tell Us About Your Needs *</Label>
        <Textarea
          id="message"
          placeholder="Describe your current environment, challenges, and what you're trying to achieve in the cloud..."
          rows={5}
          {...register("message")}
          error={errors.message?.message}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-center text-xs text-slate-500">
        We respond within 24 hours · Your data is kept confidential
      </p>
    </form>
  );
}
