import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthenticatedService} from '../authenticated-service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDTO} from '../interfaces/userDTO';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-user',
  imports: [FormsModule, RouterLink, MaterialModule],
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
    this.authenticatedService.getAccessToken().subscribe(token => {
        this.getUserById(token, userId)
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

  protected addUser() {

  }
}
