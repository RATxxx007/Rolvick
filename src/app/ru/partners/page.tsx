import type { Metadata } from "next";

import { PartnersCatalog } from "@/components/partners/partners-catalog";
import { partners } from "@/data/partners";
import { getDictionary } from "@/i18n";

export const metadata: Metadata = {
  title: "Партнеры | Partner Portal",
  description: "Каталог проверенных партнеров и команд.",
};

const locale = "ru" as const;

export default function PartnersPageRu() {
  const dictionary = getDictionary(locale);

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-accent-strong">
          {dictionary.nav.partners}
        </p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          {dictionary.directory.title}
        </h1>
        <p className="max-w-[65ch] text-base text-muted">
          {dictionary.directory.subtitle}
        </p>
      </section>
      <PartnersCatalog locale={locale} partners={partners} />
    </div>
  );
}
