import {Component, inject} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Userinfo} from './userinfo';
import {environment} from '../../environments/environment';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-userinformation',
  imports: [MaterialModule],
  templateUrl: './userinformation.html',
  styleUrl: './userinformation.css'
})
export class Userinformation {
  userInformation: Userinfo = {} as Userinfo;
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);

  ngOnInit() {
    this.getUserinfo();
  }

  getUserinfo(): void {
    this.oidcSecurityService.getAccessToken().subscribe(token => {
      fetch(environment.oidc.userinfo_endpoint, {
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
