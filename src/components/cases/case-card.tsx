import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPartnerBySlug } from "@/data/partners";
import type { CaseStudy } from "@/data/types";

type CaseCardProps = {
  item: CaseStudy;
};

export function CaseCard({ item }: CaseCardProps) {
  const partner = getPartnerBySlug(item.partnerSlug);

  return (
    <Card className="flex h-full flex-col gap-4 transition-all hover:border-cyan-300/30 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_24px_80px_rgba(0,0,0,0.42)]">
      <div className="flex items-center justify-between gap-3">
        <CardTitle>{item.title}</CardTitle>
        <Badge variant="muted">{item.industry}</Badge>
      </div>
      <CardDescription>{item.summary}</CardDescription>
      <div className="flex flex-wrap gap-2">
        {item.categories.map((category) => (
          <Badge key={category} variant="muted">
            {category}
          </Badge>
        ))}
      </div>
      <ul className="space-y-1 text-sm text-zinc-300">
        {item.outcomes.map((outcome) => (
          <li key={outcome} className="inline-flex items-start gap-2">
            <ArrowRight className="mt-0.5 h-4 w-4 text-cyan-300" />
            {outcome}
          </li>
        ))}
      </ul>
      <p className="mt-auto text-sm text-zinc-500">
        Partner: {partner?.companyName ?? item.partnerSlug} • Duration: {item.duration}
      </p>
    </Card>
  );
}
