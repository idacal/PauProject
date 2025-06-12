import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';
import { TabItem } from '../../shared/navigation-tabs/navigation-tabs.component';

@Component({
  selector: 'app-load-assessment',
  standalone: false,
  templateUrl: './load-assessment.html',
  styleUrl: './load-assessment.scss'
})
export class LoadAssessment {
  public activeTab: string = 'load-assessment';

  public headerConfig: HeaderConfig = {
    pageType: 'company',
    title: 'Underwriting Dashboard',
    showUploadIcon: true,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  public tabs: TabItem[] = [
    { id: 'company-information', label: 'Company Information' },
    { id: 'market-information', label: 'Market Information' },
    { id: 'financial-condition', label: 'Financial Condition' },
    { id: 'governance', label: 'Governance' },
    { id: 'litigation', label: 'Litigation & M.E' },
    { id: 'nature-business', label: 'Nature of Business' },
    { id: 'loss-probability', label: 'Loss Probability Model' },
    { id: 'overall-summary', label: 'Overall Summary' }
  ];

  public assessments = [
    {
      id: 24,
      companyName: 'YMAB',
      lob: 'D&O',
      lastUpdate: 'April 30, 2023, 8:04 p.m.',
      status: 'active'
    },
    {
      id: 1,
      companyName: 'MarkerGenetics, Inc.',
      lob: 'D&O',
      lastUpdate: 'April 28, 2023, 9:20 p.m.',
      status: 'active'
    },
    {
      id: 46,
      companyName: 'VF Technology, Inc.',
      lob: 'D&O',
      lastUpdate: 'Feb. 21, 2023, 4:04 p.m.',
      status: 'active'
    },
    {
      id: 103,
      companyName: 'Senzar, Inc.',
      lob: 'D&O',
      lastUpdate: 'Feb. 20, 2023, 1:18 p.m.',
      status: 'active'
    }
  ];

  constructor(private router: Router) { }

  switchTab(tabId: string): void {
    if (tabId === 'company-information') {
      this.router.navigate(['/company-information']);
    } else {
      this.activeTab = tabId;
    }
  }

  navigateToSearch(): void {
    this.router.navigate(['/landing']);
  }

} 