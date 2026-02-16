import type { Metadata } from "next";

import { CasesCatalog } from "@/components/cases/cases-catalog";
import { publicCaseStudies } from "@/data/cases";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Cases | Partner Portal",
  description: "Review public delivery cases across the partner ecosystem.",
};

const locale = "en" as const;

export default function CasesPage() {
  const dictionary = getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-accent-strong">
          {dictionary.nav.cases}
        </p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          {dictionary.cases.title}
        </h1>
        <p className="max-w-[65ch] text-base text-muted">{dictionary.cases.subtitle}</p>
      </section>
      <CasesCatalog locale={locale} cases={publicCaseStudies} />
    </div>
  );
}
