import Link from "next/link";
import { CheckCircle2, Globe, Languages } from "lucide-react";

import type { Partner } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { getCategoryLabel } from "@/lib/i18n-helpers";
import { pickLocaleText } from "@/lib/filter-helpers";

export function PartnerCard({ partner, locale }: { partner: Partner; locale: Locale }) {
  const dictionary = getDictionary(locale);
  const base = locale === "ru" ? "/ru" : "";
  const statusLabel = dictionary.statuses[partner.status] ?? partner.status;
  const categories = partner.categories.map((category) =>
    getCategoryLabel(dictionary, category),
  );
  const visibleCategories = categories.slice(0, 2);
  const extraCount = Math.max(categories.length - visibleCategories.length, 0);
  const priceFrom = partner.packages[0]?.priceFromUSD ?? 0;
  const timeline = partner.packages[0]
    ? pickLocaleText(partner.packages[0].timeline, locale)
    : "";

  return (
    <Card className="flex h-full flex-col gap-4 transition-all hover:border-accent/40 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <CardTitle>{partner.companyName}</CardTitle>
          <CardDescription className="text-sm text-muted">
            {pickLocaleText(partner.tagline, locale)}
          </CardDescription>
        </div>
        <Badge variant={partner.status === "verified" ? "default" : "muted"}>
          {partner.status === "verified" ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : null}
          {statusLabel}
        </Badge>
      </div>
      <p className="text-sm text-muted">{pickLocaleText(partner.description, locale)}</p>
      <div className="flex flex-wrap gap-2">
        {visibleCategories.map((category) => (
          <Badge key={category} variant="muted">
            {category}
          </Badge>
        ))}
        {extraCount > 0 ? (
          <Badge variant="muted">
            +{extraCount} {dictionary.misc.more}
          </Badge>
        ) : null}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-muted">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-4 w-4" /> {partner.regions.join(" / ")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Languages className="h-4 w-4" /> {partner.languages.join(" / ")}
          </span>
        </div>
        <Link href={`${base}/partners/${partner.slug}`}>
          <Button variant="secondary" size="sm">
            {dictionary.misc.viewProfile}
          </Button>
        </Link>
      </div>
      <p className="text-xs uppercase tracking-wide text-muted">
        {dictionary.misc.from} ${priceFrom.toLocaleString()} • {timeline}
      </p>
    </Card>
  );
}
