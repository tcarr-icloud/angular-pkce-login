import {Component, inject} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Userinfo} from './userinfo';

@Component({
  selector: 'app-userinformation',
  imports: [],
  templateUrl: './userinformation.html',
  styleUrl: './userinformation.css'
})
export class Userinformation {
  isAuthenticated: boolean = false;
  userInformation: Userinfo = {} as Userinfo;
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);

  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({isAuthenticated, accessToken}) => {
        this.isAuthenticated = isAuthenticated;
        this.getUserinfo();
      });
  }

  getUserinfo(): void {
    let accessToken: string;
    this.oidcSecurityService.getAccessToken().subscribe(token => {
      accessToken = token
      fetch('http://localhost:9090/realms/demo/protocol/openid-connect/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        response.json().then(data => {
          this.userInformation = data;
        })
      });
    });
  }

}
