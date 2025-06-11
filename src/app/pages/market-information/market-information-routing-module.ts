import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketInformation } from './market-information';

const routes: Routes = [{ path: '', component: MarketInformation }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketInformationRoutingModule { }
