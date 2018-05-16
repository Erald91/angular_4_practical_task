import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';

import { MainComponent } from './main/main.component';

const routesList: Array<Route> = [
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'main', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routesList)
    ],
    exports: [
        RouterModule
    ]
})
export class GuardedAppRoutingModule { }