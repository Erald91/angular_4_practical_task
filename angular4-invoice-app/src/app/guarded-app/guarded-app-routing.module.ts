import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const routesList: Array<Route> = [];

@NgModule({
    imports: [
        RouterModule.forChild(routesList)
    ],
    exports: [
        RouterModule
    ]
})
export class GuardedAppRoutingModule { }