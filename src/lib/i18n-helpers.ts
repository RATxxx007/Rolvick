import type { CategoryKey, IndustryKey } from "@/data/types";
import type { Dictionary } from "@/i18n/types";

export function getCategoryLabel(dictionary: Dictionary, key: CategoryKey) {
  return dictionary.categories[key] ?? key;
}

export function getIndustryLabel(dictionary: Dictionary, key: IndustryKey) {
  return dictionary.industries[key] ?? key;
}
