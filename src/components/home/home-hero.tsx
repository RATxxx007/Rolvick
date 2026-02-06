import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";

export function HomeHero({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const base = locale === "ru" ? "/ru" : "";

  return (
    <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_45%),linear-gradient(120deg,#11141a,#0f1218)] px-8 py-14">
      <p className="mb-4 inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs text-white">
        {dictionary.hero.eyebrow}
      </p>
      <h1 className="font-heading max-w-[18ch] text-4xl font-semibold leading-tight text-white md:text-5xl">
        {dictionary.hero.title}
      </h1>
      <p className="mt-5 max-w-[65ch] text-[17px] text-muted">
        {dictionary.hero.subtitle}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={`${base}/partners`}>
          <Button size="lg">{dictionary.hero.primaryCta}</Button>
        </Link>
        <Link href={`${base}/cases`}>
          <Button size="lg" variant="secondary">
            {dictionary.hero.secondaryCta}
          </Button>
        </Link>
      </div>
    </section>
  );
}
