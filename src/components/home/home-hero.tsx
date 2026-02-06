import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_45%),linear-gradient(120deg,#151a22,#0f1218)] px-8 py-14">
      <p className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
        Premium Partner Network
      </p>
      <h1 className="font-heading max-w-3xl text-4xl font-semibold leading-tight text-zinc-100 lg:text-5xl">
        Partner Portal for strategic delivery across product, AI, security, and growth.
      </h1>
      <p className="mt-5 max-w-2xl text-base text-zinc-300">
        Curated teams from CoreBiz and B5 ecosystem, with transparent service packages and
        public implementation outcomes.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/partners">
          <Button size="lg">Explore Partners</Button>
        </Link>
        <Link href="/cases">
          <Button size="lg" variant="secondary">
            Review Case Studies
          </Button>
        </Link>
      </div>
    </section>
  );
}
