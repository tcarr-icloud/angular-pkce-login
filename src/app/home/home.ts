import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
}
