export const CATEGORIES = [
  "Strategy & Discovery",
  "Product Design",
  "Delivery Engineering",
  "AI Agents & LLM",
  "LLMOps / MLOps",
  "DevOps / SRE / Platform",
  "Security",
  "Privacy / Compliance",
  "Legal",
  "Go-to-Market / Growth",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type PackageOffer = {
  name: string;
  priceFromUSD: number;
  timeline: string;
  deliverables: string[];
};

export type Partner = {
  slug: string;
  companyName: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  regions: string[];
  languages: string[];
  categories: Category[];
  tags: string[];
  isVerified: boolean;
  packages: PackageOffer[];
};

export type CaseStudy = {
  slug: string;
  partnerSlug: string;
  title: string;
  summary: string;
  industry: string;
  categories: Category[];
  tags: string[];
  outcomes: string[];
  duration: string;
  isPublic: boolean;
};
