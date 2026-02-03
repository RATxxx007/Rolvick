import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function AppDashboardPage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const partner = userEmail
    ? await prisma.partnerProfile.findFirst({
        where: { user: { email: userEmail } },
        include: { packages: true, intros: { include: { leadRequest: true } } }
      })
    : null;

  const completion = partner
    ? Math.round(
        (
          [
            partner.tagline,
            partner.description,
            partner.websiteUrl,
            partner.categories.length,
            partner.tags.length,
            partner.packages.length
          ].filter(Boolean).length /
            6
        ) *
          100
      )
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-muted">Track your profile strength and inbound intros.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-hover">
          <h2 className="text-lg font-semibold">Profile completion</h2>
          <p className="text-sm text-muted">{completion}% complete</p>
          <div className="mt-4 h-2 rounded-full bg-surfaceMuted">
            <div className="h-2 rounded-full bg-white" style={{ width: `${completion}%` }} />
          </div>
        </Card>
        <Card className="card-hover">
          <h2 className="text-lg font-semibold">Intro queue</h2>
          <p className="text-sm text-muted">
            {partner?.intros.length ?? 0} active intros assigned to your team.
          </p>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold">Latest intros</h2>
        <div className="mt-4 space-y-4">
          {partner?.intros.length ? (
            partner.intros.slice(0, 5).map((intro) => (
              <div
                key={intro.id}
                className="flex items-center justify-between rounded-2xl border border-border p-4"
              >
                <div>
                  <p className="text-sm font-semibold">{intro.leadRequest.companyName}</p>
                  <p className="text-xs text-muted">{intro.leadRequest.requesterName}</p>
                </div>
                <Badge>{intro.status}</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">No intros yet. Stay ready for new matches.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
