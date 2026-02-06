import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPartnerBySlug } from "@/data/partners";
import type { CaseStudy } from "@/data/types";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { getCategoryLabel, getIndustryLabel } from "@/lib/i18n-helpers";
import { pickLocaleText } from "@/lib/filter-helpers";

export function CaseCard({ item, locale }: { item: CaseStudy; locale: Locale }) {
  const dictionary = getDictionary(locale);
  const partner = getPartnerBySlug(item.partnerSlug);
  const base = locale === "ru" ? "/ru" : "";

  return (
    <Card className="flex h-full flex-col gap-4 transition-all hover:border-accent/40 hover:shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <CardTitle>{pickLocaleText(item.title, locale)}</CardTitle>
        <Badge variant="muted">{getIndustryLabel(dictionary, item.industry)}</Badge>
      </div>
      <CardDescription>{pickLocaleText(item.summary, locale)}</CardDescription>
      <div className="flex flex-wrap gap-2">
        {item.categories.slice(0, 2).map((category) => (
          <Badge key={category} variant="muted">
            {getCategoryLabel(dictionary, category)}
          </Badge>
        ))}
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            {dictionary.cases.card.outcome}
          </p>
          <p className="mt-1 text-sm text-foreground">
            {pickLocaleText(item.outcomes[0], locale)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">
            {dictionary.cases.card.whatDone}
          </p>
          <p className="mt-1 text-sm text-muted">
            {pickLocaleText(item.approach, locale)}
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4" /> {pickLocaleText(item.timeline, locale)}
        </span>
        <span>{partner?.companyName ?? item.partnerSlug}</span>
      </div>
      <Link
        href={`${base}/cases/${item.slug}`}
        className="inline-flex items-center gap-2 text-sm text-accent-strong"
      >
        <span>{dictionary.cases.card.readCase}</span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
