import { Component, Input } from '@angular/core';

export interface CompanyBarConfig {
  companyName?: string;
  showBar?: boolean;
}

@Component({
  selector: 'app-company-name-bar',
  standalone: false,
  templateUrl: './company-name-bar.component.html',
  styleUrls: ['./company-name-bar.component.scss']
})
export class CompanyNameBarComponent {
  @Input() config: CompanyBarConfig = {
    companyName: '',
    showBar: true
  };
} 