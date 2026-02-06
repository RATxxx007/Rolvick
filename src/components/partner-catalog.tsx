import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export type PartnerCard = {
  id: string;
  slug: string;
  companyName: string;
  tagline: string;
  categories: string[];
  regions: string[];
  isVerified: boolean;
};

export function PartnerCatalog({ partners }: { partners: PartnerCard[] }) {
  if (!partners.length) {
    return (
      <div className="surface p-8 text-center">
        <p className="text-muted">No partners match yet. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {partners.map((partner) => (
        <Card key={partner.id} className="card-hover">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{partner.companyName}</h3>
              {partner.isVerified && <Badge>Verified</Badge>}
            </div>
            <p className="text-sm text-muted">{partner.tagline}</p>
            <div className="flex flex-wrap gap-2">
              {partner.categories.slice(0, 4).map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>{partner.regions.join(', ')}</span>
              <Link className="link-glow" href={`/partners/${partner.slug}`}>
                View profile
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
