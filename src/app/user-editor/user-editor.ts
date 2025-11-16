import {Component, inject, OnInit, signal} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module/material-module';
import {environment} from '../../environments/environment';
import {AuthenticatedService} from '../authenticated-service';
import {UserDTO} from '../interfaces/userDTO';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {User} from '../user/user';

@Component({
  selector: 'app-user-editor',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  templateUrl: './user-editor.html',
  styleUrl: './user-editor.css'
})
export class UserEditor {
  private userDto:UserDTO = null as unknown as UserDTO;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  myForm = new FormGroup({
    id: new FormControl(0),
    keycloakUserId: new FormControl(''),
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    enabled: new FormControl(true)
  });

  constructor() {
    let userId = this.route.snapshot.params['id'];
    if (userId) {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/users/' + userId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          this.userDto = await response.json();
          this.myForm.setValue(this.userDto);
        });
      });
    }
  }

  protected save() {
    this.postUser(<UserDTO>this.myForm.value)
  }

  postUser(data: UserDTO): void {
    this.authenticatedService.getAccessToken().subscribe(token => {
      fetch(environment.apiUrl + '/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(async response => {
       this.myForm.setValue(await response.json());
      });
    });
  }
}
