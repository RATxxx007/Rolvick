import Link from 'next/link';
import { prisma } from '@/lib/db';

export default async function RequestReceivedPage({
  searchParams
}: {
  searchParams: { id?: string };
}) {
  const lead = searchParams.id
    ? await prisma.leadRequest.findUnique({ where: { id: searchParams.id } })
    : null;

  return (
    <div className="surface space-y-4 p-8">
      <h1 className="text-3xl font-semibold">Request received</h1>
      <p className="text-muted">
        Status: <span className="text-foreground">Received</span>
      </p>
      <p className="text-sm text-muted">
        {lead
          ? `Thank you ${lead.requesterName}. We'll review your request and coordinate intros within 24 hours.`
          : 'Thanks for your request. We will follow up shortly.'}
      </p>
      <Link className="link-glow text-sm" href="/partners">
        Back to partners
      </Link>
    </div>
  );
}
