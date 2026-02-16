import Link from "next/link";

import { HomeHero } from "@/components/home/home-hero";
import { HomeHow } from "@/components/home/home-how";
import { HomeStats } from "@/components/home/home-stats";
import { PartnerCard } from "@/components/partners/partner-card";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/cases";
import { partners } from "@/data/partners";
import { getDictionary } from "@/i18n";

const locale = "en" as const;

export default function HomePage() {
  const dictionary = getDictionary(locale);

  return (
    <div className="space-y-12">
      <HomeHero locale={locale} />
      <HomeStats locale={locale} />
      <HomeHow locale={locale} />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold text-white">
            {dictionary.featuredPartners}
          </h2>
          <Link href="/partners">
            <Button variant="secondary">{dictionary.hero.primaryCta}</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {partners.slice(0, 4).map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} locale={locale} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold text-white">
            {dictionary.recentCases}
          </h2>
          <Link href="/cases">
            <Button variant="secondary">{dictionary.hero.secondaryCta}</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.slice(0, 4).map((item) => (
            <article
              key={item.slug}
              className="rounded-2xl border border-white/10 bg-surface-2 p-6"
            >
              <h3 className="font-heading text-lg font-semibold text-white">
                {item.title.en}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.summary.en}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted">
                {item.timeline.en}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
