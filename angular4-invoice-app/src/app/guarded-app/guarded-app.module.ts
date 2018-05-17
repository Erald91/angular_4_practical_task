import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

import { GuardedAppRoutingModule } from './guarded-app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GuardedAppRoutingModule,
  ],
  declarations: [
    MainComponent,
    InvoicesListComponent
  ]
})
export class GuardedAppModule { }
