import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-client',
  imports: [MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, MatCardContent, MatList, MatListItem, MatListItemLine, MatListItemTitle,],
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
