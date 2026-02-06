import Link from 'next/link';
import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default async function AdminRequestsPage() {
  const requests = await prisma.leadRequest.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lead requests</h1>
        <p className="text-muted">Manage intake requests and statuses.</p>
      </div>
      <Card>
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold">{request.companyName}</p>
                <p className="text-xs text-muted">{request.requesterEmail}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge>{request.status}</Badge>
                <Link className="link-glow text-xs" href={`/admin/requests/${request.id}`}>
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
