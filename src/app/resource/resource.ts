import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-resource',
  imports: [
    JsonPipe
  ],
  templateUrl: './resource.html',
  styleUrl: './resource.css'
})
export class Resource {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  event: string = "";

  constructor() {
    this.getResource();
  }

  getResource(): void {
    let accessToken: string = this.authenticatedService.accessToken();
    fetch('http://localhost:8080/event', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(async response => {
      this.event = await response.json();
    });
  }

}
