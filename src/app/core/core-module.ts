import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './components/layout/layout';
import { Navbar } from './components/navbar/navbar';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Layout,
    Navbar
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Layout
  ]
})
export class CoreModule { }
