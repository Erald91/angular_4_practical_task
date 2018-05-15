import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { GuardedAppModule } from './guarded-app/guarded-app.module';

import { AppComponent } from './app.component';

const routesList: Array<Route> = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GuardedAppModule,
    RouterModule.forRoot(routesList)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
