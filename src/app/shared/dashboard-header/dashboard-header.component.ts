import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

export interface HeaderConfig {
  pageType: 'landing' | 'company' | 'other';
  title: string;
  subtitle?: string;
  showUploadIcon?: boolean;
  backgroundColor?: string;
  textColor?: string;
}

@Component({
  selector: 'app-dashboard-header',
  standalone: false,
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  @Input() config: HeaderConfig = {
    pageType: 'company',
    title: 'D&O Underwriting Dashboard',
    showUploadIcon: true,
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  };

  @Output() uploadClick = new EventEmitter<void>();
  @Output() searchClick = new EventEmitter<void>();
  @Output() menuClick = new EventEmitter<void>();
  @Output() themeClick = new EventEmitter<void>();
  @Output() infoClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();

  constructor(private router: Router) {}

  onUploadClick() {
    this.uploadClick.emit();
  }

  onSearchClick() {
    // Search Assessment always goes to landing page
    this.router.navigate(['/landing']);
    this.searchClick.emit();
  }

  onMenuClick() {
    // Load Assessment always goes to load-assessment page
    this.router.navigate(['/dashboard/load-assessment']);
    this.menuClick.emit();
  }

  onThemeClick() {
    this.themeClick.emit();
  }

  onInfoClick() {
    this.infoClick.emit();
  }

  onProfileClick() {
    this.profileClick.emit();
  }
} 