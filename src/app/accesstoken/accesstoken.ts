import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {MaterialModule} from '../material-module/material-module';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-accesstoken',
  imports: [
    MaterialModule,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './accesstoken.html',
  styleUrl: './accesstoken.css'
})
export class Accesstoken {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor() {
    this.authenticatedService.getAccessToken();
  }
}
