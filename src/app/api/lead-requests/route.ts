import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { leadRequestSchema } from '@/lib/validators';
import { mapBudgetTier } from '@/lib/budget';

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = leadRequestSchema.parse(json);

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

  return NextResponse.json({ id: lead.id, status: lead.status });
}
