import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';

@Component({
  selector: 'app-accesstoken',
  imports: [],
  templateUrl: './accesstoken.html',
  styleUrl: './accesstoken.css'
})
export class Accesstoken {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

}
