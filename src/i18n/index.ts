import type { Locale } from "@/i18n/types";
import { enDictionary } from "@/i18n/en";
import { ruDictionary } from "@/i18n/ru";

export function getDictionary(locale: Locale) {
  return locale === "ru" ? ruDictionary : enDictionary;
}
