import { BudgetTier } from '@prisma/client';

export function mapBudgetTier(value: string): BudgetTier {
  switch (value) {
    case 'under_5k':
      return BudgetTier.under_5k;
    case '5_10k':
      return BudgetTier.five_10k;
    case '10_30k':
      return BudgetTier.ten_30k;
    case '30_plus':
      return BudgetTier.thirty_plus;
    default:
      throw new Error('Invalid budget');
  }
}

export function formatBudgetTier(value: BudgetTier | string) {
  switch (value) {
    case BudgetTier.under_5k:
    case 'under_5k':
      return 'Under $5k';
    case BudgetTier.five_10k:
    case 'five_10k':
      return '$5k-$10k';
    case BudgetTier.ten_30k:
    case 'ten_30k':
      return '$10k-$30k';
    case BudgetTier.thirty_plus:
    case 'thirty_plus':
      return '$30k+';
    default:
      return String(value);
  }
}
