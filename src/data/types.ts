import type { LocalizedString } from "@/i18n/types";

export const CATEGORY_KEYS = [
  "strategy_discovery",
  "product_design",
  "delivery_engineering",
  "ai_agents_llm",
  "llmops_mlops",
  "devops_platform",
  "security",
  "privacy_compliance",
  "legal",
  "gtm_growth",
] as const;

export const INDUSTRY_KEYS = [
  "fintech",
  "saas",
  "ecommerce",
  "healthtech",
  "b2b_analytics",
  "insurtech",
] as const;

export type CategoryKey = (typeof CATEGORY_KEYS)[number];
export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

export type PackageOffer = {
  name: LocalizedString;
  priceFromUSD: number;
  timeline: LocalizedString;
  deliverables: LocalizedString[];
};

export type Partner = {
  slug: string;
  companyName: string;
  tagline: LocalizedString;
  description: LocalizedString;
  websiteUrl: string;
  regions: string[];
  languages: string[];
  categories: CategoryKey[];
  tags: LocalizedString[];
  isVerified: boolean;
  packages: PackageOffer[];
};

export type CaseStudy = {
  slug: string;
  partnerSlug: string;
  title: LocalizedString;
  summary: LocalizedString;
  industry: IndustryKey;
  categories: CategoryKey[];
  tags: LocalizedString[];
  problem: LocalizedString;
  approach: LocalizedString;
  outcomes: LocalizedString[];
  timeline: LocalizedString;
  isPublic: boolean;
};
