import { prisma } from '@/lib/db';
import { CATEGORIES, REGIONS, LANGUAGES } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { PartnerCatalog } from '@/components/partner-catalog';

function parseMulti(value?: string | string[]) {
  if (!value) return [] as string[];
  if (Array.isArray(value)) return value;
  return value.split(',').map((item) => item.trim()).filter(Boolean);
}

export default async function PartnersPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  const categories = parseMulti(searchParams.categories);
  const region = typeof searchParams.region === 'string' ? searchParams.region : '';
  const language = typeof searchParams.language === 'string' ? searchParams.language : '';
  const verifiedOnly = searchParams.verified === 'true';

  const partners = await prisma.partnerProfile.findMany({
    where: {
      status: 'APPROVED',
      companyName: query ? { contains: query, mode: 'insensitive' } : undefined,
      categories: categories.length ? { hasSome: categories } : undefined,
      regions: region ? { has: region } : undefined,
      languages: language ? { has: language } : undefined,
      isVerified: verifiedOnly ? true : undefined
    },
    include: {
      packages: true
    },
    orderBy: { isVerified: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Partner catalog</h1>
        <p className="text-muted">Search by specialty, region, and verified status.</p>
      </div>

      <form className="surface grid gap-4 p-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <label className="text-xs uppercase text-muted">Search</label>
          <Input name="q" placeholder="Search by partner or tags" defaultValue={query} />
        </div>
        <div>
          <label className="text-xs uppercase text-muted">Region</label>
          <select
            name="region"
            defaultValue={region}
            className="w-full rounded-2xl border border-border bg-surfaceMuted px-4 py-2 text-sm"
          >
            <option value="">All regions</option>
            {REGIONS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase text-muted">Language</label>
          <select
            name="language"
            defaultValue={language}
            className="w-full rounded-2xl border border-border bg-surfaceMuted px-4 py-2 text-sm"
          >
            <option value="">All languages</option>
            {LANGUAGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="lg:col-span-4">
          <span className="text-xs uppercase text-muted">Categories</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  defaultChecked={categories.includes(category)}
                  className="h-4 w-4 rounded border-border bg-surface"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            name="verified"
            value="true"
            defaultChecked={verifiedOnly}
            className="h-4 w-4 rounded border-border bg-surface"
          />
          Verified only
        </label>
        <button
          className="rounded-2xl border border-border bg-surfaceMuted px-5 py-2 text-xs font-semibold uppercase tracking-wide text-foreground transition hover:bg-surface"
          type="submit"
        >
          Apply filters
        </button>
      </form>

      <PartnerCatalog
        partners={partners.map((partner) => ({
          id: partner.id,
          slug: partner.slug,
          companyName: partner.companyName,
          tagline: partner.tagline,
          categories: partner.categories,
          regions: partner.regions,
          isVerified: partner.isVerified
        }))}
      />
    </div>
  );
}
