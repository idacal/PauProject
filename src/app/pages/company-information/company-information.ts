import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';
import { CompanyBarConfig } from '../../shared/company-name-bar/company-name-bar.component';
import { TabItem, DropdownOption } from '../../shared/navigation-tabs/navigation-tabs.component';
import { DASHBOARD_TABS } from '../../shared/navigation-tabs/navigation-tabs.config';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-company-information',
  standalone: false,
  templateUrl: './company-information.html',
  styleUrl: './company-information.scss'
})
export class CompanyInformation implements OnInit, OnDestroy {
  public activeTab: string = 'company-information';
  private companyInfoSubscription?: Subscription;
  public companyData: any = null;
  
  public headerConfig: HeaderConfig = {
    pageType: 'company',
    title: 'D&O Underwriting Dashboard',
    showUploadIcon: true,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  public companyBarConfig: CompanyBarConfig = {
    companyName: 'Loading...', // Will be updated from API data
    showBar: true
  };

  public tabs: TabItem[] = DASHBOARD_TABS;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    // Subscribe to company info from the assessment
    this.companyInfoSubscription = this.apiService.companyInfo$.subscribe(data => {
      if (data) {
        console.log('Received company data:', data);
        this.companyData = data;
        
        // Update company name in the bar if available
        if (data.company && data.company.name) {
          this.companyBarConfig.companyName = data.company.name;
        } else if (data.name) {
          this.companyBarConfig.companyName = data.name;
        }
      } else {
        // If no data, redirect back to landing
        console.log('No company data available, redirecting to landing');
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    if (this.companyInfoSubscription) {
      this.companyInfoSubscription.unsubscribe();
    }
  }

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
