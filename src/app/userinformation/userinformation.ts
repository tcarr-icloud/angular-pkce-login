import {Component, inject} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Userinfo} from './userinfo';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {MatList, MatListItem} from '@angular/material/list';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-userinformation',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatList,
    MatListItem
  ],
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
