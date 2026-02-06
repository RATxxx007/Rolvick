import type { Metadata } from "next";

import { CasesCatalog } from "@/components/cases/cases-catalog";
import { publicCaseStudies } from "@/data/cases";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Кейсы | Partner Portal",
  description: "Публичные кейсы партнерской сети.",
};

const locale = "ru" as const;

export default function CasesPageRu() {
  const dictionary = getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-accent-strong">Outcomes</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          {dictionary.cases.title}
        </h1>
        <p className="max-w-[65ch] text-base text-muted">{dictionary.cases.subtitle}</p>
      </section>
      <CasesCatalog locale={locale} cases={publicCaseStudies} />
    </div>
  );
}
