import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-load-assessment',
  standalone: false,
  templateUrl: './load-assessment.html',
  styleUrl: './load-assessment.scss'
})
export class LoadAssessment implements OnInit, OnDestroy {
  // Properties for API data
  public assessments: any[] = [];
  public isLoading: boolean = false;
  public error: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadAssessments();
  }

  ionViewWillEnter(): void {
    // Refresh assessments every time the page is visited
    console.log('Load Assessment page entered - refreshing assessments...');
    this.loadAssessments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadAssessments(): void {
    this.isLoading = true;
    this.error = null;
    
    console.log('Loading assessments from API...');
    
    // Subscribe to API response
    this.subscription.add(
      this.apiService.response$.subscribe(response => {
        this.isLoading = false;
        console.log('Raw API response:', response);
        console.log('Response type:', typeof response);
        console.log('Is array?', Array.isArray(response));
        
        if (response && !response.error) {
          // Handle successful response
          if (Array.isArray(response)) {
            this.assessments = response;
          } else if (response && typeof response === 'object') {
            // If single object, wrap in array
            this.assessments = [response];
          } else {
            this.assessments = [];
          }
          
          console.log('Final processed assessments:', this.assessments);
          console.log('Number of assessments:', this.assessments.length);
          
          // Log each assessment for debugging
          this.assessments.forEach((assessment, index) => {
            console.log(`Assessment ${index + 1}:`, assessment);
            console.log(`  - Company: ${assessment.company || assessment.data?.name || 'N/A'}`);
            console.log(`  - Date: ${assessment.last_update || assessment.creation_date || 'N/A'}`);
          });
          
        } else if (response && response.error) {
          // Handle API error
          this.error = 'Error loading assessments: ' + response.error;
          console.error('API Error:', response.error);
        } else {
          console.log('No assessments found or empty response');
          this.assessments = [];
        }
      })
    );
    
    // Call the API to get assessments
    this.apiService.getAssessments().catch(error => {
      this.isLoading = false;
      this.error = 'Failed to load assessments. Please try again.';
      console.error('Error calling getAssessments:', error);
    });
  }

  navigateToSearch(): void {
    this.router.navigate(['/landing']);
  }



  loadAssessment(assessment: any): void {
    console.log('Loading assessment:', assessment);
    // Navigate to company-information with the assessment data
    // Store the assessment data in the API service for the company-information page to use
    (this.apiService as any).companyInfoSubject.next(assessment);
    this.router.navigate(['/dashboard/company-information']);
  }

  deleteAssessment(assessment: any): void {
    console.log('Delete assessment:', assessment);
    if (confirm('Are you sure you want to delete this assessment?')) {
      // TODO: Implement delete functionality when API endpoint is available
      console.log('Assessment would be deleted:', assessment);
      alert('Delete functionality not yet implemented');
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      // Format as "Dec 24, 2025, 3:51 PM"
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  }

} 