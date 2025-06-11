import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyInformation } from './company-information';

const routes: Routes = [{ path: '', component: CompanyInformation }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyInformationRoutingModule { }
