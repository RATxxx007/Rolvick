import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";

const stats = [
  { key: "verifiedPartners", value: "4" },
  { key: "publicCases", value: "6" },
  { key: "regions", value: "4" },
  { key: "domains", value: "10" },
] as const;

export function HomeStats({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.key}
          className="rounded-2xl border border-white/10 bg-surface-2 p-5"
        >
          <p className="text-xs uppercase tracking-wide text-muted">
            {dictionary.stats[stat.key]}
          </p>
          <p className="mt-2 font-heading text-3xl font-semibold text-white">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}
