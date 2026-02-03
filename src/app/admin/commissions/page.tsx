import { prisma } from '@/lib/db';
import { COMMISSION_SCENARIOS } from '@/lib/constants';
import { commissionRuleSchema } from '@/lib/validators';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default async function AdminCommissionsPage() {
  const rules = await prisma.commissionRule.findMany();

  async function updateRule(formData: FormData) {
    'use server';
    const raw = {
      scenario: String(formData.get('scenario') ?? ''),
      percentLeadHolder: Number(formData.get('percentLeadHolder')),
      percentSeller: Number(formData.get('percentSeller')),
      percentDelivery: Number(formData.get('percentDelivery')),
      holdbackPercent: Number(formData.get('holdbackPercent'))
    };

    const parsed = commissionRuleSchema.parse(raw);

    await prisma.commissionRule.upsert({
      where: { scenario: parsed.scenario as any },
      update: {
        percentLeadHolder: parsed.percentLeadHolder,
        percentSeller: parsed.percentSeller,
        percentDelivery: parsed.percentDelivery,
        holdbackPercent: parsed.holdbackPercent
      },
      create: {
        scenario: parsed.scenario as any,
        percentLeadHolder: parsed.percentLeadHolder,
        percentSeller: parsed.percentSeller,
        percentDelivery: parsed.percentDelivery,
        holdbackPercent: parsed.holdbackPercent
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Commission rules</h1>
        <p className="text-muted">Define revenue sharing by scenario.</p>
      </div>
      <div className="grid gap-6">
        {COMMISSION_SCENARIOS.map((scenario) => {
          const rule = rules.find((item) => item.scenario === scenario.value);
          return (
            <Card key={scenario.value}>
              <h2 className="text-lg font-semibold">{scenario.label}</h2>
              <p className="text-xs text-muted">Scenario: {scenario.value}</p>
              <form action={updateRule} className="mt-4 grid gap-3 md:grid-cols-4">
                <input type="hidden" name="scenario" value={scenario.value} />
                <Input
                  name="percentLeadHolder"
                  type="number"
                  defaultValue={rule?.percentLeadHolder ?? 0}
                  placeholder="Lead holder %"
                />
                <Input
                  name="percentSeller"
                  type="number"
                  defaultValue={rule?.percentSeller ?? 0}
                  placeholder="Seller %"
                />
                <Input
                  name="percentDelivery"
                  type="number"
                  defaultValue={rule?.percentDelivery ?? 0}
                  placeholder="Delivery %"
                />
                <Input
                  name="holdbackPercent"
                  type="number"
                  defaultValue={rule?.holdbackPercent ?? 0}
                  placeholder="Holdback %"
                />
                <button
                  className="rounded-2xl border border-border px-4 py-2 text-xs md:col-span-4"
                  type="submit"
                >
                  Save rule
                </button>
              </form>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
