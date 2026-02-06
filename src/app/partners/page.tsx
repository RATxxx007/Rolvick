import type { Metadata } from "next";

import { PartnersCatalog } from "@/components/partners/partners-catalog";

export const metadata: Metadata = {
  title: "Partners | Partner Portal",
  description: "Browse verified service partners by capability and region.",
};

export default function PartnersPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-cyan-200">Directory</p>
        <h1 className="font-heading text-4xl font-semibold">Partner Catalog</h1>
        <p className="max-w-2xl text-zinc-300">
          Filter by domain expertise, region, and strategic fit to find the right delivery
          partner.
        </p>
      </section>
      <PartnersCatalog />
    </div>
  );
}
