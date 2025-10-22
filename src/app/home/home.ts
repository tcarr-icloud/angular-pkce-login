import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
}
