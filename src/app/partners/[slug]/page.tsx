import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default async function PartnerDetailPage({ params }: { params: { slug: string } }) {
  const partner = await prisma.partnerProfile.findUnique({
    where: { slug: params.slug, status: 'APPROVED' },
    include: { packages: true, cases: true }
  });

  if (!partner) {
    notFound();
  }

  const publicCases = partner.cases.filter((item) => item.isPublic).slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="surface p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-semibold">{partner.companyName}</h1>
              {partner.isVerified && <Badge>Verified</Badge>}
            </div>
            <p className="text-muted">{partner.tagline}</p>
            <p className="text-sm text-muted">{partner.description}</p>
            <div className="flex flex-wrap gap-2">
              {partner.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="text-xs text-muted">
              Regions: {partner.regions.join(', ')} · Languages: {partner.languages.join(', ')}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href={`/request?partner=${partner.slug}`}
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
            >
              Request intro
            </Link>
            <Link className="text-xs text-muted" href={partner.websiteUrl}>
              {partner.websiteUrl}
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">Packages</h2>
          <div className="mt-4 space-y-4">
            {partner.packages.slice(0, 3).map((pkg) => (
              <div key={pkg.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{pkg.name}</h3>
                  <span className="text-sm text-muted">From ${pkg.priceFromUsd}</span>
                </div>
                <p className="text-xs text-muted">Timeline: {pkg.timeline}</p>
                <ul className="mt-2 list-disc pl-4 text-xs text-muted">
                  {pkg.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            {partner.packages.length === 0 && (
              <p className="text-sm text-muted">No packages listed yet.</p>
            )}
          </div>
        </Card>
        <Card>
          <h2 className="text-lg font-semibold">Case studies</h2>
          <div className="mt-4 space-y-4">
            {publicCases.map((caseStudy) => (
              <div key={caseStudy.id} className="rounded-2xl border border-border p-4">
                <h3 className="font-semibold">{caseStudy.title}</h3>
                <p className="text-xs text-muted">Industry: {caseStudy.industry}</p>
                <p className="mt-2 text-xs text-muted">{caseStudy.outcomes}</p>
              </div>
            ))}
            {publicCases.length === 0 && (
              <p className="text-sm text-muted">No public case studies available.</p>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}
