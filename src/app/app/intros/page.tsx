import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatBudgetTier } from '@/lib/budget';

export default async function IntrosPage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email ?? '';

  const partner = await prisma.partnerProfile.findFirst({
    where: { user: { email: userEmail } },
    include: {
      intros: {
        include: {
          leadRequest: true
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Intros</h1>
        <p className="text-muted">Review inbound introductions assigned to your team.</p>
      </div>
      <Card>
        <div className="space-y-4">
          {partner?.intros.length ? (
            partner.intros.map((intro) => (
              <div
                key={intro.id}
                className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold">{intro.leadRequest.companyName}</p>
                  <p className="text-xs text-muted">{intro.leadRequest.message}</p>
                  <p className="text-xs text-muted">
                    Budget: {formatBudgetTier(intro.leadRequest.budget)} · Region:{' '}
                    {intro.leadRequest.region}
                  </p>
                </div>
                <Badge>{intro.status}</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">No intros yet. Stay tuned for new matches.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
