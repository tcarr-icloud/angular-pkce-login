import {Component, inject} from '@angular/core';
import {AuthWellKnownEndpoints, OidcSecurityService} from 'angular-auth-oidc-client';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-endpoint-configuration',
  imports: [MaterialModule],
  templateUrl: './endpoint-configuration.html',
  styleUrl: './endpoint-configuration.css'
})
export class EndpointConfiguration {
  authWellKnownEndpoints: AuthWellKnownEndpoints | undefined;
  private readonly oidcSecurityService: OidcSecurityService = inject(OidcSecurityService);

  constructor() {
    this.oidcSecurityService.preloadAuthWellKnownDocument().subscribe(data => {
      this.authWellKnownEndpoints = data;
    });
  }
}
