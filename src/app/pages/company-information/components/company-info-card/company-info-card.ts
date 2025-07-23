import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-company-info-card',
  standalone: false,
  templateUrl: './company-info-card.html',
  styleUrl: './company-info-card.scss'
})
export class CompanyInfoCard implements OnInit, OnDestroy {
  companyData: any = null;
  private subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Subscribe to company info from API service
    this.subscription.add(
      this.apiService.companyInfo$.subscribe(data => {
        console.log('Company Info Card - Received data:', data);
        this.companyData = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get companyInfo() {
    return this.companyData?.values?.companyInfo || null;
  }

  get industryInfo() {
    return this.companyData?.data?.industry || null;
  }

  get location() {
    const location = this.companyInfo?.location;
    if (location) {
      return `${location.city} / ${location.country}`;
    }
    return 'Not available';
  }
}
