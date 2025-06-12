import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderConfig } from '../../shared/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-load-assessment',
  standalone: false,
  templateUrl: './load-assessment.html',
  styleUrl: './load-assessment.scss'
})
export class LoadAssessment {

  public headerConfig: HeaderConfig = {
    pageType: 'company',
    title: 'Underwriting Dashboard',
    showUploadIcon: true,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  public assessments = [
    {
      id: 24,
      companyName: 'YMAB',
      lob: 'D&O',
      lastUpdate: 'April 30, 2023, 8:04 p.m.',
      status: 'active'
    },
    {
      id: 1,
      companyName: 'MarkerGenetics, Inc.',
      lob: 'D&O',
      lastUpdate: 'April 28, 2023, 9:20 p.m.',
      status: 'active'
    },
    {
      id: 46,
      companyName: 'VF Technology, Inc.',
      lob: 'D&O',
      lastUpdate: 'Feb. 21, 2023, 4:04 p.m.',
      status: 'active'
    },
    {
      id: 103,
      companyName: 'Senzar, Inc.',
      lob: 'D&O',
      lastUpdate: 'Feb. 20, 2023, 1:18 p.m.',
      status: 'active'
    }
  ];

  constructor(private router: Router) { }

  navigateToSearch(): void {
    this.router.navigate(['/landing']);
  }

} 