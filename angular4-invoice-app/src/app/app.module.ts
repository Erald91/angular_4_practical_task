import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { GuardedAppModule } from './guarded-app/guarded-app.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routesList: Array<Route> = [
  { path:'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    LoginComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GuardedAppModule,
    RouterModule.forRoot(routesList)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
