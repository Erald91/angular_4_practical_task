import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLogged: boolean = false;
  public loggedUserEmail: string = '';

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.getStateLoginListener().subscribe(authData => {
      if(authData) {
        this.isLogged = true;
        this.loggedUserEmail = authData.email;
      } else {
        this.isLogged = false;
        this.loggedUserEmail = '';
      }
    });
  }

  public onLogOut(event) {
    this._auth.doLogOut();
  }
}
