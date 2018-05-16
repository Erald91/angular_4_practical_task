import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main/main.component';

import { GuardedAppRoutingModule } from './guarded-app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    GuardedAppRoutingModule,
  ],
  declarations: [
    MainComponent
  ]
})
export class GuardedAppModule { }
