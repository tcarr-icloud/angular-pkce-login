import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';
import {AuthenticatedService} from '../authenticated-service';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatMenuItem
  ],
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
