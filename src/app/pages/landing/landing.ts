import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';

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
    'Ymab',
    'YMAB Therapeutics, Inc.',
    'MarkerGenetics, Inc.',
    'VF Technology, Inc.',
    'Senzar, Inc.'
  ];

  public insuranceOptions = [
    { value: 'D&O', label: 'D&O' },
    { value: 'EPL', label: 'EPL' },
    { value: 'Fiduciary', label: 'Fiduciary' },
    { value: 'Crime', label: 'Crime' }
  ];

  public tickerOptions = [
    'YMAB',
    'eg. Ymab'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      companyName: ['Ymab', Validators.required],
      ticker: [{value: 'eg. Ymab', disabled: false}],
      noTicker: [false],
      insuranceType: ['D&O', Validators.required]
    });

    this.searchForm.get('noTicker')?.valueChanges.subscribe(value => {
      const tickerControl = this.searchForm.get('ticker');
      if (value) {
        tickerControl?.disable();
        tickerControl?.setValue('');
      } else {
        tickerControl?.enable();
        tickerControl?.setValue('eg. Ymab');
      }
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
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
