import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';

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
  public searchForm: FormGroup;
  public files: NgxFileDropEntry[] = [];
  
  public headerConfig: HeaderConfig = {
    pageType: 'landing',
    title: 'Underwriting Dashboard',
    showUploadIcon: false,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      companyName: ['Ymab', Validators.required],
      hazardClass: ['', Validators.required], // Cambiar ticker por hazardClass
      insuranceType: ['D&O', Validators.required]
    });
  }

  public dropped(files: any) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log(droppedFile.relativePath, file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
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
