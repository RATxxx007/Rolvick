import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { caseStudySchema } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default async function CasesPage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email ?? '';

  const partner = await prisma.partnerProfile.findFirst({
    where: { user: { email: userEmail } },
    include: { cases: true }
  });

  async function createCase(formData: FormData) {
    'use server';
    const session = await getServerSession(authOptions);
    const email = session?.user?.email ?? '';
    const partnerRecord = await prisma.partnerProfile.findFirst({
      where: { user: { email } }
    });
    if (!partnerRecord) {
      throw new Error('Partner not found');
    }
    const raw = {
      title: String(formData.get('title') ?? ''),
      industry: String(formData.get('industry') ?? ''),
      problem: String(formData.get('problem') ?? ''),
      solution: String(formData.get('solution') ?? ''),
      outcomes: String(formData.get('outcomes') ?? ''),
      isPublic: Boolean(formData.get('isPublic'))
    };

    const parsed = caseStudySchema.parse(raw);

    await prisma.caseStudy.create({
      data: {
        partnerId: partnerRecord.id,
        ...parsed
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Case studies</h1>
        <p className="text-muted">Manage your public-facing outcomes.</p>
      </div>
      <Card>
        <h2 className="text-lg font-semibold">Add new case</h2>
        <form action={createCase} className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="title" placeholder="Case title" required />
            <Input name="industry" placeholder="Industry" required />
          </div>
          <Textarea name="problem" placeholder="Problem" rows={3} required />
          <Textarea name="solution" placeholder="Solution" rows={3} required />
          <Textarea name="outcomes" placeholder="Outcomes" rows={2} required />
          <label className="flex items-center gap-2 text-xs text-muted">
            <input type="checkbox" name="isPublic" defaultChecked className="h-4 w-4" />
            Public case
          </label>
          <button
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
            type="submit"
          >
            Create case
          </button>
        </form>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Existing cases</h2>
        <div className="mt-4 space-y-4">
          {partner?.cases.length ? (
            partner.cases.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="flex items-center justify-between rounded-2xl border border-border p-4"
              >
                <div>
                  <p className="font-semibold">{caseStudy.title}</p>
                  <p className="text-xs text-muted">{caseStudy.industry}</p>
                </div>
                <Link className="link-glow text-xs" href={`/app/cases/${caseStudy.id}`}>
                  Edit
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">No cases yet. Add one to showcase your work.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
