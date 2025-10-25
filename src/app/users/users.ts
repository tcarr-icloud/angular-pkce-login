import {Component, inject, signal} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {RouterLink} from '@angular/router';
import {UserDTO} from '../interfaces/userDTO';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-users', imports: [RouterLink, MaterialModule], templateUrl: './users.html', styleUrl: './users.css'
})
export class Users {
  users: UserDTO[] = [];
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  protected readonly value = signal('');

  constructor() {
    this.getUsers();
  }

  getUsers(): void {
    this.authenticatedService.getAccessToken().subscribe(token => {
      fetch(environment.apiUrl + '/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(async response => {
        this.users = await response.json();
      });
    });
  }

}
