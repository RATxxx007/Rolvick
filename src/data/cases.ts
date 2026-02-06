import type { CaseStudy } from "@/data/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "eu-fintech-discovery-reset",
    partnerSlug: "b5-research",
    title: {
      en: "EU Fintech Discovery Reset",
      ru: "Discovery перезапуск для финтеха",
    },
    summary: {
      en: "Reframed a fintech onboarding product through customer interviews and journey diagnostics.",
      ru: "Пересобрали финтех-онбординг на основе интервью и диагностики пути пользователя.",
    },
    industry: "fintech",
    categories: ["strategy_discovery"],
    tags: [
      { en: "User research", ru: "User research" },
      { en: "Roadmapping", ru: "Roadmapping" },
    ],
    problem: {
      en: "Onboarding drop-off was eroding activation and compliance teams lacked shared priorities.",
      ru: "Падение в онбординге снижало активацию, а у product и compliance не было общих приоритетов.",
    },
    approach: {
      en: "Interviewed finance leads, mapped journeys, and aligned stakeholders around a focused roadmap.",
      ru: "Провели интервью, описали customer journey и согласовали сфокусированный roadmap.",
    },
    outcomes: [
      {
        en: "Onboarding drop-off reduced by 28%",
        ru: "Снижение drop-off на 28%",
      },
      {
        en: "Roadmap aligned across product and compliance",
        ru: "Roadmap согласован между продуктом и compliance",
      },
    ],
    timeline: { en: "5 weeks", ru: "5 недель" },
    isPublic: true,
  },
  {
    slug: "saas-delivery-platform-upgrade",
    partnerSlug: "corebiz",
    title: {
      en: "SaaS Delivery Platform Upgrade",
      ru: "Обновление delivery платформы для SaaS",
    },
    summary: {
      en: "Migrated a monolith into modular services with stronger observability and deployment controls.",
      ru: "Перевели монолит в модульные сервисы с сильной наблюдаемостью и контролем релизов.",
    },
    industry: "saas",
    categories: ["delivery_engineering", "devops_platform"],
    tags: [
      { en: "Cloud migration", ru: "Cloud migration" },
      { en: "Release engineering", ru: "Release engineering" },
    ],
    problem: {
      en: "Release cycles lagged behind enterprise demand and incidents were hard to trace.",
      ru: "Циклы релизов отставали от спроса enterprise, а инциденты сложно диагностировались.",
    },
    approach: {
      en: "Delivered a modular service split, added CI/CD gates, and unified telemetry.",
      ru: "Сделали разбиение на сервисы, добавили CI/CD контроль и единый telemetry слой.",
    },
    outcomes: [
      {
        en: "Lead time cut from 5 days to 8 hours",
        ru: "Lead time снизили с 5 дней до 8 часов",
      },
      {
        en: "Production incidents reduced by 41%",
        ru: "Инциденты в проде снизились на 41%",
      },
    ],
    timeline: { en: "12 weeks", ru: "12 недель" },
    isPublic: true,
  },
  {
    slug: "support-agent-llm-automation",
    partnerSlug: "corebiz",
    title: {
      en: "Support Agent LLM Automation",
      ru: "LLM автоматизация поддержки",
    },
    summary: {
      en: "Implemented an AI assistant for tier-1 support workflows with human-in-the-loop escalation.",
      ru: "Внедрили AI ассистента для 1-й линии с контролем человека.",
    },
    industry: "ecommerce",
    categories: ["ai_agents_llm", "llmops_mlops"],
    tags: [
      { en: "Agentic AI", ru: "Agentic AI" },
      { en: "Evaluation", ru: "Evaluation" },
    ],
    problem: {
      en: "Support queues grew while quality consistency dropped.",
      ru: "Очереди поддержки росли, а стабильность качества падала.",
    },
    approach: {
      en: "Built an LLM routing layer, guardrails, and evaluation harness.",
      ru: "Построили LLM маршрутизацию, guardrails и контуры оценки.",
    },
    outcomes: [
      {
        en: "First-response time improved by 52%",
        ru: "Время первого ответа улучшено на 52%",
      },
      {
        en: "Agent accuracy stabilized above 91%",
        ru: "Точность стабилизировалась выше 91%",
      },
    ],
    timeline: { en: "9 weeks", ru: "9 недель" },
    isPublic: true,
  },
  {
    slug: "security-compliance-hardening",
    partnerSlug: "secureops-partner",
    title: {
      en: "Security and Compliance Hardening",
      ru: "Усиление безопасности и комплаенса",
    },
    summary: {
      en: "Established security controls, privacy workflows, and audit evidence for EU expansion.",
      ru: "Встроили security контроль, privacy процессы и аудит для экспансии в ЕС.",
    },
    industry: "healthtech",
    categories: ["security", "privacy_compliance"],
    tags: [
      { en: "Risk management", ru: "Risk management" },
      { en: "GDPR", ru: "GDPR" },
    ],
    problem: {
      en: "Expansion required hardened security controls and repeatable audit readiness.",
      ru: "Для экспансии требовались устойчивые security контуры и готовность к аудитам.",
    },
    approach: {
      en: "Built control baselines, privacy workflows, and incident readiness playbooks.",
      ru: "Собрали базовые контуры, privacy процессы и playbook для инцидентов.",
    },
    outcomes: [
      {
        en: "Audit prep timeline cut by 35%",
        ru: "Срок подготовки к аудиту сокращен на 35%",
      },
      {
        en: "Critical security gaps closed in 6 weeks",
        ru: "Критические пробелы закрыты за 6 недель",
      },
    ],
    timeline: { en: "7 weeks", ru: "7 недель" },
    isPublic: true,
  },
  {
    slug: "b2b-growth-engine-rollout",
    partnerSlug: "growthlab-partner",
    title: {
      en: "B2B Growth Engine Rollout",
      ru: "Запуск B2B роста",
    },
    summary: {
      en: "Built a repeatable outbound and content motion for a niche B2B analytics vendor.",
      ru: "Построили повторяемую outbound и content-механику для B2B аналитики.",
    },
    industry: "b2b_analytics",
    categories: ["gtm_growth"],
    tags: [
      { en: "Pipeline growth", ru: "Рост пайплайна" },
      { en: "Positioning", ru: "Позиционирование" },
    ],
    problem: {
      en: "Pipeline volume was volatile and messaging lacked clear differentiation.",
      ru: "Объем пайплайна был нестабилен, а сообщение не отличалось от рынка.",
    },
    approach: {
      en: "Refined ICP, rebuilt messaging, and launched weekly experiments.",
      ru: "Уточнили ICP, переписали сообщения и запустили еженедельные эксперименты.",
    },
    outcomes: [
      {
        en: "Qualified pipeline grew 2.1x",
        ru: "Квалифицированный пайплайн вырос в 2,1 раза",
      },
      { en: "Win-rate improved by 18%", ru: "Win-rate улучшился на 18%" },
    ],
    timeline: { en: "10 weeks", ru: "10 недель" },
    isPublic: true,
  },
  {
    slug: "legal-compliance-launch-readiness",
    partnerSlug: "secureops-partner",
    title: {
      en: "Legal and Compliance Launch Readiness",
      ru: "Подготовка к запуску в регуляторных рынках",
    },
    summary: {
      en: "Prepared legal templates, privacy controls, and launch guardrails for regulated markets.",
      ru: "Подготовили юридические шаблоны, privacy контуры и guardrails для регулируемых рынков.",
    },
    industry: "insurtech",
    categories: ["privacy_compliance", "legal"],
    tags: [
      { en: "Policy", ru: "Policy" },
      { en: "Regulatory readiness", ru: "Regulatory readiness" },
    ],
    problem: {
      en: "Regulatory launches required consistent legal templates and privacy alignment.",
      ru: "Для запуска в регулируемых рынках требовались единые юридические шаблоны и privacy alignment.",
    },
    approach: {
      en: "Standardized templates, audit evidence, and compliance checkpoints.",
      ru: "Стандартизировали шаблоны, доказательную базу и compliance checkpoints.",
    },
    outcomes: [
      { en: "Contract cycle shortened by 22%", ru: "Цикл контрактов сократили на 22%" },
      {
        en: "Cross-border launch approved",
        ru: "Запуск в нескольких странах согласован",
      },
    ],
    timeline: { en: "6 weeks", ru: "6 недель" },
    isPublic: true,
  },
];

export const publicCaseStudies = caseStudies.filter((item) => item.isPublic);
