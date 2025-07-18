import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';
import { CompanyBarConfig } from '../../shared/company-name-bar/company-name-bar.component';
import { ApiService } from '../../api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { TabItem } from '../../shared/navigation-tabs/navigation-tabs.component';
import { LANDING_TABS } from '../../shared/navigation-tabs/navigation-tabs.config';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  
  public searchForm: FormGroup;
  public files: NgxFileDropEntry[] = [];
  public uploadedFiles: File[] = [];
  public isDragOver: boolean = false;
  
  // API related properties
  public companies: any[] = [];
  public selectedCompany: any = null;
  public availableIndustries: any[] = [];
  public isSearching: boolean = false;
  
  public headerConfig: HeaderConfig = {
    pageType: 'landing',
    title: 'Underwriting Dashboard',
    showUploadIcon: false,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  public companyBarConfig: CompanyBarConfig = {
    companyName: '',
    showBar: true
  };

  // This will be populated dynamically from API
  public companyOptions: string[] = [];

  public insuranceOptions = [
    { value: 'D&O', label: 'D&O' },
    { value: 'EPL', label: 'EPL' },
    { value: 'Fiduciary', label: 'Fiduciary' },
    { value: 'Crime', label: 'Crime' }
  ];

  // This will be populated dynamically from API
  public hazardClassOptions: string[] = [];

  // Agregar las pestañas del menú
  public menuTabs: TabItem[] = LANDING_TABS;

  // Opciones del dropdown D&O
  public doDropdownOptions = [
    { id: 'governance', label: 'Governance' },
    { id: 'litigation', label: 'Litigation & M.E' },
    { id: 'nature-business', label: 'Nature of Business' },
    { id: 'loss-probability', label: 'Loss Probability Model' }
  ];

  public isInsuranceDropdownOpen = false;
  public selectedInsuranceTypes: string[] = ['D&O'];

  constructor(private fb: FormBuilder, private router: Router, private apiService: ApiService) {
    this.searchForm = this.fb.group({
      companyName: ['', Validators.required],
      hazardClass: ['', Validators.required],
      insuranceType: [['D&O'], [Validators.required, this.minLengthArray(1)]]
    });

    // Subscribe to company name changes for search
    this.searchForm.get('companyName')?.valueChanges
      .pipe(
        debounceTime(500), // Wait 500ms after user stops typing
        distinctUntilChanged() // Only if the value actually changed
      )
      .subscribe(value => {
        if (value && value.length >= 2) {
          this.searchCompanies(value);
        } else {
          this.companies = [];
          this.companyOptions = [];
        }
      });

    // Subscribe to API items (companies)
    this.apiService.items$.subscribe(companies => {
      this.companies = companies;
      this.updateCompanyOptions();
      this.isSearching = false;
    });
  }

  private searchCompanies(name: string) {
    this.isSearching = true;
    this.apiService.fetchByName(name);
  }

  private updateCompanyOptions() {
    this.companyOptions = this.companies.map(company => 
      `${company.name} / ${company.country} / ${company.ticker || 'N/A'}`
    );
  }

  public onCompanySelect(companyOption: string) {
    // Find the selected company from the companies array
    const companyIndex = this.companyOptions.indexOf(companyOption);
    if (companyIndex >= 0) {
      this.selectedCompany = this.companies[companyIndex];
      
      // Update the form control with the selected company name (without triggering valueChanges)
      this.searchForm.get('companyName')?.setValue(this.selectedCompany.name, { emitEvent: false });
      
      // Update available industries from selected company
      if (this.selectedCompany.naics && this.selectedCompany.naics.length > 0) {
        this.availableIndustries = this.selectedCompany.naics;
        this.hazardClassOptions = this.availableIndustries.map(industry => 
          `${industry.label} (${industry.code})`
        );
        
        // Reset hazard class selection
        this.searchForm.get('hazardClass')?.setValue('');
      }
    }
  }

  private minLengthArray(min: number) {
    return (control: any) => {
      if (control.value && control.value.length >= min) {
        return null;
      }
      return { 'minLengthArray': { value: control.value } };
    };
  }

  public dropped(files: any) {
    console.log('Files dropped:', files);
    this.isDragOver = false; // Reset drag state
    this.files = files;
    
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Validate file type
          if (this.isValidFileType(file)) {
            // Check if file is already in the list
            if (!this.uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
              this.uploadedFiles.push(file);
              console.log('File added via drag & drop:', file.name);
            }
          } else {
            console.log('Invalid file type dropped, skipping:', file.name);
            alert(`File type not supported: ${file.name}. Please upload only .xls, .xlsm, .docx, .odt, .pptx, or .pdf files.`);
          }
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public onFileSelected(event: any) {
    console.log('Files selected via file picker:', event.target.files.length);
    const files: FileList = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Validate file type
      if (this.isValidFileType(file)) {
        // Check if file is already in the list
        if (!this.uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
          this.uploadedFiles.push(file);
          console.log('File added via file picker:', file.name);
        } else {
          console.log('File already exists, skipping:', file.name);
        }
      } else {
        console.log('Invalid file type, skipping:', file.name);
        alert(`File type not supported: ${file.name}. Please upload only .xls, .xlsm, .docx, .odt, .pptx, or .pdf files.`);
      }
    }
    
    console.log('Total uploaded files:', this.uploadedFiles.length);
    // Clear the input
    event.target.value = '';
  }

  public formatFileSize(bytes: number): string {
    const kb = bytes / 1024;
    return (Math.round(kb * 100) / 100).toString();
  }

  public openFilePicker() {
    console.log('Opening file picker...');
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('File input element not found');
    }
  }

  // Native HTML5 drag and drop handlers
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
    console.log('Native dragover event');
  }

  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    console.log('Native dragleave event');
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    console.log('Native drop event');
    
    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  private handleFiles(files: FileList) {
    console.log('Handling files via native drop:', files.length);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Validate file type
      if (this.isValidFileType(file)) {
        // Check if file is already in the list
        if (!this.uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
          this.uploadedFiles.push(file);
          console.log('File added via native drop:', file.name);
        } else {
          console.log('File already exists, skipping:', file.name);
        }
      } else {
        console.log('Invalid file type, skipping:', file.name);
        alert(`File type not supported: ${file.name}. Please upload only .xls, .xlsm, .docx, .odt, .pptx, or .pdf files.`);
      }
    }
    console.log('Total uploaded files:', this.uploadedFiles.length);
  }

  public isValidFileType(file: File): boolean {
    const validExtensions = ['.xls', '.xlsm', '.docx', '.odt', '.pptx', '.pdf'];
    const fileName = file.name.toLowerCase();
    return validExtensions.some(ext => fileName.endsWith(ext));
  }

  public getFileType(fileName: string): string {
    const extension = fileName.toLowerCase().split('.').pop();
    
    switch (extension) {
      case 'pdf':
        return 'pdf';
      case 'xls':
      case 'xlsm':
        return 'excel';
      case 'docx':
      case 'odt':
        return 'word';
      case 'pptx':
        return 'powerpoint';
      default:
        return 'document';
    }
  }

  public truncateFileName(fileName: string, maxLength: number): string {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4) + '...';
    
    return truncatedName + '.' + extension;
  }

  public trackByFileName(index: number, file: File): string {
    return file.name + file.size;
  }

  public removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  public removeFileWithAnimation(index: number) {
    // For now, just remove the file directly
    // TODO: Add fade-out animation
    this.removeFile(index);
  }

  public fileOver(event: any){
    console.log('File over:', event);
    this.isDragOver = true;
  }

  public fileLeave(event: any){
    console.log('File leave:', event);
    this.isDragOver = false;
  }

  public toggleInsuranceDropdown() {
    this.isInsuranceDropdownOpen = !this.isInsuranceDropdownOpen;
  }

  public toggleInsuranceType(insuranceValue: string) {
    // Only allow D&O to be toggled
    if (insuranceValue !== 'D&O') {
      return;
    }
    
    const index = this.selectedInsuranceTypes.indexOf(insuranceValue);
    if (index > -1) {
      this.selectedInsuranceTypes.splice(index, 1);
    } else {
      this.selectedInsuranceTypes.push(insuranceValue);
    }
    this.searchForm.get('insuranceType')?.setValue(this.selectedInsuranceTypes);
  }

  public isInsuranceTypeSelected(insuranceValue: string): boolean {
    return this.selectedInsuranceTypes.includes(insuranceValue);
  }

  public getSelectedInsuranceText(): string {
    if (this.selectedInsuranceTypes.length === 0) {
      return '- Select options -';
    }
    if (this.selectedInsuranceTypes.length === 1) {
      return this.selectedInsuranceTypes[0];
    }
    return `${this.selectedInsuranceTypes.length} options selected`;
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: any) {
    // Close dropdown when clicking outside
    if (!event.target.closest('.insurance-dropdown')) {
      this.isInsuranceDropdownOpen = false;
    }
  }

  onTabChange(tabId: string): void {
    // Tabs are disabled on landing page - this method is for the navigation component interface
    console.log('Tab clicked but tabs are disabled on landing page:', tabId);
  }

  public async submitAssessment() {
    if (this.searchForm.valid && this.selectedCompany) {
      console.log('Form Submitted', this.searchForm.value);
      
      // Find selected industry from hazard class
      const selectedHazardClass = this.searchForm.value.hazardClass;
      const selectedIndustry = this.availableIndustries.find(industry => 
        selectedHazardClass.includes(industry.code)
      );

      if (selectedIndustry) {
        try {
          console.log('Creating assessment with:');
          console.log('Company:', this.selectedCompany);
          console.log('Industry:', selectedIndustry);
          console.log('Request body will be:', { 
            company: this.selectedCompany, 
            industry: selectedIndustry 
          });
          
          // Create assessment using the new API and wait for response
          const assessmentData = await this.apiService.createAssessment(this.selectedCompany, selectedIndustry);
          
          console.log('Assessment created successfully:', assessmentData);
          
          // Even if response is null, the assessment was created successfully
          // Create a temporary assessment object with the data we have
          if (!assessmentData || assessmentData === null) {
            console.log('Server returned null but assessment was created. Creating temporary object...');
            const tempAssessment = {
              company: this.selectedCompany.name,
              creation_date: new Date().toISOString(),
              last_update: new Date().toISOString(),
              lob: 'D&O',
              data: this.selectedCompany,
              industry: selectedIndustry
            };
            
            // Store the temporary assessment data
            (this.apiService as any).companyInfoSubject.next(tempAssessment);
            console.log('Temporary assessment created:', tempAssessment);
          } else {
            // Store the real assessment data
            (this.apiService as any).companyInfoSubject.next(assessmentData);
          }
          
          // Update company name in the bar
          this.companyBarConfig.companyName = this.selectedCompany.name;
          
          alert('Assessment created successfully! Redirecting to company information...');
          
          // Navigate to the company information dashboard
          this.router.navigate(['/company-information']);
        } catch (error: any) {
          console.error('Error creating assessment:', error);
          
          // Provide more specific error information
          let errorMessage = 'Error creating assessment. Please try again.';
          
          if (error.response) {
            // API returned an error response
            const status = error.response.status;
            const statusText = error.response.statusText || 'Unknown error';
            const responseData = error.response.data;
            
            errorMessage = `API Error (${status}): ${statusText}`;
            if (responseData && responseData.message) {
              errorMessage += `\n${responseData.message}`;
            }
            
            console.error('API Error Details:', {
              status: status,
              statusText: statusText,
              data: responseData,
              headers: error.response.headers
            });
          } else if (error.request) {
            // Network error - request was made but no response received
            errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
            console.error('Network Error:', error.request);
          } else {
            // Something else happened
            errorMessage = `Unexpected error: ${error.message || 'Unknown error occurred'}`;
            console.error('Unexpected Error:', error.message);
          }
          
          alert(errorMessage);
        }
      } else {
        alert('Please select a valid hazard class/industry.');
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.searchForm.markAllAsTouched();
      
      if (!this.selectedCompany) {
        alert('Please select a company from the search results.');
      }
    }
  }
}
