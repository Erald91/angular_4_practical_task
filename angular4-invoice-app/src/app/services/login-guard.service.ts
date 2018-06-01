import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router
    ) {}

    public canActivate() {
        if (this._auth.isAuthenticated()) {
            this._router.navigate(['/main']);
            return false;
        } else {
            return true;
        }
    }
}
