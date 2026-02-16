import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { withBasePath } from "@/lib/base-path";

export function HomeHero({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const base = locale === "ru" ? "/ru" : "";
  const ownerName = locale === "ru" ? "Никита Ушаков" : "Nick Ushakov";

  return (
    <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_45%),linear-gradient(120deg,#11141a,#0f1218)] px-8 py-14">
      <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
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
        </div>

        <aside className="shrink-0">
          <div className="group relative w-fit rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d10]">
              <img
                src={withBasePath("/nikita-ushakov.jpg")}
                alt={ownerName}
                className="h-52 w-52 object-cover object-[50%_35%] md:h-72 md:w-72"
                loading="eager"
              />
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted">{dictionary.hero.curatedBy}</p>
              <p className="mt-1 text-base font-medium text-white">{ownerName}</p>
            </div>
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 ring-1 ring-accent/30 transition-opacity group-hover:opacity-100" />
          </div>
        </aside>
      </div>
    </section>
  );
}
