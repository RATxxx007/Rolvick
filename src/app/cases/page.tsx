import type { Metadata } from "next";

import { CasesCatalog } from "@/components/cases/cases-catalog";

export const metadata: Metadata = {
  title: "Cases | Partner Portal",
  description: "Review public delivery cases across the partner ecosystem.",
};

export default function CasesPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-cyan-200">Outcomes</p>
        <h1 className="font-heading text-4xl font-semibold">Public Case Studies</h1>
        <p className="max-w-2xl text-zinc-300">
          Browse documented project outcomes from strategy, engineering, security, and
          growth engagements.
        </p>
      </section>
      <CasesCatalog />
    </div>
  );
}
