import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/card';

export default async function AdminDashboard() {
  const [partners, requests, intros] = await Promise.all([
    prisma.partnerProfile.count(),
    prisma.leadRequest.count(),
    prisma.intro.count()
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin dashboard</h1>
        <p className="text-muted">Monitor partner approvals and request flow.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <p className="text-sm text-muted">Partners</p>
          <p className="text-2xl font-semibold">{partners}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Requests</p>
          <p className="text-2xl font-semibold">{requests}</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Intros</p>
          <p className="text-2xl font-semibold">{intros}</p>
        </Card>
      </div>
    </div>
  );
}
