import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { partnerProfileSchema } from '@/lib/validators';
import { CATEGORIES, REGIONS, LANGUAGES } from '@/lib/constants';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email ?? '';

  const partner = await prisma.partnerProfile.findFirst({
    where: { user: { email: userEmail } },
    include: { packages: true }
  });

  async function updateProfile(formData: FormData) {
    'use server';
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      throw new Error('User not found');
    }

    const raw = {
      companyName: String(formData.get('companyName') ?? ''),
      tagline: String(formData.get('tagline') ?? ''),
      description: String(formData.get('description') ?? ''),
      websiteUrl: String(formData.get('websiteUrl') ?? ''),
      regions: formData.getAll('regions').map(String),
      languages: formData.getAll('languages').map(String),
      categories: formData.getAll('categories').map(String),
      tags: String(formData.get('tags') ?? '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      responseSlaHours: Number(formData.get('responseSlaHours'))
    };

    const parsed = partnerProfileSchema.parse(raw);

    const packages = [0, 1, 2]
      .map((index) => ({
        name: String(formData.get(`package_${index}_name`) ?? '').trim(),
        priceFromUsd: Number(formData.get(`package_${index}_price`) ?? 0),
        timeline: String(formData.get(`package_${index}_timeline`) ?? '').trim(),
        deliverables: String(formData.get(`package_${index}_deliverables`) ?? '')
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      }))
      .filter((pkg) => pkg.name && pkg.timeline && pkg.deliverables.length);

    await prisma.partnerProfile.upsert({
      where: { userId: user.id },
      update: {
        companyName: parsed.companyName,
        tagline: parsed.tagline,
        description: parsed.description,
        websiteUrl: parsed.websiteUrl,
        regions: parsed.regions,
        languages: parsed.languages,
        categories: parsed.categories,
        tags: parsed.tags,
        responseSlaHours: parsed.responseSlaHours,
        packages: {
          deleteMany: {},
          create: packages
        }
      },
      create: {
        userId: user.id,
        slug: parsed.companyName.toLowerCase().replace(/\s+/g, '-'),
        companyName: parsed.companyName,
        tagline: parsed.tagline,
        description: parsed.description,
        websiteUrl: parsed.websiteUrl,
        regions: parsed.regions,
        languages: parsed.languages,
        categories: parsed.categories,
        tags: parsed.tags,
        responseSlaHours: parsed.responseSlaHours,
        packages: {
          create: packages
        }
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-muted">Update your partner listing.</p>
      </div>
      <form action={updateProfile} className="surface space-y-6 p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-muted">Company name</label>
            <Input name="companyName" defaultValue={partner?.companyName ?? ''} required />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Website</label>
            <Input name="websiteUrl" defaultValue={partner?.websiteUrl ?? ''} required />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs uppercase text-muted">Tagline</label>
            <Input name="tagline" defaultValue={partner?.tagline ?? ''} required />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase text-muted">Description</label>
          <Textarea name="description" defaultValue={partner?.description ?? ''} rows={5} required />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs uppercase text-muted">Regions</label>
            <div className="mt-2 space-y-2">
              {REGIONS.map((region) => (
                <label key={region} className="flex items-center gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    name="regions"
                    value={region}
                    defaultChecked={partner?.regions.includes(region)}
                    className="h-4 w-4 rounded border-border bg-surface"
                  />
                  {region}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Languages</label>
            <div className="mt-2 space-y-2">
              {LANGUAGES.map((language) => (
                <label key={language} className="flex items-center gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    name="languages"
                    value={language}
                    defaultChecked={partner?.languages.includes(language)}
                    className="h-4 w-4 rounded border-border bg-surface"
                  />
                  {language}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Categories</label>
            <div className="mt-2 space-y-2">
              {CATEGORIES.map((category) => (
                <label key={category} className="flex items-center gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    name="categories"
                    value={category}
                    defaultChecked={partner?.categories.includes(category)}
                    className="h-4 w-4 rounded border-border bg-surface"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase text-muted">Tags (comma separated)</label>
            <Input
              name="tags"
              defaultValue={partner?.tags.join(', ') ?? ''}
              placeholder="ai, llmops, security"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase text-muted">Response SLA (hours)</label>
            <Input
              name="responseSlaHours"
              type="number"
              min={1}
              defaultValue={partner?.responseSlaHours ?? 24}
              required
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Packages</h2>
          <p className="text-sm text-muted">Up to three packages.</p>
          <div className="mt-4 grid gap-4">
            {[0, 1, 2].map((index) => {
              const pkg = partner?.packages[index];
              return (
                <div key={index} className="rounded-2xl border border-border p-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Input
                      name={`package_${index}_name`}
                      defaultValue={pkg?.name ?? ''}
                      placeholder="Package name"
                    />
                    <Input
                      name={`package_${index}_price`}
                      type="number"
                      defaultValue={pkg?.priceFromUsd ?? ''}
                      placeholder="Price from (USD)"
                    />
                    <Input
                      name={`package_${index}_timeline`}
                      defaultValue={pkg?.timeline ?? ''}
                      placeholder="Timeline"
                    />
                  </div>
                  <Textarea
                    name={`package_${index}_deliverables`}
                    defaultValue={pkg?.deliverables.join(', ') ?? ''}
                    placeholder="Deliverables (comma separated)"
                    rows={2}
                    className="mt-3"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
          type="submit"
        >
          Save profile
        </button>
      </form>
    </div>
  );
}
