import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyInformationRoutingModule } from './company-information-routing-module';
import { CompanyInformation } from './company-information';
import { CompanyInfoCard } from './components/company-info-card/company-info-card';
import { MarketInfoCard } from './components/market-info-card/market-info-card';
import { MarketGraphsCard } from './components/market-graphs-card/market-graphs-card';
import { FinancialInfoCard } from './components/financial-info-card/financial-info-card';
import { LatestNewsCard } from './components/latest-news-card/latest-news-card';
import { SharedModule } from '../../shared/shared-module';


@NgModule({
  declarations: [
    CompanyInformation,
    CompanyInfoCard,
    MarketInfoCard,
    MarketGraphsCard,
    FinancialInfoCard,
    LatestNewsCard
  ],
  imports: [
    CommonModule,
    CompanyInformationRoutingModule,
    SharedModule
  ]
})
export class CompanyInformationModule { }
