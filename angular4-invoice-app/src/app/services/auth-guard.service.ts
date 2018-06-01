import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _router: Router,
    ) {}

    public canActivate() {
        if (this._auth.isAuthenticated()) {
            return true;
        } else {
            this._router.navigate(['/login']);
            return false;
        }
    }
}
