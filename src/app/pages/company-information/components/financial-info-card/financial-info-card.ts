import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../api.service';

interface FinancialItem {
  key: string;
  displayName: string;
  value: number | null;
  formattedValue: string;
}

@Component({
  selector: 'app-financial-info-card',
  standalone: false,
  templateUrl: './financial-info-card.html',
  styleUrl: './financial-info-card.scss'
})
export class FinancialInfoCard implements OnInit, OnDestroy {
  companyData: any = null;
  financialItems: FinancialItem[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.apiService.companyInfo$.subscribe(data => {
        console.log('Financial Info Card - Received data:', data);
        this.companyData = data;
        this.processFinancialData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private processFinancialData(): void {
    if (!this.companyData?.values?.financialInfo) {
      this.financialItems = [];
      return;
    }

    const financialInfo = this.companyData.values.financialInfo;
    const keys = Object.keys(financialInfo);

    this.financialItems = keys.map(key => ({
      key,
      displayName: this.formatDisplayName(key),
      value: financialInfo[key],
      formattedValue: this.formatValue(financialInfo[key])
    }));

    console.log('Processed financial items:', this.financialItems);
  }

  private formatDisplayName(key: string): string {
    // Convert camelCase to display name
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

  private formatValue(value: number | null): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    // Format large numbers (in millions/billions)
    if (Math.abs(value) >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B`;
    } else if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    } else {
      return value.toFixed(2);
    }
  }

  isPositiveValue(value: number | null): boolean {
    return value !== null && value !== undefined && value >= 0;
  }
}
