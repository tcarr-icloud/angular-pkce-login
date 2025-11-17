import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
  userDto: UserDto = {} as UserDto;

  idControl = new FormControl(0);
  keycloakUserIdControl = new FormControl('');
  usernameControl = new FormControl('');
  firstNameControl = new FormControl('');
  lastNameControl = new FormControl('');
  emailControl = new FormControl('');
  enabledControl = new FormControl(true);

  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  constructor(private location: Location) {
  }

  ngOnInit() {
    let userId = this.route.snapshot.params['id'];
    if (userId) {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/users/' + userId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          response.json().then((data: UserDto) => {
            this.userDto = data;
            this.idControl.setValue(this.userDto.id);
            this.keycloakUserIdControl.setValue(this.userDto.keycloakUserId);
            this.usernameControl.setValue(this.userDto.username);
            this.firstNameControl.setValue(this.userDto.firstName);
            this.lastNameControl.setValue(this.userDto.lastName);
            this.emailControl.setValue(this.userDto.email);
            this.enabledControl.setValue(this.userDto.enabled);
          });
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
        response.json().then((data: UserDto) => {
          this.userDto = data;
          this.idControl.setValue(this.userDto.id);
          this.keycloakUserIdControl.setValue(this.userDto.keycloakUserId);
          this.usernameControl.setValue(this.userDto.username);
          this.firstNameControl.setValue(this.userDto.firstName);
          this.lastNameControl.setValue(this.userDto.lastName);
          this.emailControl.setValue(this.userDto.email);
          this.enabledControl.setValue(this.userDto.enabled);
        });
      });
    });
  }

  goBack() {
    this.location.back();
  }

  protected save() {
    this.postUser(this.userDto);
  }
}
