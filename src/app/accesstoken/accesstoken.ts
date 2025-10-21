import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {JsonPipe} from '@angular/common';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-accesstoken',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    MatCardTitleGroup,
    FormsModule
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
