import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialInformation } from './financial-information';

const routes: Routes = [{ path: '', component: FinancialInformation }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialInformationRoutingModule { }
