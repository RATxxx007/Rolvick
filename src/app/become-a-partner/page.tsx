import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { mapBudgetTier } from '@/lib/budget';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function BecomePartnerPage() {
  async function submitApplication(formData: FormData) {
    'use server';
    const requesterName = String(formData.get('requesterName') ?? '');
    const requesterEmail = String(formData.get('requesterEmail') ?? '');
    const companyName = String(formData.get('companyName') ?? '');
    const message = String(formData.get('message') ?? '');
    const region = String(formData.get('region') ?? '');

    if (!requesterName || !requesterEmail || !companyName || !message || !region) {
      throw new Error('Missing fields');
    }

    const lead = await prisma.leadRequest.create({
      data: {
        requesterName,
        requesterEmail,
        companyName,
        message,
        budget: mapBudgetTier('under_5k'),
        region,
        categories: ['partner_application']
      }
    });

    redirect(`/request/received?id=${lead.id}`);
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Become a partner</h1>
        <p className="text-muted">
          Share your company profile to join the CoreBiz + B5 partner network.
        </p>
      </div>
      <form action={submitApplication} className="surface space-y-6 p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-muted">Name</label>
            <Input name="requesterName" required placeholder="Elena Petrova" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Email</label>
            <Input name="requesterEmail" required type="email" placeholder="team@agency.com" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Company</label>
            <Input name="companyName" required placeholder="Company name" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Region</label>
            <Input name="region" required placeholder="EU" />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-muted">Why join</label>
          <Textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us about your expertise and differentiators."
          />
        </div>
        <button
          className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
          type="submit"
        >
          Submit application
        </button>
      </form>
    </div>
  );
}
