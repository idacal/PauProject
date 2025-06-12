import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';

import { LandingRoutingModule } from './landing-routing-module';
import { Landing } from './landing';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    Landing
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    SharedModule
  ]
})
export class LandingModule { }
