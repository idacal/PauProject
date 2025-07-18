import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderConfig } from '../../../shared/dashboard-header/dashboard-header.component';
import { CompanyBarConfig } from '../../../shared/company-name-bar/company-name-bar.component';
import { TabItem } from '../../../shared/navigation-tabs/navigation-tabs.component';
import { DASHBOARD_TABS } from '../../../shared/navigation-tabs/navigation-tabs.config';

@Component({
  selector: 'app-dashboard-layout',
  standalone: false,
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss'
})
export class DashboardLayout implements OnInit {
  public activeTab: string = '';
  
  public headerConfig: HeaderConfig = {
    pageType: 'company',
    title: 'D&O Underwriting Dashboard',
    showUploadIcon: true,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  public companyBarConfig: CompanyBarConfig = {
    companyName: '',
    showBar: true
  };

  public tabs: TabItem[] = DASHBOARD_TABS;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set initial active tab based on current route
    this.updateActiveTabFromRoute();
    
    // Listen to route changes to update active tab
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateActiveTabFromRoute();
      });
  }

  private updateActiveTabFromRoute(): void {
    const currentUrl = this.router.url;
    
    if (currentUrl.includes('/company-information')) {
      this.activeTab = 'company-information';
    } else if (currentUrl.includes('/market-information')) {
      this.activeTab = 'market-information';
    } else if (currentUrl.includes('/financial-information')) {
      this.activeTab = 'financial-condition';
    } else if (currentUrl.includes('/load-assessment')) {
      this.activeTab = ''; // No tab active for load assessment
    } else {
      this.activeTab = '';
    }
  }

  switchTab(tabId: string): void {
    // Navigate to appropriate route based on tab
    switch (tabId) {
      case 'company-information':
        this.router.navigate(['/dashboard/company-information']);
        break;
      case 'market-information':
        this.router.navigate(['/dashboard/market-information']);
        break;
      case 'financial-condition':
        this.router.navigate(['/dashboard/financial-information']);
        break;
      case 'governance':
      case 'litigation':
      case 'nature-business':
      case 'loss-probability':
      case 'overall-summary':
        // These would navigate to their respective pages when implemented
        console.log(`Navigation to ${tabId} not implemented yet`);
        break;
      default:
        break;
    }
  }

  getCurrentTabLabel(): string {
    if (this.activeTab === '') {
      return 'Load Assessment';
    }
    const tab = this.tabs.find(t => t.id === this.activeTab);
    return tab ? tab.label : '';
  }
} 