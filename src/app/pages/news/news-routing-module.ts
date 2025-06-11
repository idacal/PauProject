import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { News } from './news';

const routes: Routes = [{ path: '', component: News }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
