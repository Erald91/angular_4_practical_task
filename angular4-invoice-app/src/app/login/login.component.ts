import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    public emailField = '';
    public passwordField = '';

    public isEmailError = false;
    public isPasswordError = false;

    public isLoading = false;
    public authenticationMessage = '';
    public isAuthenticationMessageShown = false;

    constructor(private _auth: AuthService, private _router: Router) { }

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
                if (!response.success) {
                    this.isEmailError = !response.email;
                    this.isPasswordError = !response.password;
                    this.authenticationMessage = response.message;
                    this.isAuthenticationMessageShown = true;
                }
                // TODO: Do proper redirection after successfull login
                this._router.navigate(['/main']);
            });
    }

    public isFieldNotValid(fieldRef: any) {
        return !fieldRef.valid && !fieldRef.pristine && !fieldRef.value.trim().length;
    }

    public areCredentialsInvalid(passwordRef: any, emailRef: any) {
        const isPasswordInvalid = this.isFieldNotValid(passwordRef);
        const isEmailInvalid = this.isFieldNotValid(emailRef);

        return isPasswordInvalid || isEmailInvalid;
    }

    public invalidCredentialsMessage(passwordRef: any, emailRef: any) {
        if(this.isFieldNotValid(emailRef) && !this.isFieldNotValid(passwordRef)) {
            return 'Email field is required';
        } else if (!this.isFieldNotValid(emailRef) && this.isFieldNotValid(passwordRef)) {
            return 'Passsword field is required';
        } else {
            return 'Email and Password fields are required';
        }
    }
}
