import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { leadRequestSchema } from '@/lib/validators';
import { mapBudgetTier } from '@/lib/budget';
import { CATEGORIES, REGIONS, BUDGETS } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function RequestPage({
  searchParams
}: {
  searchParams: { partner?: string };
}) {
  async function createLeadRequest(formData: FormData) {
    'use server';
    const raw = {
      requesterName: String(formData.get('requesterName') ?? ''),
      requesterEmail: String(formData.get('requesterEmail') ?? ''),
      companyName: String(formData.get('companyName') ?? ''),
      message: String(formData.get('message') ?? ''),
      budget: String(formData.get('budget') ?? ''),
      region: String(formData.get('region') ?? ''),
      categories: formData.getAll('categories').map(String)
    };

    const parsed = leadRequestSchema.parse(raw);

    const lead = await prisma.leadRequest.create({
      data: {
        requesterName: parsed.requesterName,
        requesterEmail: parsed.requesterEmail,
        companyName: parsed.companyName,
        message: parsed.message,
        budget: mapBudgetTier(parsed.budget),
        region: parsed.region,
        categories: parsed.categories
      }
    });

    const partnerSlug = formData.get('partnerSlug');
    if (partnerSlug) {
      const partner = await prisma.partnerProfile.findUnique({
        where: { slug: String(partnerSlug) }
      });
      if (partner) {
        await prisma.intro.create({
          data: {
            leadRequestId: lead.id,
            partnerId: partner.id
          }
        });
      }
    }

    redirect(`/request/received?id=${lead.id}`);
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Request an intro</h1>
        <p className="text-muted">
          Share your project details and we will route you to the best partner.
        </p>
      </div>
      <form action={createLeadRequest} className="surface space-y-6 p-8">
        <input type="hidden" name="partnerSlug" value={searchParams.partner ?? ''} />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-muted">Name</label>
            <Input name="requesterName" required placeholder="Jane Smith" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Email</label>
            <Input name="requesterEmail" type="email" required placeholder="jane@company.com" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Company</label>
            <Input name="companyName" required placeholder="Company name" />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Budget</label>
            <select
              name="budget"
              className="w-full rounded-2xl border border-border bg-surfaceMuted px-4 py-2 text-sm"
              required
            >
              <option value="">Select budget</option>
              {BUDGETS.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Region</label>
            <select
              name="region"
              className="w-full rounded-2xl border border-border bg-surfaceMuted px-4 py-2 text-sm"
              required
            >
              <option value="">Select region</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-muted">Categories</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 text-xs text-muted">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  className="h-4 w-4 rounded border-border bg-surface"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-muted">Message</label>
          <Textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us about the project goals and timeline."
          />
        </div>
        <button
          className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
          type="submit"
        >
          Submit request
        </button>
      </form>
    </div>
  );
}
