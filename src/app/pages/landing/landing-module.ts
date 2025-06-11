import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';

import { LandingRoutingModule } from './landing-routing-module';
import { Landing } from './landing';


@NgModule({
  declarations: [
    Landing
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    NgxFileDropModule
  ]
})
export class LandingModule { }
