import Link from "next/link";

import { HomeHero } from "@/components/home/home-hero";
import { HomeStats } from "@/components/home/home-stats";
import { PartnerCard } from "@/components/partners/partner-card";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/cases";
import { partners } from "@/data/partners";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HomeHero />
      <HomeStats />

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold">Featured Partners</h2>
          <Link href="/partners">
            <Button variant="secondary">View All</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {partners.slice(0, 4).map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-heading text-2xl font-semibold">Recent Public Cases</h2>
          <Link href="/cases">
            <Button variant="secondary">Browse Cases</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.slice(0, 4).map((item) => (
            <article
              key={item.slug}
              className="rounded-2xl border border-white/10 bg-[#11141a] p-6"
            >
              <h3 className="font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.summary}</p>
              <p className="mt-4 text-xs uppercase tracking-wide text-zinc-500">
                {item.industry} • {item.duration}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
