import { TabItem } from './navigation-tabs.component';

export const DASHBOARD_TABS: TabItem[] = [
  { id: 'company-information', label: 'Company Information' },
  { id: 'market-information', label: 'Market Information', hasCheckmark: true },
  { id: 'financial-condition', label: 'Financial Condition', hasCheckmark: true },
  { 
    id: 'do-dropdown', 
    label: 'D&O', 
    isDropdown: true,
    hasCheckmark: true,
    dropdownOptions: [
      { id: 'governance', label: 'Governance' },
      { id: 'litigation', label: 'Litigation & M.E' },
      { id: 'nature-business', label: 'Nature of Business' },
      { id: 'loss-probability', label: 'Loss Probability Model' }
    ]
  },
  { 
    id: 'overall-summary-dropdown', 
    label: 'Overall Summary', 
    isDropdown: true,
    dropdownOptions: [
      { id: 'overall-summary', label: 'D&O Summary' }
    ]
  }
];

export const LANDING_TABS: TabItem[] = [
  { id: 'company-info', label: 'Company Information', disabled: true },
  { id: 'market-info', label: 'Market Information', disabled: true },
  { id: 'financial-condition', label: 'Financial Condition', disabled: true },
  { id: 'do-dropdown', label: 'D&O', disabled: true, isDropdown: true },
  { id: 'overall-summary', label: 'Overall Summary', disabled: true }
]; 