import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getPartnerBySlug, partners } from "@/data/partners";

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
      title: "Partner Not Found | Partner Portal",
    };
  }

  return {
    title: `${partner.companyName} | Partner Portal`,
    description: partner.description,
  };
}

export default async function PartnerProfilePage({ params }: PartnerPageProps) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-white/10 bg-[#11141a] p-8">
        <p className="text-sm uppercase tracking-wide text-cyan-200">Partner Profile</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold">
          {partner.companyName}
        </h1>
        <p className="mt-2 text-zinc-300">{partner.tagline}</p>
        <p className="mt-5 max-w-3xl text-zinc-300">{partner.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {partner.categories.map((category) => (
            <Badge key={category} variant="muted">
              {category}
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={partner.websiteUrl} target="_blank" rel="noreferrer">
            <Button>
              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="secondary">Contact Team</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardTitle>Regions</CardTitle>
          <CardDescription className="mt-3 text-zinc-300">
            {partner.regions.join(" / ")}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Languages</CardTitle>
          <CardDescription className="mt-3 text-zinc-300">
            {partner.languages.join(" / ")}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Tags</CardTitle>
          <CardDescription className="mt-3 text-zinc-300">
            {partner.tags.join(" / ")}
          </CardDescription>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold">Service Packages</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {partner.packages.map((item) => (
            <Card key={item.name} className="flex flex-col gap-4">
              <div>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription className="mt-1 text-zinc-300">
                  From ${item.priceFromUSD.toLocaleString()} • {item.timeline}
                </CardDescription>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable}>• {deliverable}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
