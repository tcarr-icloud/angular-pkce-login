import {Component, inject} from '@angular/core';
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

@Component({
  selector: 'app-users',
  imports: [
    MatListModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    MatCardTitleGroup
  ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  users: any[] = [];

  constructor() {
    this.getUsers();
  }

  getUsers(): void {
    let accessToken: string = this.authenticatedService.accessToken();
    fetch('http://localhost:9090/admin/realms/demo/users', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(async response => {
      this.users = await response.json();
    });
  }

}
