import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-company-information',
  standalone: false,
  templateUrl: './company-information.html',
  styleUrl: './company-information.scss'
})
export class CompanyInformation implements OnInit, OnDestroy {
  private companyInfoSubscription?: Subscription;
  public companyData: any = null;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    // Subscribe to company info from the assessment
    this.companyInfoSubscription = this.apiService.companyInfo$.subscribe(data => {
      if (data) {
        console.log('Received company data:', data);
        this.companyData = data;
        
        // Company data loaded successfully
        console.log('Company data loaded:', data);
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



  navigateToSearch(): void {
    this.router.navigate(['/landing']);
  }

  navigateToLoadAssessment(): void {
    this.router.navigate(['/dashboard/load-assessment']);
  }
}
