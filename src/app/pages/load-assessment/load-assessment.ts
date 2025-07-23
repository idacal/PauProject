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



  async loadAssessment(assessment: any): Promise<void> {
    console.log('Loading assessment:', assessment);
    
    // Get the assessment ID
    const assessmentId = assessment.id || assessment._id;
    
    if (!assessmentId) {
      console.error('No assessment ID found:', assessment);
      alert('Cannot load assessment: No ID found');
      return;
    }

    try {
      // Show loading state
      this.isLoading = true;
      console.log('Loading assessment data for ID:', assessmentId);
      
      // Instead of calling getAssessmentById (which returns 500), 
      // use the assessment data we already have from the list
      console.log('Using existing assessment data:', assessment);
      
      // Store the assessment data directly in the API service
      (this.apiService as any).companyInfoSubject.next(assessment);
      
      // Give it a moment to process
      setTimeout(() => {
        this.isLoading = false;
        console.log('Navigating to company information page...');
        this.router.navigate(['/dashboard/company-information']);
      }, 500);
      
    } catch (error) {
      this.isLoading = false;
      console.error('Error loading assessment:', error);
      alert('Error loading assessment. Please try again.');
    }
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

  // Helper methods to extract data from assessment objects
  getAssessmentCompanyName(assessment: any): string {
    // Try different possible structures
    return assessment.company || 
           assessment.data?.company?.name || 
           assessment.values?.companyInfo?.name ||
           assessment.companyName || 
           'N/A';
  }

  getAssessmentIndustry(assessment: any): string {
    // Try different possible structures
    return assessment.lob || 
           assessment.industry?.label || 
           assessment.data?.industry?.label ||
           'D&O';
  }

  getAssessmentId(assessment: any): string {
    return assessment.id || assessment._id || 'N/A';
  }

  getAssessmentDate(assessment: any): string {
    const dateStr = assessment.last_update || assessment.creation_date;
    return this.formatDate(dateStr);
  }
} 