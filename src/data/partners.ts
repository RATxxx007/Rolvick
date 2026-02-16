import type { Partner } from "@/data/types";

export const partners: Partner[] = [
  {
    slug: "b5-research",
    companyName: "B5 Research",
    tagline: {
      en: "Strategic research for confident product bets.",
      ru: "Стратегические исследования для уверенных продуктовых решений.",
    },
    description: {
      en: "B5 Research helps teams reduce launch risk with sharp discovery, structured stakeholder alignment, and evidence-based roadmaps.",
      ru: "B5 Research снижает риск запуска благодаря первичному исследованию, согласованию стейкхолдеров и плану развития на основе данных.",
    },
    websiteUrl: "https://b5research.example",
    regions: ["EU", "UK"],
    languages: ["EN", "RU"],
    categories: ["strategy_discovery"],
    tags: [
      {
        en: "Market mapping",
        ru: "Карта рынка",
      },
      {
        en: "User interviews",
        ru: "Пользовательские интервью",
      },
      {
        en: "Opportunity sizing",
        ru: "Оценка потенциала",
      },
    ],
    status: "verified",
    packages: [
      {
        name: {
          en: "Discovery Sprint",
          ru: "Спринт исследования",
        },
        priceFromUSD: 9000,
        timeline: {
          en: "3 weeks",
          ru: "3 недели",
        },
        deliverables: [
          { en: "Research plan", ru: "План исследования" },
          { en: "Interview insights deck", ru: "Отчет по интервью" },
          { en: "Prioritized opportunity map", ru: "Карта возможностей" },
        ],
      },
      {
        name: {
          en: "Market Validation",
          ru: "Валидация рынка",
        },
        priceFromUSD: 14000,
        timeline: {
          en: "5 weeks",
          ru: "5 недель",
        },
        deliverables: [
          { en: "Competitive landscape", ru: "Конкурентный обзор" },
          { en: "Demand signals report", ru: "Сигналы спроса" },
          { en: "Launch decision memo", ru: "Мемо по запуску" },
        ],
      },
    ],
  },
  {
    slug: "corebiz",
    companyName: "CoreBiz",
    tagline: {
      en: "Engineering teams that ship resilient digital products.",
      ru: "Инженерные команды, которые надежно запускают продукты.",
    },
    description: {
      en: "CoreBiz delivers complex software initiatives end-to-end, from architecture to production operations, with deep expertise in AI and platform reliability.",
      ru: "CoreBiz ведет сложные инженерные инициативы полного цикла: от архитектуры до продакшена, с экспертизой в AI и надежности платформы.",
    },
    websiteUrl: "https://corebiz.example",
    regions: ["GE", "EU"],
    languages: ["EN", "RU"],
    categories: ["delivery_engineering", "ai_agents_llm", "llmops_mlops"],
    tags: [
      { en: "Platform modernization", ru: "Модернизация платформы" },
      { en: "Agentic workflows", ru: "Агентные процессы" },
      { en: "Cloud delivery", ru: "Поставка в облаке" },
    ],
    status: "verified",
    packages: [
      {
        name: { en: "Delivery Pod", ru: "Инженерная команда" },
        priceFromUSD: 18000,
        timeline: { en: "6 weeks", ru: "6 недель" },
        deliverables: [
          { en: "Sprint execution plan", ru: "План спринтов" },
          { en: "Production-ready feature set", ru: "Фичи для продакшена" },
          { en: "Quality & observability baseline", ru: "База качества и наблюдаемости" },
        ],
      },
      {
        name: { en: "LLM Integration", ru: "LLM интеграция" },
        priceFromUSD: 22000,
        timeline: { en: "8 weeks", ru: "8 недель" },
        deliverables: [
          { en: "Prompt orchestration layer", ru: "Слой оркестрации" },
          { en: "Evaluation pipeline", ru: "Пайплайн оценки" },
          { en: "Monitoring dashboard", ru: "Дашборд мониторинга" },
        ],
      },
      {
        name: { en: "MLOps Acceleration", ru: "Ускорение MLOps" },
        priceFromUSD: 26000,
        timeline: { en: "10 weeks", ru: "10 недель" },
        deliverables: [
          { en: "Model deployment workflow", ru: "Процесс деплоя" },
          { en: "CI/CD for ML assets", ru: "CI/CD для ML" },
          { en: "Runbook and SLO pack", ru: "Регламенты и SLO" },
        ],
      },
    ],
  },
  {
    slug: "secureops-partner",
    companyName: "SecureOps Partner",
    tagline: {
      en: "Security-first delivery without slowing product velocity.",
      ru: "Безопасность без потери скорости продукта.",
    },
    description: {
      en: "SecureOps Partner embeds security and compliance into engineering workflows through pragmatic controls, audits, and incident readiness.",
      ru: "SecureOps Partner внедряет безопасность и комплаенс в разработку через контроль, аудит и готовность к инцидентам.",
    },
    websiteUrl: "https://secureops.example",
    regions: ["EU"],
    languages: ["EN"],
    categories: ["security", "privacy_compliance"],
    tags: [
      { en: "ISO 27001", ru: "ISO 27001" },
      { en: "Threat modeling", ru: "Моделирование угроз" },
      { en: "Security reviews", ru: "Проверки безопасности" },
    ],
    status: "verified",
    packages: [
      {
        name: { en: "Security Baseline", ru: "Базовый контур безопасности" },
        priceFromUSD: 12000,
        timeline: { en: "4 weeks", ru: "4 недели" },
        deliverables: [
          { en: "Control gap assessment", ru: "Оценка пробелов" },
          { en: "Remediation plan", ru: "План устранения" },
          { en: "Governance checklist", ru: "Чеклист процессов" },
        ],
      },
      {
        name: { en: "Compliance Readiness", ru: "Готовность к комплаенсу" },
        priceFromUSD: 17000,
        timeline: { en: "7 weeks", ru: "7 недель" },
        deliverables: [
          { en: "Policy pack", ru: "Набор политик" },
          { en: "Audit evidence framework", ru: "Шаблон доказательств" },
          { en: "Team training workshop", ru: "Обучение команды" },
        ],
      },
    ],
  },
  {
    slug: "growthlab-partner",
    companyName: "GrowthLab Partner",
    tagline: {
      en: "Go-to-market systems designed for measurable growth.",
      ru: "Системы вывода на рынок для измеримого роста.",
    },
    description: {
      en: "GrowthLab Partner helps B2B teams build repeatable acquisition and activation engines using market positioning, messaging, and experiment-driven execution.",
      ru: "GrowthLab Partner помогает B2B-командам строить повторяемые механики привлечения и активации через позиционирование и эксперименты.",
    },
    websiteUrl: "https://growthlab.example",
    regions: ["EU", "US"],
    languages: ["EN"],
    categories: ["gtm_growth"],
    tags: [
      { en: "Positioning", ru: "Позиционирование" },
      { en: "Demand generation", ru: "Генерация спроса" },
      { en: "Sales enablement", ru: "Поддержка продаж" },
    ],
    status: "active",
    packages: [
      {
        name: { en: "GTM Blueprint", ru: "План вывода на рынок" },
        priceFromUSD: 11000,
        timeline: { en: "4 weeks", ru: "4 недели" },
        deliverables: [
          { en: "ICP and segmentation model", ru: "ICP и сегментация" },
          { en: "Messaging framework", ru: "Фреймворк сообщений" },
          { en: "90-day execution plan", ru: "План на 90 дней" },
        ],
      },
      {
        name: { en: "Growth Execution", ru: "Growth-реализация" },
        priceFromUSD: 16000,
        timeline: { en: "8 weeks", ru: "8 недель" },
        deliverables: [
          { en: "Campaign backlog", ru: "Бэклог кампаний" },
          { en: "Weekly experiment reviews", ru: "Еженедельные ревью" },
          { en: "Revenue funnel dashboard", ru: "Дашборд воронки" },
        ],
      },
    ],
  },
];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((partner) => partner.slug === slug);
}
