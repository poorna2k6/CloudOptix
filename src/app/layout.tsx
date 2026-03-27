import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ErrorBoundary } from "@/components/error-boundary";
import { BRAND } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? BRAND.urls.website),
  title: {
    default: BRAND.seo.title,
    template: BRAND.seo.titleTemplate,
  },
  description: BRAND.seo.description,
  keywords: [...BRAND.seo.keywords],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BRAND.urls.website,
    siteName: BRAND.name,
    title: BRAND.seo.title,
    description: BRAND.seo.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — Enterprise Cloud Transformation Platform`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND.seo.title,
    description: BRAND.seo.description,
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

// Root layout — html/body/fonts only.
// Header + Footer live in (public)/layout.tsx.
// Auth pages get (auth)/layout.tsx (centered card, no nav).
// Dashboard/Admin get their own sidebar layouts.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0F1E] text-slate-100">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
