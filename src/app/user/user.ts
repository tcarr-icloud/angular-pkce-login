import {Component, inject, signal} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {MatListModule} from '@angular/material/list';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user',
  imports: [MatListModule, MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle,],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  users: any[] = [];
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  protected readonly value = signal('');

  constructor() {
    this.getUsers();
  }

  getUsers(): void {
    let accessToken: string = this.authenticatedService.accessToken();
    fetch(environment.apiUrl + '/keycloak/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(async response => {
      this.users = await response.json();
    });
  }
}
