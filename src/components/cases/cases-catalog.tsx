"use client";

import { useMemo, useState } from "react";

import { CaseCard } from "@/components/cases/case-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CaseStudy } from "@/data/types";
import {
  CATEGORY_KEYS,
  INDUSTRY_KEYS,
  type CategoryKey,
  type IndustryKey,
} from "@/data/types";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { getCategoryLabel, getIndustryLabel } from "@/lib/i18n-helpers";
import { caseMatchesFilters, caseMatchesSearch } from "@/lib/filter-helpers";

export function CasesCatalog({ locale, cases }: { locale: Locale; cases: CaseStudy[] }) {
  const dictionary = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [industries, setIndustries] = useState<IndustryKey | "all">("all");
  const [categories, setCategories] = useState<CategoryKey[]>([]);

  const filteredCases = useMemo(() => {
    const industryFilter = industries === "all" ? [] : [industries];
    return cases.filter(
      (item) =>
        caseMatchesSearch(item, query) &&
        caseMatchesFilters(item, industryFilter, categories),
    );
  }, [categories, industries, query, cases]);

  const resetAll = () => {
    setQuery("");
    setIndustries("all");
    setCategories([]);
  };

  const toggleCategory = (value: CategoryKey) => {
    setCategories((prev) =>
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
            placeholder={dictionary.cases.filters.searchPlaceholder}
          />
          <div className="flex items-center justify-end">
            <Button variant="secondary" onClick={resetAll}>
              {dictionary.cases.filters.reset}
            </Button>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              {dictionary.cases.filters.industry}
            </p>
            <select
              value={industries}
              onChange={(event) =>
                setIndustries(event.target.value as IndustryKey | "all")
              }
              className="mt-2 h-10 w-full rounded-xl border border-white/10 bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 md:w-64"
            >
              <option value="all">{dictionary.cases.filters.industryAll}</option>
              {INDUSTRY_KEYS.map((industry) => (
                <option key={industry} value={industry}>
                  {getIndustryLabel(dictionary, industry)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">
              {dictionary.cases.filters.categories}
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
        </div>
      </section>

      {filteredCases.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-surface p-8 text-center">
          <p className="text-muted">{dictionary.cases.filters.empty}</p>
          <Button className="mt-4" variant="secondary" onClick={resetAll}>
            {dictionary.cases.filters.reset}
          </Button>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filteredCases.map((item) => (
            <CaseCard key={item.slug} item={item} locale={locale} />
          ))}
        </section>
      )}
    </div>
  );
}
