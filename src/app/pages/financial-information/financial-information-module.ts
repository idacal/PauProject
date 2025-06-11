import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialInformationRoutingModule } from './financial-information-routing-module';
import { FinancialInformation } from './financial-information';


@NgModule({
  declarations: [
    FinancialInformation
  ],
  imports: [
    CommonModule,
    FinancialInformationRoutingModule
  ]
})
export class FinancialInformationModule { }
