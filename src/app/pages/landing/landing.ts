import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  public searchForm: FormGroup;
  public files: NgxFileDropEntry[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      companyName: ['Ymab', Validators.required],
      ticker: [{value: 'eg. Ymab', disabled: false}],
      noTicker: [false],
      insuranceType: ['', Validators.required]
    });

    this.searchForm.get('noTicker')?.valueChanges.subscribe(value => {
      const tickerControl = this.searchForm.get('ticker');
      if (value) {
        tickerControl?.disable();
      } else {
        tickerControl?.enable();
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
