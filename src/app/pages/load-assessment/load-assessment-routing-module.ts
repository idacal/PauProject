import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadAssessment } from './load-assessment';

const routes: Routes = [
  { path: '', component: LoadAssessment }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadAssessmentRoutingModule { } 