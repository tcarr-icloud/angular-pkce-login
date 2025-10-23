import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthenticatedService} from '../authenticated-service';
import {JsonPipe} from '@angular/common';
import {UserrepresentationDTO} from '../interfaces/userrepresentationDTO';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../interfaces/userDTO';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-user',
  imports: [JsonPipe, MatCard, MatLabel, FormsModule, MatFormField, MatInput, MatCardContent, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardSubtitle],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  userDto = signal(null as UserDTO | null);
  userKeycloakDto = signal(null as UserrepresentationDTO | null);
  protected http: HttpClient = inject(HttpClient);
  protected route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor() {
    let userId = this.route.snapshot.params['id'];
    let accessToken: string = this.authenticatedService.accessToken();
    this.getUserById(accessToken, userId).subscribe((data) => {
      this.userDto.set(data);
      this.getKeycloakUserById(accessToken, data.keycloakUserId).subscribe((data) => {
        this.userKeycloakDto.set(data);
      });
    });
  }

  getUserById(accessToken: string, id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.apiUrl + '/users/' + id, {
      headers: {'Authorization': `Bearer ${accessToken}`}
    });
  }

  getKeycloakUserById(accessToken: string, id: string): Observable<UserrepresentationDTO> {
    return this.http.get<UserrepresentationDTO>(environment.apiUrl + '/keycloak/users/' + id, {
      headers: {'Authorization': `Bearer ${accessToken}`}
    });
  }
}
