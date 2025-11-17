import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {MaterialModule} from '../material-module/material-module';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [MaterialModule, RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.css'
})
export class Clients {
  clients: any[] = [];
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor() {
    this.getClients();
  }

  getClients(): void {
    this.authenticatedService.getAccessToken().subscribe(accessToken => {
      fetch(environment.apiUrl + '/keycloak/clients', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(async response => {
        this.clients = await response.json();
      });
    });
  }

}
