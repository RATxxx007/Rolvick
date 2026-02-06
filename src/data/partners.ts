import type { Partner } from "@/data/types";

export const partners: Partner[] = [
  {
    slug: "b5-research",
    companyName: "B5 Research",
    tagline: "Strategic research for confident product bets.",
    description:
      "B5 Research helps teams reduce launch risk with sharp discovery, structured stakeholder alignment, and evidence-based roadmaps.",
    websiteUrl: "https://b5research.example",
    regions: ["EU", "UK"],
    languages: ["EN", "RU"],
    categories: ["Strategy & Discovery"],
    tags: ["Market Mapping", "User Interviews", "Opportunity Sizing"],
    isVerified: true,
    packages: [
      {
        name: "Discovery Sprint",
        priceFromUSD: 9000,
        timeline: "3 weeks",
        deliverables: [
          "Research plan",
          "Interview insights deck",
          "Prioritized opportunity map",
        ],
      },
      {
        name: "Market Validation",
        priceFromUSD: 14000,
        timeline: "5 weeks",
        deliverables: [
          "Competitor landscape",
          "Demand signals report",
          "Launch decision memo",
        ],
      },
    ],
  },
  {
    slug: "corebiz",
    companyName: "CoreBiz",
    tagline: "Engineering teams that ship resilient digital products.",
    description:
      "CoreBiz delivers complex software initiatives end-to-end, from architecture to production operations, with deep expertise in AI and platform reliability.",
    websiteUrl: "https://corebiz.example",
    regions: ["GE", "EU"],
    languages: ["EN", "RU"],
    categories: ["Delivery Engineering", "AI Agents & LLM", "LLMOps / MLOps"],
    tags: ["Platform Modernization", "Agentic Workflows", "Cloud Delivery"],
    isVerified: true,
    packages: [
      {
        name: "Delivery Pod",
        priceFromUSD: 18000,
        timeline: "6 weeks",
        deliverables: [
          "Sprint execution plan",
          "Production-ready feature set",
          "Quality and observability baseline",
        ],
      },
      {
        name: "LLM Integration",
        priceFromUSD: 22000,
        timeline: "8 weeks",
        deliverables: [
          "Prompt orchestration layer",
          "Evaluation pipeline",
          "Monitoring dashboard",
        ],
      },
      {
        name: "MLOps Acceleration",
        priceFromUSD: 26000,
        timeline: "10 weeks",
        deliverables: [
          "Model deployment workflow",
          "CI/CD for ML assets",
          "Runbook and SLO pack",
        ],
      },
    ],
  },
  {
    slug: "secureops-partner",
    companyName: "SecureOps Partner",
    tagline: "Security-first delivery without slowing product velocity.",
    description:
      "SecureOps Partner embeds security and compliance into engineering workflows through pragmatic controls, audits, and incident readiness.",
    websiteUrl: "https://secureops.example",
    regions: ["EU"],
    languages: ["EN"],
    categories: ["Security", "Privacy / Compliance"],
    tags: ["ISO 27001", "Threat Modeling", "Security Reviews"],
    isVerified: true,
    packages: [
      {
        name: "Security Baseline",
        priceFromUSD: 12000,
        timeline: "4 weeks",
        deliverables: [
          "Control gap assessment",
          "Prioritized remediation plan",
          "Security governance checklist",
        ],
      },
      {
        name: "Compliance Readiness",
        priceFromUSD: 17000,
        timeline: "7 weeks",
        deliverables: [
          "Policy pack",
          "Audit evidence framework",
          "Team training workshop",
        ],
      },
    ],
  },
  {
    slug: "growthlab-partner",
    companyName: "GrowthLab Partner",
    tagline: "Go-to-market systems designed for measurable growth.",
    description:
      "GrowthLab Partner helps B2B teams build repeatable acquisition and activation engines using market positioning, messaging, and experiment-driven execution.",
    websiteUrl: "https://growthlab.example",
    regions: ["EU", "US"],
    languages: ["EN"],
    categories: ["Go-to-Market / Growth"],
    tags: ["Positioning", "Demand Generation", "Sales Enablement"],
    isVerified: false,
    packages: [
      {
        name: "GTM Blueprint",
        priceFromUSD: 11000,
        timeline: "4 weeks",
        deliverables: [
          "ICP and segmentation model",
          "Messaging framework",
          "90-day execution plan",
        ],
      },
      {
        name: "Growth Execution",
        priceFromUSD: 16000,
        timeline: "8 weeks",
        deliverables: [
          "Campaign backlog",
          "Weekly experiment reviews",
          "Revenue funnel dashboard",
        ],
      },
    ],
  },
];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((partner) => partner.slug === slug);
}
