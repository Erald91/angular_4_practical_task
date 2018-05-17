import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: '.app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public emailField: string = '';
    public passwordField: string = '';

    public isEmailError: boolean = false;
    public isPasswordError: boolean = false;

    public isLoading: boolean = false;
    public authenticationMessage: string = '';
    public isAuthenticationMessageShown: boolean = false;

    constructor(private _auth: AuthService, private _router: Router) {
        
    }

    public manageFormControlChange(event, errorPropertykey) {
        this.isAuthenticationMessageShown = false;
        this[errorPropertykey] = false;
    }

    public onLoginFormSubmit(event) {
        this.isLoading = true;
        this._auth
            .doLogIn(this.emailField, this.passwordField)
            .subscribe((response: any) => {
                this.isLoading = false;
                if(!response.success) {
                    this.isEmailError = !response.email;
                    this.isPasswordError = !response.password;
                    this.authenticationMessage = response.message;
                    this.isAuthenticationMessageShown = true;
                }
                // TODO: Do proper redirection after successfull login
                this._router.navigate(['/main']);
            })
    }
}