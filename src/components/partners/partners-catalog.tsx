"use client";

import { useMemo, useState } from "react";

import { PartnerCard } from "@/components/partners/partner-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Partner } from "@/data/types";
import { CATEGORY_KEYS, type CategoryKey } from "@/data/types";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { getCategoryLabel } from "@/lib/i18n-helpers";
import { partnerMatchesFilters, partnerMatchesSearch } from "@/lib/filter-helpers";

const regionOptions = ["EU", "UK", "GE", "US"];
const languageOptions = ["EN", "RU"];

export function PartnersCatalog({
  locale,
  partners,
}: {
  locale: Locale;
  partners: Partner[];
}) {
  const dictionary = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<CategoryKey[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const filteredPartners = useMemo(() => {
    return partners.filter(
      (partner) =>
        partnerMatchesSearch(partner, query) &&
        partnerMatchesFilters(partner, categories, regions, languages),
    );
  }, [categories, query, regions, languages, partners]);

  const resetAll = () => {
    setQuery("");
    setCategories([]);
    setRegions([]);
    setLanguages([]);
  };

  const toggleCategory = (value: CategoryKey) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const toggleRegion = (value: string) => {
    setRegions((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const toggleLanguage = (value: string) => {
    setLanguages((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-surface p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.directory.filters.searchPlaceholder}
          />
          <div className="flex items-center justify-end">
            <Button variant="secondary" onClick={resetAll}>
              {dictionary.directory.filters.reset}
            </Button>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              {dictionary.directory.filters.categories}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORY_KEYS.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    categories.includes(category)
                      ? "border-accent/40 bg-accent/15 text-white"
                      : "border-white/10 bg-transparent text-muted hover:bg-white/5"
                  }`}
                >
                  {getCategoryLabel(dictionary, category)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                {dictionary.directory.filters.regions}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {regionOptions.map((region) => (
                  <button
                    key={region}
                    onClick={() => toggleRegion(region)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      regions.includes(region)
                        ? "border-accent/40 bg-accent/15 text-white"
                        : "border-white/10 bg-transparent text-muted hover:bg-white/5"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted">
                {dictionary.directory.filters.languages}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {languageOptions.map((language) => (
                  <button
                    key={language}
                    onClick={() => toggleLanguage(language)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      languages.includes(language)
                        ? "border-accent/40 bg-accent/15 text-white"
                        : "border-white/10 bg-transparent text-muted hover:bg-white/5"
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {filteredPartners.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-surface p-8 text-center">
          <p className="text-muted">{dictionary.directory.filters.empty}</p>
          <Button className="mt-4" variant="secondary" onClick={resetAll}>
            {dictionary.directory.filters.reset}
          </Button>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filteredPartners.map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} locale={locale} />
          ))}
        </section>
      )}
    </div>
  );
}
