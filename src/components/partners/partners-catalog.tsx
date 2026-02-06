"use client";

import { useEffect, useMemo, useState } from "react";

import { PartnerCard } from "@/components/partners/partner-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { partners } from "@/data/partners";
import { CATEGORIES, type Category } from "@/data/types";
import { partnerMatchesFilters, partnerMatchesSearch } from "@/lib/filter-helpers";

const regionOptions = ["EU", "UK", "GE", "US"];

export function PartnersCatalog() {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredPartners = useMemo(() => {
    return partners.filter(
      (partner) =>
        partnerMatchesSearch(partner, query) &&
        partnerMatchesFilters(partner, categories, regions),
    );
  }, [categories, query, regions]);

  const resetAll = () => {
    setQuery("");
    setCategories([]);
    setRegions([]);
  };

  const toggleCategory = (value: Category) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  const toggleRegion = (value: string) => {
    setRegions((prev) =>
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
            placeholder="Search by partner, category, or capability"
          />
          <div className="flex items-center justify-end">
            <Button variant="secondary" onClick={resetAll}>
              Reset Filters
            </Button>
          </div>
        </div>
        <div className="mt-5 space-y-4">
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
          <div className="flex flex-wrap gap-2">
            {regionOptions.map((region) => (
              <button
                key={region}
                onClick={() => toggleRegion(region)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  regions.includes(region)
                    ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                    : "border-white/15 bg-white/0 text-zinc-300 hover:bg-white/5"
                }`}
              >
                {region}
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
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <Skeleton className="mt-6 h-10 w-24" />
            </div>
          ))}
        </section>
      ) : filteredPartners.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-[#11141a] p-8 text-center">
          <p className="text-zinc-300">No partners match your filters.</p>
          <Button className="mt-4" variant="secondary" onClick={resetAll}>
            Reset
          </Button>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filteredPartners.map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} />
          ))}
        </section>
      )}
    </div>
  );
}
