export const CATEGORIES = [
  'strategy',
  'discovery',
  'validation',
  'engineering',
  'ai',
  'rag',
  'llmops',
  'cybersecurity',
  'compliance'
] as const;

export const REGIONS = ['EU', 'UK', 'GE', 'US', 'MENA'] as const;

export const LANGUAGES = ['EN', 'RU', 'DE', 'FR'] as const;

export const BUDGETS = [
  { value: 'under_5k', label: 'Under $5k' },
  { value: '5_10k', label: '$5k-$10k' },
  { value: '10_30k', label: '$10k-$30k' },
  { value: '30_plus', label: '$30k+' }
] as const;

export const COMMISSION_SCENARIOS = [
  {
    value: 'direct_referral',
    label: 'Direct referral'
  },
  {
    value: 'direct_sale_by_lead_holder',
    label: 'Direct sale by lead holder'
  },
  {
    value: 'reactivation',
    label: 'Reactivation'
  },
  {
    value: 'follow_on',
    label: 'Follow-on'
  },
  {
    value: 'exception_payment_risk',
    label: 'Exception payment risk'
  }
] as const;
