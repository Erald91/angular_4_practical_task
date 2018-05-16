import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AuthService {
    private _loginEmail: string = 'test@test.com';
    private _loginPassword: string = 'dummyPassword';
    private _isUserAuthenticated: boolean = false;

    constructor() { }

    public doValidation(email: string, password: string) {
        const isEmailValid = email === this._loginEmail;
        const isPasswordValid = password === this._loginPassword;
        const isValidLogin = isEmailValid && isPasswordValid;

        let validationPromise = new Promise((resolve, reject) => {
            this._isUserAuthenticated = isValidLogin;

            if(isValidLogin) resolve({ success: true, message: 'User authenticated successfully' });
            else resolve({ success: false, message: 'Email or password is incorret', email: isEmailValid, password: isPasswordValid });
        });

        // Delay response for 2 seconds in order to simulate asynchronous call 
        return from(validationPromise).pipe(delay(2000));
    }

    public isAuthenticated() {
        return this._isUserAuthenticated;
    }
}