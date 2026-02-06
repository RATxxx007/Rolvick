"use client";

import { useEffect, useMemo, useState } from "react";

import { CaseCard } from "@/components/cases/case-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { publicCaseStudies } from "@/data/cases";
import { CATEGORIES, type Category } from "@/data/types";
import { caseMatchesFilters, caseMatchesSearch } from "@/lib/filter-helpers";

const industryOptions = [
  "Fintech",
  "SaaS",
  "E-commerce",
  "HealthTech",
  "B2B Analytics",
  "InsurTech",
];

export function CasesCatalog() {
  const [query, setQuery] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredCases = useMemo(() => {
    return publicCaseStudies.filter(
      (item) =>
        caseMatchesSearch(item, query) &&
        caseMatchesFilters(item, industries, categories),
    );
  }, [categories, industries, query]);

  const resetAll = () => {
    setQuery("");
    setIndustries([]);
    setCategories([]);
  };

  const toggleIndustry = (value: string) => {
    setIndustries((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const toggleCategory = (value: Category) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-[#11141a] p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cases by title, summary, or tag"
          />
          <div className="flex items-center justify-end">
            <Button variant="secondary" onClick={resetAll}>
              Reset Filters
            </Button>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {industryOptions.map((industry) => (
              <button
                key={industry}
                onClick={() => toggleIndustry(industry)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  industries.includes(industry)
                    ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                    : "border-white/15 bg-white/0 text-zinc-300 hover:bg-white/5"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  categories.includes(category)
                    ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                    : "border-white/15 bg-white/0 text-zinc-300 hover:bg-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <section className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#11141a] p-6"
            >
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-4/5" />
              <Skeleton className="mt-6 h-4 w-3/4" />
            </div>
          ))}
        </section>
      ) : filteredCases.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-[#11141a] p-8 text-center">
          <p className="text-zinc-300">No cases match your filters.</p>
          <Button className="mt-4" variant="secondary" onClick={resetAll}>
            Reset
          </Button>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filteredCases.map((item) => (
            <CaseCard key={item.slug} item={item} />
          ))}
        </section>
      )}
    </div>
  );
}
