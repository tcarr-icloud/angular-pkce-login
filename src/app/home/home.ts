import {Component, inject} from '@angular/core';
import {AuthenticatedService} from '../authenticated-service';
import {Userinformation} from '../userinformation/userinformation';
import {Accesstoken} from '../accesstoken/accesstoken';
import {EndpointConfiguration} from '../endpoint-configuration/endpoint-configuration';

@Component({
  selector: 'app-home',
  imports: [
    Userinformation,
    Accesstoken,
    EndpointConfiguration
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
}
