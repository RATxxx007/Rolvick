export type Locale = "en" | "ru";

export type LocalizedString = {
  en: string;
  ru: string;
};

export type Dictionary = {
  locale: Locale;
  nav: {
    home: string;
    partners: string;
    cases: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  howItWorks: {
    title: string;
    steps: Array<{ title: string; body: string }>;
  };
  stats: {
    verifiedPartners: string;
    publicCases: string;
    regions: string;
    domains: string;
  };
  featuredPartners: string;
  recentCases: string;
  directory: {
    title: string;
    subtitle: string;
    filters: {
      searchPlaceholder: string;
      categories: string;
      regions: string;
      languages: string;
      reset: string;
      empty: string;
    };
  };
  cases: {
    title: string;
    subtitle: string;
    filters: {
      searchPlaceholder: string;
      industry: string;
      categories: string;
      reset: string;
      empty: string;
      industryAll: string;
    };
    card: {
      outcome: string;
      whatDone: string;
      timeline: string;
      partner: string;
      readCase: string;
      back: string;
    };
  };
  partnerProfile: {
    title: string;
    bestFor: string;
    packages: string;
    regions: string;
    languages: string;
    tags: string;
    visitSite: string;
    contactCta: string;
  };
  caseProfile: {
    title: string;
    overview: string;
    approach: string;
    outcomes: string;
  };
  contact: {
    title: string;
    subtitle: string;
    fields: {
      phone: string;
      email: string;
      company: string;
      comment: string;
    };
    submit: string;
    thanks: string;
    copyMessage: string;
    openEmail: string;
    call: string;
    preferEmail: string;
    copyEmail: string;
  };
  categories: Record<string, string>;
  industries: Record<string, string>;
  statuses: Record<string, string>;
  footer: {
    line1: string;
    line2: string;
  };
  misc: {
    verified: string;
    active: string;
    pilot: string;
    more: string;
    from: string;
    viewProfile: string;
  };
  languageSwitch: {
    en: string;
    ru: string;
  };
};
