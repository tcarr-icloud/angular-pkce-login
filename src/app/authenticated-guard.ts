import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(OidcSecurityService);
  return authService.isAuthenticated();
};
