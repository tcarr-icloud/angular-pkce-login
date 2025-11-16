import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, MaterialModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
  showAddUserButton = false;
  showAddRoleButton = false;
  showAddClientButton = false;
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      if (this.router.url === '/users') {
        this.showAddUserButton = true;
      } else {
        this.showAddUserButton = false;
      }

      if (this.router.url === '/roles') {
        this.showAddRoleButton = true;
      } else {
        this.showAddRoleButton = false;
      }

      if (this.router.url === '/clients') {
        this.showAddClientButton = true;
      } else {
        this.showAddClientButton = false;
      }
    })
  }

  loginClicked(): void {
    this.authenticatedService.login();
  }

  logoutClicked(): void {
    this.authenticatedService.logout();
  }
}
