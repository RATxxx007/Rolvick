import { describe, it, expect, vi } from 'vitest';
import { POST } from '@/app/api/lead-requests/route';

vi.mock('@/lib/db', () => {
  return {
    prisma: {
      leadRequest: {
        create: vi.fn().mockResolvedValue({ id: 'lead_123', status: 'NEW' })
      }
    }
  };
});

describe('Lead request API', () => {
  it('validates and stores lead request', async () => {
    const response = await POST(
      new Request('http://localhost/api/lead-requests', {
        method: 'POST',
        body: JSON.stringify({
          requesterName: 'Elena',
          requesterEmail: 'elena@northbridge.io',
          companyName: 'Northbridge Labs',
          message: 'We need a discovery sprint for AI.',
          budget: '10_30k',
          region: 'EU',
          categories: ['strategy']
        })
      })
    );

    const json = await response.json();

    expect(json.id).toBe('lead_123');
    expect(json.status).toBe('NEW');
  });
});
