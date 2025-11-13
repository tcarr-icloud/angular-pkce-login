import {Component, inject} from '@angular/core';
import {AuthWellKnownEndpoints, OidcSecurityService} from 'angular-auth-oidc-client';
import {JsonPipe} from '@angular/common';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-endpoint-configuration',
  imports: [
    MaterialModule,
    JsonPipe
  ],
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
