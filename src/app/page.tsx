import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    title: 'Request an intro',
    description: 'Share your goals, budget, and region so we route to the best-fit partner.'
  },
  {
    title: 'Get matched',
    description: 'CoreBiz + B5 curates verified partners and validates readiness.'
  },
  {
    title: 'Launch delivery',
    description: 'Move into discovery or execution with clear SLAs and transparency.'
  }
];

const competencies = [
  'Strategy',
  'Discovery',
  'Validation',
  'Engineering',
  'AI Product',
  'RAG',
  'LLMOps',
  'Cybersecurity',
  'Compliance'
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="surface p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-6">
            <Badge>Partner Network</Badge>
            <h1 className="text-4xl font-semibold tracking-tight lg:text-5xl">
              CoreBiz + B5 Partner Network
            </h1>
            <p className="text-lg text-muted">
              Premium partners for strategy, AI delivery, and secure execution. Discover vetted teams
              and orchestrate high-quality intros in minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/partners"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
              >
                Browse partners
              </Link>
              <Link
                href="/request"
                className="rounded-2xl border border-border bg-surfaceMuted px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surface"
              >
                Request intro
              </Link>
              <Link
                href="/become-a-partner"
                className="rounded-2xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-surfaceMuted"
              >
                Become a partner
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Verified partners</CardTitle>
                <CardDescription>
                  Only teams with proven delivery and trusted references.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Accountable intros</CardTitle>
                <CardDescription>
                  Centralized visibility for every request, intro, and outcome.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} className="card-hover">
            <CardHeader>
              <CardTitle>{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="surface p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Competency coverage</h2>
            <p className="text-sm text-muted">End-to-end partner capabilities across AI.</p>
          </div>
          <span className="text-sm text-muted">Updated weekly</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {competencies.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
