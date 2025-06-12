import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-company-information',
  standalone: false,
  templateUrl: './company-information.html',
  styleUrl: './company-information.scss'
})
export class CompanyInformation {
  public activeTab: string = 'company-information';
  
  public headerConfig: HeaderConfig = {
    pageType: 'company',
    title: 'D&O Underwriting Dashboard - Ymabs Therapeutics',
    showUploadIcon: true,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  public tabs = [
    { id: 'company-information', label: 'Company Information' },
    { id: 'market-information', label: 'Market Information' },
    { id: 'financial-condition', label: 'Financial Condition' },
    { id: 'governance', label: 'Governance' },
    { id: 'litigation', label: 'Litigation & M.E' },
    { id: 'nature-business', label: 'Nature of Business' },
    { id: 'loss-probability', label: 'Loss Probability Model' },
    { id: 'overall-summary', label: 'Overall Summary' }
  ];

  constructor(private router: Router) { }

  switchTab(tabId: string): void {
    this.activeTab = tabId;
  }

  isActiveTab(tabId: string): boolean {
    return this.activeTab === tabId;
  }

  getCurrentTabLabel(): string {
    const tab = this.tabs.find(t => t.id === this.activeTab);
    return tab ? tab.label : '';
  }

  navigateToSearch(): void {
    this.router.navigate(['/landing']);
  }

  navigateToLoadAssessment(): void {
    this.router.navigate(['/load-assessment']);
  }
}
