import { z } from 'zod';
import { CATEGORIES, REGIONS, LANGUAGES, BUDGETS, COMMISSION_SCENARIOS } from '@/lib/constants';

export const leadRequestSchema = z.object({
  requesterName: z.string().min(2),
  requesterEmail: z.string().email(),
  companyName: z.string().min(2),
  message: z.string().min(10),
  budget: z.enum(BUDGETS.map((budget) => budget.value) as [string, ...string[]]),
  region: z.enum(REGIONS),
  categories: z.array(z.enum(CATEGORIES)).min(1)
});

export const partnerApplicationSchema = leadRequestSchema.extend({
  categories: z.array(z.enum(CATEGORIES)).min(1)
});

export const partnerProfileSchema = z.object({
  companyName: z.string().min(2),
  tagline: z.string().min(4),
  description: z.string().min(20),
  websiteUrl: z.string().url(),
  regions: z.array(z.enum(REGIONS)).min(1),
  languages: z.array(z.enum(LANGUAGES)).min(1),
  categories: z.array(z.enum(CATEGORIES)).min(1),
  tags: z.array(z.string().min(2)).min(1),
  responseSlaHours: z.number().int().min(1).max(168)
});

export const packageSchema = z.object({
  name: z.string().min(2),
  priceFromUsd: z.number().int().min(100),
  timeline: z.string().min(2),
  deliverables: z.array(z.string().min(2)).min(1).max(6)
});

export const caseStudySchema = z.object({
  title: z.string().min(2),
  industry: z.string().min(2),
  problem: z.string().min(10),
  solution: z.string().min(10),
  outcomes: z.string().min(5),
  isPublic: z.boolean()
});

export const commissionRuleSchema = z.object({
  scenario: z.enum(
    COMMISSION_SCENARIOS.map((scenario) => scenario.value) as [string, ...string[]]
  ),
  percentLeadHolder: z.number().int().min(0).max(100),
  percentSeller: z.number().int().min(0).max(100),
  percentDelivery: z.number().int().min(0).max(100),
  holdbackPercent: z.number().int().min(0).max(100)
});
