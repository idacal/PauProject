import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    App,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // for ngModel & NgForm
    AppRoutingModule,
  ],
  bootstrap: [App],
})
export class AppModule { }
