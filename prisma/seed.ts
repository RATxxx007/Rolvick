import {
  PrismaClient,
  Role,
  LeadStatus,
  CommissionScenario,
  PartnerStatus,
  BudgetTier
} from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@portal.local';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123!';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: Role.ADMIN
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN
    }
  });

  const partnerUsers = [
    {
      email: 'partner.b5@portal.local',
      companyName: 'B5 Research',
      slug: 'b5-research',
      tagline: 'Strategy, discovery, and validation for high-stakes initiatives.',
      description:
        'B5 Research provides rapid discovery, market validation, and executive-level strategy for AI and digital transformation programs.',
      websiteUrl: 'https://b5research.io',
      regions: ['EU', 'UK'],
      languages: ['EN', 'RU'],
      categories: ['strategy', 'discovery', 'validation'],
      tags: ['board-ready', 'enterprise', 'insight'],
      responseSlaHours: 12,
      isVerified: true,
      status: PartnerStatus.APPROVED
    },
    {
      email: 'partner.corebiz@portal.local',
      companyName: 'CoreBiz Delivery',
      slug: 'corebiz-delivery',
      tagline: 'Engineering elite AI products with secure delivery.',
      description:
        'CoreBiz Delivery specializes in AI engineering, RAG systems, and LLMOps platforms for regulated industries.',
      websiteUrl: 'https://corebiz.ai',
      regions: ['GE', 'EU'],
      languages: ['EN', 'RU'],
      categories: ['engineering', 'ai', 'rag', 'llmops'],
      tags: ['llmops', 'productization', 'secure'],
      responseSlaHours: 8,
      isVerified: true,
      status: PartnerStatus.APPROVED
    },
    {
      email: 'partner.secureops@portal.local',
      companyName: 'SecureOps Partner',
      slug: 'secureops-partner',
      tagline: 'Cybersecurity and compliance hardening for AI stacks.',
      description:
        'SecureOps Partner delivers audit-ready security assessments, GRC enablement, and AI risk controls.',
      websiteUrl: 'https://secureops.partner',
      regions: ['EU'],
      languages: ['EN'],
      categories: ['cybersecurity', 'compliance'],
      tags: ['risk', 'audit', 'governance'],
      responseSlaHours: 24,
      isVerified: false,
      status: PartnerStatus.PENDING
    }
  ];

  for (const partner of partnerUsers) {
    const user = await prisma.user.upsert({
      where: { email: partner.email },
      update: {
        role: Role.PARTNER
      },
      create: {
        email: partner.email,
        passwordHash: await bcrypt.hash('Partner123!', 10),
        role: Role.PARTNER
      }
    });

    await prisma.partnerProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: partner.companyName,
        slug: partner.slug,
        tagline: partner.tagline,
        description: partner.description,
        websiteUrl: partner.websiteUrl,
        regions: partner.regions,
        languages: partner.languages,
        categories: partner.categories,
        tags: partner.tags,
        responseSlaHours: partner.responseSlaHours,
        status: partner.status,
        isVerified: partner.isVerified
      },
      create: {
        userId: user.id,
        companyName: partner.companyName,
        slug: partner.slug,
        tagline: partner.tagline,
        description: partner.description,
        websiteUrl: partner.websiteUrl,
        regions: partner.regions,
        languages: partner.languages,
        categories: partner.categories,
        tags: partner.tags,
        responseSlaHours: partner.responseSlaHours,
        status: partner.status,
        isVerified: partner.isVerified,
        packages: {
          create: [
            {
              name: 'Discovery Sprint',
              priceFromUsd: 6000,
              timeline: '3-4 weeks',
              deliverables: ['Stakeholder workshops', 'Opportunity map', 'Validation plan']
            },
            {
              name: 'Implementation Launch',
              priceFromUsd: 15000,
              timeline: '6-8 weeks',
              deliverables: ['MVP build', 'Security review', 'Go-live support']
            }
          ]
        },
        cases: {
          create: [
            {
              title: 'AI go-to-market validation',
              industry: 'Fintech',
              problem: 'Unclear demand for AI credit scoring.',
              solution: 'Validated demand across 12 EU markets.',
              outcomes: 'Secured €3.2M funding in 60 days.',
              isPublic: true
            },
            {
              title: 'RAG enablement for compliance',
              industry: 'Healthcare',
              problem: 'Manual policy checks delaying approvals.',
              solution: 'Built secure RAG pipeline with audit trails.',
              outcomes: 'Reduced review time by 45%.',
              isPublic: true
            }
          ]
        }
      }
    });
  }

  await prisma.leadRequest.createMany({
    data: [
      {
        requesterName: 'Elena Petrova',
        requesterEmail: 'elena@northbridge.io',
        companyName: 'Northbridge Labs',
        message: 'We need a discovery sprint for an AI-driven underwriting flow.',
        budget: BudgetTier.ten_30k,
        region: 'EU',
        categories: ['strategy', 'validation'],
        status: LeadStatus.NEW
      },
      {
        requesterName: 'Marcus Hill',
        requesterEmail: 'marcus@orbitale.co',
        companyName: 'Orbitale',
        message: 'Looking for an implementation partner to build a secure RAG layer.',
        budget: BudgetTier.thirty_plus,
        region: 'UK',
        categories: ['engineering', 'rag'],
        status: LeadStatus.NEW
      }
    ]
  });

  const rules = [
    {
      scenario: CommissionScenario.direct_referral,
      percentLeadHolder: 10,
      percentSeller: 0,
      percentDelivery: 0,
      holdbackPercent: 0
    },
    {
      scenario: CommissionScenario.direct_sale_by_lead_holder,
      percentLeadHolder: 20,
      percentSeller: 0,
      percentDelivery: 0,
      holdbackPercent: 0
    },
    {
      scenario: CommissionScenario.reactivation,
      percentLeadHolder: 5,
      percentSeller: 0,
      percentDelivery: 0,
      holdbackPercent: 0
    },
    {
      scenario: CommissionScenario.follow_on,
      percentLeadHolder: 8,
      percentSeller: 0,
      percentDelivery: 0,
      holdbackPercent: 0
    },
    {
      scenario: CommissionScenario.exception_payment_risk,
      percentLeadHolder: 0,
      percentSeller: 0,
      percentDelivery: 0,
      holdbackPercent: 15
    }
  ];

  for (const rule of rules) {
    await prisma.commissionRule.upsert({
      where: { scenario: rule.scenario },
      update: {
        percentLeadHolder: rule.percentLeadHolder,
        percentSeller: rule.percentSeller,
        percentDelivery: rule.percentDelivery,
        holdbackPercent: rule.holdbackPercent
      },
      create: rule
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
