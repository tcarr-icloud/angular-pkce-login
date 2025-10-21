import {inject, Injectable, signal} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);
  isAuthenticated = signal<boolean>(false);
  authenticatedUserData = signal<any>(null);
  accessToken = signal<string>("");

  constructor() {
    this.checkAuth();
  }

  checkAuth(): void {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({isAuthenticated, accessToken, userData}) => {
        this.isAuthenticated.set(isAuthenticated);
        this.authenticatedUserData.set(userData);
        this.accessToken.set(accessToken);
      });
  }

  login(): void {
    this.oidcSecurityService.authorize();
    this.checkAuth();
  }

  refreshSession(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
