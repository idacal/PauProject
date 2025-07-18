import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './components/layout/layout';
import { Navbar } from './components/navbar/navbar';
import { DashboardLayout } from './components/dashboard-layout/dashboard-layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';



@NgModule({
  declarations: [
    Layout,
    Navbar,
    DashboardLayout
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    Layout,
    DashboardLayout
  ]
})
export class CoreModule { }
