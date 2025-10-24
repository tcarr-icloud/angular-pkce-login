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
import {JsonPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {UserDTO} from '../interfaces/userDTO';

@Component({
  selector: 'app-users',
  imports: [MatListModule, MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle, RouterLink,],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  users: UserDTO[] = [];
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  protected readonly value = signal('');

  constructor() {
    this.getUsers();
  }

  getUsers(): void {
    let accessToken: string = this.authenticatedService.accessToken();
    fetch(environment.apiUrl + '/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(async response => {
      this.users = await response.json();
    });
  }

}
