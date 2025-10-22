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
  selector: 'app-role',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatListModule,
  ],
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
    let accessToken: string = this.authenticatedService.accessToken();
    fetch('http://localhost:8080/roles', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(async response => {
      this.roles = await response.json();
    });
  }
}
