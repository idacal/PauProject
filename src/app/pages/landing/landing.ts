import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';
import { CompanyBarConfig } from '../../shared/company-name-bar/company-name-bar.component';

interface MenuTab {
  id: string;
  label: string;
  disabled: boolean;
  isDropdown?: boolean;
}

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

  public companyOptions = [
    'YMAB Therapeutics, Inc. / USA / YMAB',
    'MarkerGenetics, Inc.  / USA / MRKR',
    'VF Technology, Inc.  / USA / VFC',
    'Senzar, Inc. / USA / SENZA'
  ];

  public insuranceOptions = [
    { value: 'D&O', label: 'D&O' },
    { value: 'EPL', label: 'EPL' },
    { value: 'Fiduciary', label: 'Fiduciary' },
    { value: 'Crime', label: 'Crime' }
  ];

  // Cambiar tickerOptions por hazardClassOptions
  public hazardClassOptions = [
    'Pharmaceutical',
    'Healthcare',
  ];

  // Agregar las pestañas del menú
  public menuTabs: MenuTab[] = [
    { id: 'company-info', label: 'Company Information', disabled: true },
    { id: 'market-info', label: 'Market Information', disabled: true },
    { id: 'financial-condition', label: 'Financial Condition', disabled: true },
    { id: 'do-dropdown', label: 'D&O', disabled: true, isDropdown: true },
    { id: 'overall-summary', label: 'Overall Summary', disabled: true }
  ];

  // Opciones del dropdown D&O
  public doDropdownOptions = [
    { id: 'governance', label: 'Governance' },
    { id: 'litigation', label: 'Litigation & M.E' },
    { id: 'nature-business', label: 'Nature of Business' },
    { id: 'loss-probability', label: 'Loss Probability Model' }
  ];

  public isInsuranceDropdownOpen = false;
  public selectedInsuranceTypes: string[] = ['D&O'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      companyName: ['Ymab', Validators.required],
      hazardClass: ['', Validators.required], // Cambiar ticker por hazardClass
      insuranceType: [['D&O'], [Validators.required, this.minLengthArray(1)]]
    });
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
          // Check if file is already in the list
          if (!this.uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
            this.uploadedFiles.push(file);
            console.log('File added via drag & drop:', file.name);
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
      // Check if file is already in the list
      if (!this.uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
        this.uploadedFiles.push(file);
        console.log('File added via file picker:', file.name);
      } else {
        console.log('File already exists, skipping:', file.name);
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

  public removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
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
      // Check if file is already in the list
      if (!this.uploadedFiles.find(f => f.name === file.name && f.size === file.size)) {
        this.uploadedFiles.push(file);
        console.log('File added via native drop:', file.name);
      } else {
        console.log('File already exists, skipping:', file.name);
      }
    }
    console.log('Total uploaded files:', this.uploadedFiles.length);
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

  public submitAssessment() {
    if (this.searchForm.valid) {
      console.log('Form Submitted', this.searchForm.value);
      // Navigate to the company information dashboard
      this.router.navigate(['/company-information']);
    } else {
      // Mark all fields as touched to show validation errors
      this.searchForm.markAllAsTouched();
    }
  }
}
