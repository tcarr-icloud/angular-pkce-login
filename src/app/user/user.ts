import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthenticatedService} from '../authenticated-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../interfaces/userDTO';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
  MatCardTitleGroup
} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';

@Component({
  selector: 'app-user',
  imports: [MatCard, FormsModule, MatCardContent, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatListItem, MatList, MatListItemLine, MatListItemTitle, RouterLink,],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  userDto = signal(null as UserDTO | null);
  private http: HttpClient = inject(HttpClient);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor() {
    let userId = this.route.snapshot.params['id'];
    this.authenticatedService.getAccessToken()
      .subscribe(accessToken => {
        this.getUserById(accessToken, userId)
          .subscribe((data) => {
            this.userDto.set(data);
          });
      });
  }

  getUserById(accessToken: string, id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(environment.apiUrl + '/users/' + id, {
      headers: {'Authorization': `Bearer ${accessToken}`}
    });
  }

}
