import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { StorageServiceModule } from 'angular-webstorage-service';

import { GuardedAppModule } from './guarded-app/guarded-app.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './services/auth-guard.service';
import { LoginGuard } from './services/login-guard.service';
import { AuthService } from './services/auth.service';

const routesList: Array<Route> = [
  { path:'login', component: LoginComponent, canActivate: [LoginGuard] }
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
    RouterModule.forRoot(routesList),
    StorageServiceModule
  ],
  providers: [
    AuthService, 
    AuthGuard,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
