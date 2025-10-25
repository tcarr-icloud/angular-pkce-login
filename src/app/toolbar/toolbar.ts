import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-toolbar',
  imports: [RouterLink, MaterialModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  loginClicked(): void {
    this.authenticatedService.login();
  }

  logoutClicked(): void {
    this.authenticatedService.logout();
  }
}
