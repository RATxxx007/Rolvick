import type { CaseStudy, CategoryKey, Partner } from "@/data/types";
import type { Locale } from "@/i18n/types";

export function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function localizedMatches(value: { en: string; ru: string }, query: string) {
  const normalized = normalizeText(query);
  return (
    normalizeText(value.en).includes(normalized) ||
    normalizeText(value.ru).includes(normalized)
  );
}

export function partnerMatchesSearch(partner: Partner, query: string): boolean {
  if (!query) return true;

  const normalized = normalizeText(query);
  return (
    normalizeText(partner.companyName).includes(normalized) ||
    localizedMatches(partner.tagline, query) ||
    localizedMatches(partner.description, query) ||
    partner.tags.some((tag) => localizedMatches(tag, query))
  );
}

export function partnerMatchesFilters(
  partner: Partner,
  selectedCategories: CategoryKey[],
  selectedRegions: string[],
  selectedLanguages: string[],
): boolean {
  const categoryOk =
    selectedCategories.length === 0 ||
    selectedCategories.every((category) => partner.categories.includes(category));

  const regionOk =
    selectedRegions.length === 0 ||
    selectedRegions.some((region) => partner.regions.includes(region));

  const languageOk =
    selectedLanguages.length === 0 ||
    selectedLanguages.some((lang) => partner.languages.includes(lang));

  return categoryOk && regionOk && languageOk;
}

export function caseMatchesSearch(item: CaseStudy, query: string): boolean {
  if (!query) return true;

  return (
    localizedMatches(item.title, query) ||
    localizedMatches(item.summary, query) ||
    item.tags.some((tag) => localizedMatches(tag, query)) ||
    item.outcomes.some((outcome) => localizedMatches(outcome, query))
  );
}

export function caseMatchesFilters(
  item: CaseStudy,
  selectedIndustries: string[],
  selectedCategories: CategoryKey[],
): boolean {
  const industryOk =
    selectedIndustries.length === 0 || selectedIndustries.includes(item.industry);

  const categoryOk =
    selectedCategories.length === 0 ||
    selectedCategories.some((category) => item.categories.includes(category));

  return industryOk && categoryOk;
}

export function pickLocaleText(value: { en: string; ru: string }, locale: Locale) {
  return locale === "ru" ? value.ru : value.en;
}
