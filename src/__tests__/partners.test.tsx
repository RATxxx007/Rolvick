import { render, screen } from '@testing-library/react';
import { PartnerCatalog } from '@/components/partner-catalog';

describe('Partner catalog', () => {
  it('renders partner cards', () => {
    render(
      <PartnerCatalog
        partners={[
          {
            id: '1',
            slug: 'b5-research',
            companyName: 'B5 Research',
            tagline: 'Strategy and validation',
            categories: ['strategy', 'validation'],
            regions: ['EU'],
            isVerified: true
          }
        ]}
      />
    );

    expect(screen.getByText('B5 Research')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
  });
});
