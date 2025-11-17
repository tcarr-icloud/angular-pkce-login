import {Component, inject} from '@angular/core';
import {MaterialModule} from '../material-module/material-module';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientDTO} from '../interfaces/client-dto';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';

@Component({
  selector: 'app-clients-editor',
  imports: [ReactiveFormsModule, MaterialModule, FormsModule],
  templateUrl: './client-editor.html',
  styleUrl: './client-editor.css'
})
export class ClientEditor {
  clientDtoFormGroup = new FormGroup({});
  clientDto: ClientDTO = null as unknown as ClientDTO;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(private location: Location) {
    let clientId = this.route.snapshot.params['id'];
    if (clientId !== "0") {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/keycloak/clients/' + clientId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          this.clientDto = await response.json();
          this.clientDtoFormGroup = this.buildFormFromDto(this.clientDto);
        });
      })
    }
  }

  private buildFormFromDto<T extends object>(dto: T): FormGroup {
    return new FormGroup(Object.entries(dto).reduce((acc, [key, value]) => {
      acc[key] = new FormControl(value);
      return acc;
    }, {} as Record<string, FormControl>));
  }

  protected save() {
  }

  protected goBack() {
    this.location.back();
  }
}
