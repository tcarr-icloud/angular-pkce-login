import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-accesstoken',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardHeader,
    MatCardTitleGroup,
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
