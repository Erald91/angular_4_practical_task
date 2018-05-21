import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main/main.component';
import { InvoiceComponent } from './invoices-list/components/invoice.component';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';

import { InvoiceService } from '../services/invoices.service';

import { GuardedAppRoutingModule } from './guarded-app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GuardedAppRoutingModule
  ],
  declarations: [
    MainComponent,
    InvoiceComponent,
    InvoicesListComponent
  ],
  providers: [InvoiceService]
})
export class GuardedAppModule { }
