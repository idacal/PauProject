import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    NavigationTabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardHeaderComponent,
    NavigationTabsComponent
  ]
})
export class SharedModule { } 