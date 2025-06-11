import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketInformationRoutingModule } from './market-information-routing-module';
import { MarketInformation } from './market-information';


@NgModule({
  declarations: [
    MarketInformation
  ],
  imports: [
    CommonModule,
    MarketInformationRoutingModule
  ]
})
export class MarketInformationModule { }
