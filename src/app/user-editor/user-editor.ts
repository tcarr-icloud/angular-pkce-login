import {Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MaterialModule} from '../material-module/material-module';
import {environment} from '../../environments/environment';
import {AuthenticatedService} from '../authenticated-service';
import {ConsoleLogger} from '@angular/compiler-cli';

@Component({
  selector: 'app-user-editor',
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
  templateUrl: './user-editor.html',
  styleUrl: './user-editor.css'
})
export class UserEditor {
  protected readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  myForm = new FormGroup({
    id: new FormControl(''),
    keycloakUserId: new FormControl(''),
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    enabled: new FormControl('')
  });

  protected save() {
    this.postUser(this.myForm.value)
  }

  postUser(data: Partial<{ id: string | null; keycloakUserId: string | null; username: string | null; firstName: string | null; lastName: string | null; email: string | null; enabled: string | null; }>): void {
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
