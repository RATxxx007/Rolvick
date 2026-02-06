import Link from "next/link";
import { CheckCircle2, Globe } from "lucide-react";

import type { Partner } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type PartnerCardProps = {
  partner: Partner;
};

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 transition-all hover:border-cyan-300/30 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.18),0_24px_80px_rgba(0,0,0,0.42)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardTitle>{partner.companyName}</CardTitle>
          <CardDescription className="mt-1">{partner.tagline}</CardDescription>
        </div>
        {partner.isVerified ? (
          <Badge>
            <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Verified
          </Badge>
        ) : (
          <Badge variant="muted">Active Partner</Badge>
        )}
      </div>
      <p className="text-sm text-zinc-300">{partner.description}</p>
      <div className="flex flex-wrap gap-2">
        {partner.categories.map((category) => (
          <Badge key={category} variant="muted">
            {category}
          </Badge>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm text-zinc-400">
        <span className="inline-flex items-center gap-1.5">
          <Globe className="h-4 w-4" /> {partner.regions.join(" / ")}
        </span>
        <Link href={`/partners/${partner.slug}`}>
          <Button variant="secondary" size="sm">
            View Profile
          </Button>
        </Link>
      </div>
    </Card>
  );
}
