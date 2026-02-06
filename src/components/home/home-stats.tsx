const stats = [
  { label: "Verified Partners", value: "4" },
  { label: "Public Case Studies", value: "6" },
  { label: "Regions Covered", value: "4" },
  { label: "Core Service Domains", value: "10" },
];

export function HomeStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-[#11141a] p-5"
        >
          <p className="text-xs uppercase tracking-wide text-zinc-500">{stat.label}</p>
          <p className="mt-2 font-heading text-3xl font-semibold text-zinc-100">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}
