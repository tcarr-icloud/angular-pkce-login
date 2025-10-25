import {Component, inject, signal} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from "@angular/material/list";
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {UserrepresentationDTO} from '../interfaces/userrepresentationDTO';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-user-representation',
  imports: [JsonPipe, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup, MatList, MatListItem, MatListItemLine, MatListItemTitle],
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
