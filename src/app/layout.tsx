import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createServerSupabase } from "@/lib/supabase";
import type { UserProfile } from "@/types";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://cloudoptix.com"),
  title: {
    default: "CloudOptix — Clarity Before Cloud. Value After.",
    template: "%s | CloudOptix",
  },
  description:
    "CloudOptix is your trusted partner for Cloud Discovery, Migration, Modernization, and Optimization — delivering data-driven insights and automated execution for enterprise cloud transformation.",
  keywords: [
    "cloud transformation",
    "cloud migration",
    "cloud optimization",
    "FinOps",
    "application modernization",
    "cloud assessment",
    "AWS",
    "Azure",
    "Google Cloud",
    "cloud consulting",
  ],
  authors: [{ name: "CloudOptix" }],
  creator: "CloudOptix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cloudoptix.com",
    siteName: "CloudOptix",
    title: "CloudOptix — Clarity Before Cloud. Value After.",
    description:
      "Trusted partner for cloud discovery, migration, modernization, and optimization. Intelligence-led, automation-first cloud transformation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CloudOptix — Cloud Transformation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CloudOptix — Clarity Before Cloud. Value After.",
    description:
      "Intelligence-led cloud transformation: discovery, migration, modernization & optimization.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch session on every public page render so the header shows the right CTA
  let headerUser = null;
  try {
    const supabase = await createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("email, full_name, avatar_url")
        .eq("id", user.id)
        .single<Pick<UserProfile, "email" | "full_name" | "avatar_url">>();
      if (profile) headerUser = profile;
    }
  } catch {
    // Not configured yet (missing env vars) — header falls back to "Get Started"
  }

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0F1E] text-slate-100">
        <Header user={headerUser} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
