import type { CaseStudy, Category, Partner } from "@/data/types";

export function normalizeText(value: string): string {
  return value.trim().toLowerCase();
}

export function partnerMatchesSearch(partner: Partner, query: string): boolean {
  if (!query) return true;

  const normalized = normalizeText(query);
  return [
    partner.companyName,
    partner.tagline,
    partner.description,
    ...partner.tags,
    ...partner.categories,
  ].some((value) => normalizeText(value).includes(normalized));
}

export function partnerMatchesFilters(
  partner: Partner,
  selectedCategories: Category[],
  selectedRegions: string[],
): boolean {
  const categoryOk =
    selectedCategories.length === 0 ||
    selectedCategories.every((category) => partner.categories.includes(category));

  const regionOk =
    selectedRegions.length === 0 ||
    selectedRegions.some((region) => partner.regions.includes(region));

  return categoryOk && regionOk;
}

export function caseMatchesSearch(item: CaseStudy, query: string): boolean {
  if (!query) return true;

  const normalized = normalizeText(query);
  return [item.title, item.summary, item.industry, ...item.tags].some((value) =>
    normalizeText(value).includes(normalized),
  );
}

export function caseMatchesFilters(
  item: CaseStudy,
  selectedIndustries: string[],
  selectedCategories: Category[],
): boolean {
  const industryOk =
    selectedIndustries.length === 0 || selectedIndustries.includes(item.industry);

  const categoryOk =
    selectedCategories.length === 0 ||
    selectedCategories.some((category) => item.categories.includes(category));

  return industryOk && categoryOk;
}
