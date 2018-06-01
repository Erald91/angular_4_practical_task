import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

const USER_KEY = 'user';

@Injectable()
export class AuthService {
    private _loginEmail = 'test@test.com';
    private _loginPassword = 'dummyPassword';
    private _activeUserData: any = null;
    private _stateLogin: EventEmitter<any> = new EventEmitter();

    constructor(@Inject(LOCAL_STORAGE) private _localStorage: StorageService, private _router:  Router) { }

    public doLogIn(email: string, password: string) {
        const isEmailValid = email === this._loginEmail;
        const isPasswordValid = password === this._loginPassword;
        const isValidLogin = isEmailValid && isPasswordValid;

        const validationPromise = new Promise((resolve, reject) => {
            if (isValidLogin) {
                resolve({ success: true, message: 'User authenticated successfully' });
                this._localStorage.set(USER_KEY, { email, password });
            } else {
                resolve({ success: false, message: 'Email or password is incorret', email: isEmailValid, password: isPasswordValid });
            }
        });

        // Delay response for 2 seconds in order to simulate asynchronous call
        return from(validationPromise)
            .pipe(
                delay(2000),
                map((response: any) => {
                    if (response.success) {
                        this._stateLogin.emit({ email, password });
                    }
                    return response;
                }
            ));
    }

    public doLogOut() {
        this._localStorage.remove(USER_KEY);
        this._stateLogin.emit(null);
        this._router.navigate(['/login']);
    }

    public isAuthenticated() {
        const userRecord: any = this._localStorage.get(USER_KEY) || null;
        this._activeUserData = userRecord;
        this._stateLogin.emit(this._activeUserData);

        return this._activeUserData;
    }

    public getStateLoginListener() {
        return this._stateLogin;
    }
}
