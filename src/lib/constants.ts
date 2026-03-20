import type { NavItem, Service, Industry } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Discovery & Assessment", href: "/services#discovery" },
      { label: "Cloud Migration", href: "/services#migration" },
      { label: "App Modernization", href: "/services#modernization" },
      { label: "Cloud Optimization & FinOps", href: "/services#optimization" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SERVICES: Service[] = [
  {
    id: "discovery",
    icon: "Search",
    title: "Discovery & Assessment",
    subtitle: "Understand everything before you migrate",
    description:
      "Comprehensive application discovery, dependency mapping, and cloud readiness assessments across your entire IT landscape.",
    benefits: [
      "Automated application & infrastructure inventory",
      "Dependency mapping and communication paths",
      "Cloud suitability analysis (move / modernize / retire)",
      "Strategic insight reports for planning & budgeting",
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "migration",
    icon: "CloudUpload",
    title: "Cloud Migration",
    subtitle: "Seamless workload migration at scale",
    description:
      "Automated migration planning, IaC generation, and multi-cloud execution with real-time tracking dashboards.",
    benefits: [
      "Automated migration roadmaps and wave planning",
      "Infrastructure-as-Code template generation",
      "AWS, Azure, Google Cloud & hybrid support",
      "Real-time progress tracking and reporting",
    ],
    color: "from-blue-500 to-violet-500",
  },
  {
    id: "modernization",
    icon: "Layers",
    title: "Application Modernization",
    subtitle: "Evolve legacy apps into cloud-native",
    description:
      "Refactoring, containerization, microservices enablement, and CI/CD pipeline integration for legacy applications.",
    benefits: [
      "Refactoring & re-engineering guidance",
      "Containerization & microservices enablement",
      "CI/CD pipeline integration",
      "Automated runtime optimization",
    ],
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "optimization",
    icon: "TrendingDown",
    title: "Cloud Optimization & FinOps",
    subtitle: "Continuously drive efficiency and savings",
    description:
      "Cost analytics, rightsizing recommendations, continuous monitoring, and governance to maximize your cloud ROI.",
    benefits: [
      "Cost analytics & usage insights",
      "Rightsizing and over-provision detection",
      "Continuous monitoring & alerting",
      "Optimization recommendations & governance",
    ],
    color: "from-cyan-400 to-teal-500",
  },
];

export const INDUSTRIES: Industry[] = [
  { icon: "Landmark", name: "Financial Services", description: "Secure, compliant cloud for banking and finance" },
  { icon: "HeartPulse", name: "Healthcare & Life Sciences", description: "HIPAA-ready migrations and modernization" },
  { icon: "ShoppingCart", name: "Retail & eCommerce", description: "Scalable platforms for peak demand" },
  { icon: "Factory", name: "Manufacturing", description: "IoT and OT/IT convergence on cloud" },
  { icon: "Code2", name: "Technology & SaaS", description: "Cloud-native acceleration for tech companies" },
  { icon: "Truck", name: "Logistics & Transportation", description: "Real-time visibility and supply chain optimization" },
];

export const HOW_WE_WORK_STEPS = [
  {
    step: "01",
    title: "Evaluate",
    description: "Deep environment discovery and assessment across all your workloads.",
    icon: "ScanSearch",
  },
  {
    step: "02",
    title: "Plan",
    description: "Customized roadmap aligned with your business outcomes and timelines.",
    icon: "MapPin",
  },
  {
    step: "03",
    title: "Execute",
    description: "Automate and orchestrate migration and modernization at scale.",
    icon: "Zap",
  },
  {
    step: "04",
    title: "Optimize",
    description: "Tune cloud operations for performance, cost, and compliance continuously.",
    icon: "BarChart3",
  },
];

export const FRAMEWORK_PHASES = [
  {
    phase: "Discover",
    description: "Automated discovery, dependency mapping, and cloud readiness assessment.",
    icon: "Radar",
    color: "border-cyan-500 bg-cyan-500/10",
  },
  {
    phase: "Design",
    description: "Cloud strategy, architecture, migration waves, and modernization roadmap.",
    icon: "PenTool",
    color: "border-blue-500 bg-blue-500/10",
  },
  {
    phase: "Deliver",
    description: "Automated migration, modernization, and infrastructure deployment.",
    icon: "Rocket",
    color: "border-violet-500 bg-violet-500/10",
  },
  {
    phase: "Optimize",
    description: "Cost optimization, performance tuning, governance, and FinOps enablement.",
    icon: "LineChart",
    color: "border-teal-500 bg-teal-500/10",
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "BrainCircuit",
    title: "Data-Driven Intelligence",
    description: "Automated tools and analytics deliver accurate visibility and actionable insights from day one.",
  },
  {
    icon: "Zap",
    title: "Agile Execution",
    description: "We streamline every cloud journey phase with automation and proven best practices.",
  },
  {
    icon: "Globe",
    title: "Cloud-Agnostic Expertise",
    description: "AWS, Azure, Google Cloud, and hybrid — unbiased recommendations aligned to your goals.",
  },
  {
    icon: "ShieldCheck",
    title: "Risk Mitigation & Compliance",
    description: "Strong governance, dependency mapping, and secure transformations minimize downtime.",
  },
  {
    icon: "Handshake",
    title: "Flexible Engagement Models",
    description: "Advisory, assessment, full delivery, or managed services — we partner at every phase.",
  },
  {
    icon: "RefreshCw",
    title: "Continuous Optimization",
    description: "Cloud transformation doesn't end at migration. We focus on ongoing improvement.",
  },
];
