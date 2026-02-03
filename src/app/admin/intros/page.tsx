import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default async function AdminIntrosPage() {
  const intros = await prisma.intro.findMany({
    include: { partner: true, leadRequest: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Intros</h1>
        <p className="text-muted">Review intro assignments and outcomes.</p>
      </div>
      <Card>
        <div className="space-y-4">
          {intros.map((intro) => (
            <div
              key={intro.id}
              className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold">{intro.partner.companyName}</p>
                <p className="text-xs text-muted">{intro.leadRequest.companyName}</p>
              </div>
              <Badge>{intro.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
