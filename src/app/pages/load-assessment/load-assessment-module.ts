import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadAssessmentRoutingModule } from './load-assessment-routing-module';
import { LoadAssessment } from './load-assessment';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [
    LoadAssessment
  ],
  imports: [
    CommonModule,
    LoadAssessmentRoutingModule,
    SharedModule
  ]
})
export class LoadAssessmentModule { } 