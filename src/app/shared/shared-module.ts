import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardHeaderComponent
  ]
})
export class SharedModule { }
