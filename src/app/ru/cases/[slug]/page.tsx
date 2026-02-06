import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPartnerBySlug } from "@/data/partners";
import { caseStudies } from "@/data/cases";
import { getDictionary } from "@/i18n";
import { getCategoryLabel, getIndustryLabel } from "@/lib/i18n-helpers";
import { pickLocaleText } from "@/lib/filter-helpers";

const locale = "ru" as const;

type CasePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return { title: "Кейс не найден | Partner Portal" };
  }

  return {
    title: `${pickLocaleText(caseStudy.title, locale)} | Partner Portal`,
    description: pickLocaleText(caseStudy.summary, locale),
  };
}

export default async function CasePageRu({ params }: CasePageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const partner = getPartnerBySlug(caseStudy.partnerSlug);

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-surface p-8">
        <p className="text-xs uppercase tracking-wide text-accent-strong">
          {dictionary.caseProfile.title}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-white">
          {pickLocaleText(caseStudy.title, locale)}
        </h1>
        <p className="mt-2 text-base text-muted">
          {pickLocaleText(caseStudy.summary, locale)}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-surface-2 px-3 py-1 text-xs text-muted">
            {getIndustryLabel(dictionary, caseStudy.industry)}
          </span>
          {caseStudy.categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-surface-2 px-3 py-1 text-xs text-muted"
            >
              {getCategoryLabel(dictionary, category)}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          {dictionary.cases.card.partner}: {partner?.companyName ?? caseStudy.partnerSlug}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle>{dictionary.caseProfile.overview}</CardTitle>
          <CardDescription className="mt-3 text-base text-muted">
            {pickLocaleText(caseStudy.problem, locale)}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>{dictionary.caseProfile.approach}</CardTitle>
          <CardDescription className="mt-3 text-base text-muted">
            {pickLocaleText(caseStudy.approach, locale)}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>{dictionary.caseProfile.outcomes}</CardTitle>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {caseStudy.outcomes.map((outcome) => (
              <li key={outcome.en}>{pickLocaleText(outcome, locale)}</li>
            ))}
          </ul>
        </Card>
      </section>

      <Link href="/ru/cases" className="text-sm text-accent-strong">
        {dictionary.cases.card.back}
      </Link>
    </div>
  );
}
