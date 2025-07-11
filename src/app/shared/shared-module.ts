import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { CompanyNameBarComponent } from './company-name-bar/company-name-bar.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    NavigationTabsComponent,
    CompanyNameBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardHeaderComponent,
    NavigationTabsComponent,
    CompanyNameBarComponent
  ]
})
export class SharedModule { }
