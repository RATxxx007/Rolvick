import { PartnerStatus } from '@prisma/client';
import { prisma } from '@/lib/db';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default async function AdminPartnersPage() {
  const partners = await prisma.partnerProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  async function updateStatus(formData: FormData) {
    'use server';
    const partnerId = String(formData.get('partnerId') ?? '');
    const status = String(formData.get('status') ?? '');
    if (!partnerId) return;
    if (!Object.values(PartnerStatus).includes(status as PartnerStatus)) {
      throw new Error('Invalid status');
    }
    await prisma.partnerProfile.update({
      where: { id: partnerId },
      data: { status: status as PartnerStatus }
    });
  }

  async function toggleVerified(formData: FormData) {
    'use server';
    const partnerId = String(formData.get('partnerId') ?? '');
    const current = String(formData.get('current') ?? 'false') === 'true';
    await prisma.partnerProfile.update({
      where: { id: partnerId },
      data: { isVerified: !current }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Partners</h1>
        <p className="text-muted">Approve, reject, and verify partner profiles.</p>
      </div>
      <Card>
        <div className="space-y-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col gap-4 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-semibold">{partner.companyName}</p>
                <p className="text-xs text-muted">{partner.user.email}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge>{partner.status}</Badge>
                  {partner.isVerified && <Badge>Verified</Badge>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <form action={updateStatus}>
                  <input type="hidden" name="partnerId" value={partner.id} />
                  <input type="hidden" name="status" value="APPROVED" />
                  <button className="rounded-2xl border border-border px-4 py-2 text-xs">
                    Approve
                  </button>
                </form>
                <form action={updateStatus}>
                  <input type="hidden" name="partnerId" value={partner.id} />
                  <input type="hidden" name="status" value="REJECTED" />
                  <button className="rounded-2xl border border-border px-4 py-2 text-xs">
                    Reject
                  </button>
                </form>
                <form action={toggleVerified}>
                  <input type="hidden" name="partnerId" value={partner.id} />
                  <input type="hidden" name="current" value={String(partner.isVerified)} />
                  <button className="rounded-2xl border border-border px-4 py-2 text-xs">
                    Toggle verified
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
