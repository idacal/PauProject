import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../api.service';

interface MarketItem {
  key: string;
  displayName: string;
  value: any;
  formattedValue: string;
  isSpecialCase?: boolean;
}

@Component({
  selector: 'app-market-info-card',
  standalone: false,
  templateUrl: './market-info-card.html',
  styleUrl: './market-info-card.scss'
})
export class MarketInfoCard implements OnInit, OnDestroy {
  companyData: any = null;
  marketItems: MarketItem[] = [];
  private subscription: Subscription = new Subscription();

  // Special display names mapping
  private displayNamesMap: { [key: string]: string } = {
    'lastDelayed': 'Last Delayed',
    '55WeekHigh': '55 Week High',
    '55WeekLow': '55 Week Low',
    'PERatio': 'PE Ratio',
    'shortInterest': 'Short Interest',
    'marketCap': 'Market Cap',
    'float': 'Float',
    'institutionalOwnership': 'Institutional Ownership',
    'insiderOwnership': 'Insider Ownership'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.apiService.companyInfo$.subscribe(data => {
        console.log('Market Info Card - Received data:', data);
        this.companyData = data;
        this.processMarketData();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private processMarketData(): void {
    if (!this.companyData?.values?.marketInfo) {
      this.marketItems = [];
      return;
    }

    const marketInfo = this.companyData.values.marketInfo;
    const processedItems: MarketItem[] = [];

    // Handle 55 Week Low/High as a special combined case
    if (marketInfo['55WeekLow'] !== undefined || marketInfo['55WeekHigh'] !== undefined) {
      const low = marketInfo['55WeekLow'];
      const high = marketInfo['55WeekHigh'];
      const formattedLow = this.formatValue(low);
      const formattedHigh = this.formatValue(high);
      
      processedItems.push({
        key: '55WeekRange',
        displayName: '55 Week Low/High',
        value: { low, high },
        formattedValue: `${formattedLow} / ${formattedHigh}`,
        isSpecialCase: true
      });
    }

    // Process other fields
    Object.keys(marketInfo).forEach(key => {
      // Skip the individual 55Week fields as we handle them as a combined case
      if (key === '55WeekLow' || key === '55WeekHigh') {
        return;
      }

      processedItems.push({
        key,
        displayName: this.getDisplayName(key),
        value: marketInfo[key],
        formattedValue: this.formatValue(marketInfo[key]),
        isSpecialCase: false
      });
    });

    this.marketItems = processedItems;
    console.log('Processed market items:', this.marketItems);
  }

  private getDisplayName(key: string): string {
    // Use custom mapping if available, otherwise format camelCase
    return this.displayNamesMap[key] || this.formatDisplayName(key);
  }

  private formatDisplayName(key: string): string {
    // Convert camelCase to display name
    return key
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    if (typeof value === 'number') {
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

    return String(value);
  }

  // Split items into two columns for better layout
  get leftColumnItems(): MarketItem[] {
    const halfLength = Math.ceil(this.marketItems.length / 2);
    return this.marketItems.slice(0, halfLength);
  }

  get rightColumnItems(): MarketItem[] {
    const halfLength = Math.ceil(this.marketItems.length / 2);
    return this.marketItems.slice(halfLength);
  }
}
