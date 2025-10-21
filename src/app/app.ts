import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toolbar} from './toolbar/toolbar';
import {AuthenticatedService} from './authenticated-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet/>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  // getResource(): void {
  //   let accessToken: string;
  // this.oidcSecurityService.getAccessToken().subscribe(token => {
  //   accessToken = token
  //   fetch('http://localhost:8080/event', {
  //     headers: {
  //       'Authorization': `Bearer ${token}`
  //     }
  //   }).then(response => {
  //     this.event = response.json();
  //   });
  // });
  // }

}
