import {Component, inject, signal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {UserrepresentationDTO} from '../interfaces/userrepresentationDTO';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-user-representation',
  imports: [JsonPipe, MaterialModule],
  templateUrl: './user-representation.html',
  styleUrl: './user-representation.css'
})
export class UserRepresentation {
  userKeycloakDto = signal(null as UserrepresentationDTO | null);
  private http: HttpClient = inject(HttpClient);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor() {
    let keycloakUserId = this.route.snapshot.params['id'];
    this.authenticatedService.getAccessToken()
      .subscribe(accessToken => {
        this.getKeycloakUserById(accessToken, keycloakUserId)
          .subscribe((data) => {
            this.userKeycloakDto.set(data);
          });
      });
  }

  getKeycloakUserById(accessToken: string, id: string): Observable<UserrepresentationDTO> {
    return this.http.get<UserrepresentationDTO>(environment.apiUrl + '/keycloak/users/' + id, {
      headers: {'Authorization': `Bearer ${accessToken}`}
    });
  }

}
