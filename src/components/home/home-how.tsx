import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";

export function HomeHow({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <section className="rounded-3xl border border-white/10 bg-surface p-8">
      <h2 className="font-heading text-2xl font-semibold text-white">
        {dictionary.howItWorks.title}
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {dictionary.howItWorks.steps.map((step) => (
          <div
            key={step.title}
            className="rounded-2xl border border-white/10 bg-surface-2 p-5"
          >
            <h3 className="font-heading text-lg font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
