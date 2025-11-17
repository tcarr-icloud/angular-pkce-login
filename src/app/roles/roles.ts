import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {MaterialModule} from '../material-module/material-module';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-roles',
  imports: [MaterialModule, RouterLink],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles {
  roles: any[] = [];
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor() {
    this.getRoles();
  }

  getRoles(): void {
    this.authenticatedService.getAccessToken().subscribe(accessToken => {
      fetch(environment.apiUrl + '/keycloak/roles', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(async response => {
        this.roles = await response.json();
      });
    });
  }
}
