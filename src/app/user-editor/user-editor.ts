import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module/material-module';
import {environment} from '../../environments/environment';
import {AuthenticatedService} from '../authenticated-service';
import {UserDto} from '../interfaces/user-dto';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-editor',
  imports: [ReactiveFormsModule, MaterialModule, FormsModule],
  templateUrl: './user-editor.html',
  styleUrl: './user-editor.css'
})
export class UserEditor {
  userDtoFormGroup = new FormGroup({
    id: new FormControl(0),
    keycloakUserId: new FormControl(''),
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    enabled: new FormControl(true)
  });
  userDto: UserDto = null as unknown as UserDto;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(private location: Location) {
    let userId = this.route.snapshot.params['id'];
    if (userId) {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/users/' + userId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          this.userDto = await response.json();
          this.userDtoFormGroup.setValue(this.userDto);
        });
      });
    }
  }

  postUser(data: UserDto): void {
    this.authenticatedService.getAccessToken().subscribe(token => {
      fetch(environment.apiUrl + '/users', {
        method: 'POST', headers: {
          'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
      }).then(async response => {
        this.userDtoFormGroup.setValue(await response.json());
      });
    });
  }

  goBack() {
    this.location.back();
  }

  protected save() {
    this.postUser(<UserDto>this.userDtoFormGroup.value)
  }
}
