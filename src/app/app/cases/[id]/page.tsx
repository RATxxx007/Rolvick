import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { caseStudySchema } from '@/lib/validators';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default async function CaseEditPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email ?? '';

  const caseStudy = await prisma.caseStudy.findFirst({
    where: { id: params.id, partner: { user: { email: userEmail } } }
  });

  if (!caseStudy) {
    notFound();
  }

  async function updateCase(formData: FormData) {
    'use server';
    const raw = {
      title: String(formData.get('title') ?? ''),
      industry: String(formData.get('industry') ?? ''),
      problem: String(formData.get('problem') ?? ''),
      solution: String(formData.get('solution') ?? ''),
      outcomes: String(formData.get('outcomes') ?? ''),
      isPublic: Boolean(formData.get('isPublic'))
    };

    const parsed = caseStudySchema.parse(raw);

    await prisma.caseStudy.update({
      where: { id: caseStudy.id },
      data: parsed
    });

    redirect('/app/cases');
  }

  async function deleteCase() {
    'use server';
    await prisma.caseStudy.delete({ where: { id: caseStudy.id } });
    redirect('/app/cases');
  }

  return (
    <div className="surface space-y-4 p-8">
      <h1 className="text-2xl font-semibold">Edit case</h1>
      <form action={updateCase} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Input name="title" defaultValue={caseStudy.title} required />
          <Input name="industry" defaultValue={caseStudy.industry} required />
        </div>
        <Textarea name="problem" defaultValue={caseStudy.problem} rows={3} required />
        <Textarea name="solution" defaultValue={caseStudy.solution} rows={3} required />
        <Textarea name="outcomes" defaultValue={caseStudy.outcomes} rows={2} required />
        <label className="flex items-center gap-2 text-xs text-muted">
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={caseStudy.isPublic}
            className="h-4 w-4"
          />
          Public case
        </label>
        <div className="flex gap-3">
          <button
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
            type="submit"
          >
            Save changes
          </button>
          <button
            className="rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surfaceMuted"
            formAction={deleteCase}
            type="submit"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
