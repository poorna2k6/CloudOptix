/**
 * Qorvari Brand Constants
 * Central source of truth for all branding elements
 */

export const BRAND = {
  name: 'Qorvari',
  tagline: 'Intelligent Cloud Transformation',
  description: 'Enterprise cloud discovery, migration, modernization, and optimization powered by AI-driven insights and automated execution.',
  
  // Contact Information
  contact: {
    email: 'hello@qorvari.com',
    support: 'support@qorvari.com',
    sales: 'sales@qorvari.com',
  },
  
  // URLs
  urls: {
    website: 'https://qorvari.com',
    app: process.env.NEXT_PUBLIC_SITE_URL || 'https://app.qorvari.com',
    docs: 'https://docs.qorvari.com',
    blog: 'https://qorvari.com/blog',
  },
  
  // Social Media
  social: {
    twitter: '@qorvari',
    linkedin: 'company/qorvari',
    github: 'qorvari',
  },
  
  // SEO
  seo: {
    title: 'Qorvari — Intelligent Cloud Transformation',
    titleTemplate: '%s | Qorvari',
    description: 'Transform your cloud infrastructure with AI-powered discovery, automated migration, intelligent modernization, and continuous optimization. Enterprise-grade cloud transformation platform.',
    keywords: [
      'cloud transformation',
      'cloud migration',
      'cloud optimization',
      'AI cloud platform',
      'cloud modernization',
      'FinOps',
      'cloud assessment',
      'AWS migration',
      'Azure migration',
      'Google Cloud',
      'multi-cloud',
      'cloud consulting',
      'infrastructure automation',
    ],
  },
  
  // Brand Colors (matching logo)
  colors: {
    primary: {
      cyan: '#06B6D4',
      blue: '#3B82F6',
      violet: '#8B5CF6',
    },
    neutral: {
      navy: '#0A0F1E',
      slate: '#1E293B',
      gray: '#475569',
    },
  },
  
  // Company Info
  company: {
    legalName: 'Qorvari Inc.',
    founded: '2024',
    location: 'United States',
  },
} as const;

/**
 * Brand messaging for different contexts
 */
export const BRAND_MESSAGING = {
  hero: {
    headline: 'Transform Your Cloud with Intelligence',
    subheadline: 'AI-powered discovery, automated migration, and continuous optimization for enterprise cloud infrastructure.',
  },
  
  value_proposition: {
    short: 'Intelligent cloud transformation at enterprise scale',
    long: 'Qorvari combines AI-driven insights with automated execution to deliver faster, safer, and more cost-effective cloud transformations.',
  },
  
  differentiators: [
    'AI-powered discovery and assessment',
    'Automated migration with zero downtime',
    'Intelligent cost optimization',
    'Multi-cloud expertise',
    'Enterprise-grade security',
    'Continuous monitoring and improvement',
  ],
  
  footer_tagline: 'Qorvari — Intelligent Cloud Transformation',
} as const;

/**
 * Email templates branding
 */
export const EMAIL_BRANDING = {
  from: {
    default: `Qorvari <noreply@qorvari.com>`,
    support: `Qorvari Support <support@qorvari.com>`,
    sales: `Qorvari Sales <sales@qorvari.com>`,
  },
  
  signature: 'Qorvari — Intelligent Cloud Transformation',
  
  logoUrl: 'https://qorvari.com/logo.png',
} as const;

// Made with Bob
