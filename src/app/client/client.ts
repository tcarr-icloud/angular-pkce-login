import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-client',
  imports: [MaterialModule],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client {
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
