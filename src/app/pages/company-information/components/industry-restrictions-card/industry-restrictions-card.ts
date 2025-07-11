import { Component } from '@angular/core';

interface IndustryRestriction {
  restriction: string;
  status: string;
  statusColor: string;
}

@Component({
  selector: 'app-industry-restrictions-card',
  standalone: false,
  templateUrl: './industry-restrictions-card.html',
  styleUrl: './industry-restrictions-card.scss'
})
export class IndustryRestrictionsCard {
  
  public restrictions: IndustryRestriction[] = [
    { 
      restriction: 'Revenue > USDbn', 
      status: 'Referral',
      statusColor: 'text-orange-600'
    },
    { 
      restriction: 'Cannabis (Psychoactive cannabinoid THC)', 
      status: 'Decline',
      statusColor: 'text-red-600'
    },
    { 
      restriction: 'Opioid production, manufacturing, alteration, repackaging, distribution both currency and legacy', 
      status: 'Decline',
      statusColor: 'text-red-600'
    }
  ];

  constructor() { }

} 