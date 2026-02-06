import type { CaseStudy } from "@/data/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "eu-fintech-discovery-reset",
    partnerSlug: "b5-research",
    title: "EU Fintech Discovery Reset",
    summary:
      "Reframed a fintech onboarding product through customer interviews and journey diagnostics.",
    industry: "Fintech",
    categories: ["Strategy & Discovery"],
    tags: ["User Research", "Roadmapping"],
    outcomes: [
      "Onboarding drop-off reduced by 28%",
      "Roadmap aligned across product and compliance",
    ],
    duration: "5 weeks",
    isPublic: true,
  },
  {
    slug: "saas-delivery-platform-upgrade",
    partnerSlug: "corebiz",
    title: "SaaS Delivery Platform Upgrade",
    summary:
      "Migrated a monolith into modular services with stronger observability and deployment controls.",
    industry: "SaaS",
    categories: ["Delivery Engineering", "DevOps / SRE / Platform"],
    tags: ["Cloud Migration", "Release Engineering"],
    outcomes: [
      "Deployment lead time improved from 5 days to 8 hours",
      "Production incidents reduced by 41%",
    ],
    duration: "12 weeks",
    isPublic: true,
  },
  {
    slug: "support-agent-llm-automation",
    partnerSlug: "corebiz",
    title: "Support Agent LLM Automation",
    summary:
      "Implemented an AI assistant for tier-1 support workflows with human-in-the-loop escalation.",
    industry: "E-commerce",
    categories: ["AI Agents & LLM", "LLMOps / MLOps"],
    tags: ["Agentic AI", "Evaluation"],
    outcomes: [
      "First-response time improved by 52%",
      "Agent accuracy stabilized above 91%",
    ],
    duration: "9 weeks",
    isPublic: true,
  },
  {
    slug: "security-compliance-hardening",
    partnerSlug: "secureops-partner",
    title: "Security and Compliance Hardening",
    summary:
      "Established security controls, privacy workflows, and audit evidence for EU expansion.",
    industry: "HealthTech",
    categories: ["Security", "Privacy / Compliance"],
    tags: ["Risk Management", "GDPR"],
    outcomes: [
      "Audit prep timeline cut by 35%",
      "Critical security gaps closed in 6 weeks",
    ],
    duration: "7 weeks",
    isPublic: true,
  },
  {
    slug: "b2b-growth-engine-rollout",
    partnerSlug: "growthlab-partner",
    title: "B2B Growth Engine Rollout",
    summary:
      "Built a repeatable outbound and content motion for a niche B2B analytics vendor.",
    industry: "B2B Analytics",
    categories: ["Go-to-Market / Growth"],
    tags: ["Pipeline Growth", "Positioning"],
    outcomes: ["Qualified pipeline grew 2.1x in one quarter", "Win-rate improved by 18%"],
    duration: "10 weeks",
    isPublic: true,
  },
  {
    slug: "legal-compliance-launch-readiness",
    partnerSlug: "secureops-partner",
    title: "Legal and Compliance Launch Readiness",
    summary:
      "Prepared legal templates, privacy controls, and launch guardrails for regulated markets.",
    industry: "InsurTech",
    categories: ["Privacy / Compliance", "Legal"],
    tags: ["Policy", "Regulatory Readiness"],
    outcomes: [
      "Contract cycle shortened by 22%",
      "Cross-border launch approved without blockers",
    ],
    duration: "6 weeks",
    isPublic: true,
  },
];

export const publicCaseStudies = caseStudies.filter((item) => item.isPublic);
