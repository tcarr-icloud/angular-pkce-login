import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-role',
  imports: [MaterialModule],
  templateUrl: './role.html',
  styleUrl: './role.css'
})
export class Role {
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
