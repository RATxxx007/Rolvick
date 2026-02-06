import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPartnerBySlug, partners } from "@/data/partners";
import { getDictionary } from "@/i18n";
import { getCategoryLabel } from "@/lib/i18n-helpers";
import { pickLocaleText } from "@/lib/filter-helpers";

const locale = "ru" as const;

type PartnerPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return partners.map((partner) => ({ slug: partner.slug }));
}

export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return {
      title: "Партнер не найден | Partner Portal",
    };
  }

  return {
    title: `${partner.companyName} | Partner Portal`,
    description: pickLocaleText(partner.description, locale),
  };
}

export default async function PartnerProfilePageRu({ params }: PartnerPageProps) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const contactHref = `/ru/contact?partner=${encodeURIComponent(partner.companyName)}`;

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-white/10 bg-surface p-8">
        <p className="text-xs uppercase tracking-wide text-accent-strong">
          {dictionary.partnerProfile.title}
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-white">
          {partner.companyName}
        </h1>
        <p className="mt-2 text-lg text-muted">
          {pickLocaleText(partner.tagline, locale)}
        </p>
        <p className="mt-5 max-w-[65ch] text-base text-muted">
          {pickLocaleText(partner.description, locale)}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {partner.categories.map((category) => (
            <Badge key={category} variant="muted">
              {getCategoryLabel(dictionary, category)}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={partner.websiteUrl} target="_blank" rel="noreferrer">
            <Button>
              {dictionary.partnerProfile.visitSite}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
          <Link href={contactHref}>
            <Button variant="secondary">{dictionary.partnerProfile.contactCta}</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle>{dictionary.partnerProfile.regions}</CardTitle>
          <CardDescription className="mt-3 text-base text-muted">
            {partner.regions.join(" / ")}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>{dictionary.partnerProfile.languages}</CardTitle>
          <CardDescription className="mt-3 text-base text-muted">
            {partner.languages.join(" / ")}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>{dictionary.partnerProfile.tags}</CardTitle>
          <CardDescription className="mt-3 text-base text-muted">
            {partner.tags.map((tag) => pickLocaleText(tag, locale)).join(" / ")}
          </CardDescription>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-white">
          {dictionary.partnerProfile.bestFor}
        </h2>
        <ul className="grid gap-3 md:grid-cols-3">
          {partner.tags.slice(0, 3).map((tag) => (
            <li
              key={tag.en}
              className="rounded-2xl border border-white/10 bg-surface-2 px-4 py-3 text-sm text-muted"
            >
              {pickLocaleText(tag, locale)}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-white">
          {dictionary.partnerProfile.packages}
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {partner.packages.map((item) => (
            <Card key={item.name.en} className="flex flex-col gap-4">
              <div>
                <CardTitle>{pickLocaleText(item.name, locale)}</CardTitle>
                <CardDescription className="mt-1 text-base text-muted">
                  {dictionary.misc.from} ${item.priceFromUSD.toLocaleString()} •{" "}
                  {pickLocaleText(item.timeline, locale)}
                </CardDescription>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable.en} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                    {pickLocaleText(deliverable, locale)}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
