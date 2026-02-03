import { LeadStatus } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { formatBudgetTier } from '@/lib/budget';

export default async function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  const request = await prisma.leadRequest.findUnique({
    where: { id: params.id },
    include: { intros: { include: { partner: true } } }
  });

  if (!request) {
    notFound();
  }

  const partners = await prisma.partnerProfile.findMany({
    where: { status: 'APPROVED' },
    orderBy: { companyName: 'asc' }
  });

  async function updateStatus(formData: FormData) {
    'use server';
    const status = String(formData.get('status') ?? '');
    if (!Object.values(LeadStatus).includes(status as LeadStatus)) {
      throw new Error('Invalid status');
    }
    await prisma.leadRequest.update({
      where: { id: request.id },
      data: { status: status as LeadStatus }
    });
    redirect(`/admin/requests/${request.id}`);
  }

  async function assignIntros(formData: FormData) {
    'use server';
    const selectedPartners = formData.getAll('partners').map(String);
    await prisma.intro.createMany({
      data: selectedPartners.map((partnerId) => ({
        leadRequestId: request.id,
        partnerId
      })),
      skipDuplicates: true
    });
    await prisma.leadRequest.update({
      where: { id: request.id },
      data: { status: LeadStatus.MATCHED }
    });
    redirect(`/admin/requests/${request.id}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Request details</h1>
        <p className="text-muted">{request.companyName}</p>
      </div>
      <Card>
        <div className="space-y-2 text-sm text-muted">
          <p>
            <span className="text-foreground">Requester:</span> {request.requesterName} ·{' '}
            {request.requesterEmail}
          </p>
          <p>
            <span className="text-foreground">Budget:</span>{' '}
            {formatBudgetTier(request.budget)} ·{' '}
            <span className="text-foreground">Region:</span> {request.region}
          </p>
          <p>{request.message}</p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Badge>{request.status}</Badge>
          <form action={updateStatus}>
            <input type="hidden" name="status" value="INTRO_SENT" />
            <button className="rounded-2xl border border-border px-4 py-2 text-xs">
              Mark intro sent
            </button>
          </form>
          <form action={updateStatus}>
            <input type="hidden" name="status" value="CLOSED" />
            <button className="rounded-2xl border border-border px-4 py-2 text-xs">
              Close
            </button>
          </form>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Assign intros</h2>
        <form action={assignIntros} className="mt-4 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {partners.map((partner) => (
              <label key={partner.id} className="flex items-center gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  name="partners"
                  value={partner.id}
                  defaultChecked={request.intros.some((intro) => intro.partnerId === partner.id)}
                  className="h-4 w-4"
                />
                {partner.companyName}
              </label>
            ))}
          </div>
          <button
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
            type="submit"
          >
            Save intros
          </button>
        </form>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Current intros</h2>
        <div className="mt-4 space-y-3">
          {request.intros.length ? (
            request.intros.map((intro) => (
              <div
                key={intro.id}
                className="flex items-center justify-between rounded-2xl border border-border p-4"
              >
                <div>
                  <p className="font-semibold">{intro.partner.companyName}</p>
                  <p className="text-xs text-muted">{intro.partner.tagline}</p>
                </div>
                <Badge>{intro.status}</Badge>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">No intros assigned yet.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
