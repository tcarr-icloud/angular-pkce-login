import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoleDTO} from '../interfaces/role-dto';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';
import {MaterialModule} from '../material-module/material-module';

@Component({
  selector: 'app-roles-editor',
  imports: [ReactiveFormsModule, MaterialModule, FormsModule],
  templateUrl: './role-editor.html',
  styleUrl: './role-editor.css'
})
export class RoleEditor {
  roleDtoFormGroup: FormGroup = new FormGroup({});
  roleDto: RoleDTO = null as unknown as RoleDTO;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(private location: Location) {
    let roleId = this.route.snapshot.params['id'];
    if (roleId !== "0") {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/keycloak/roles/' + roleId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          this.roleDto = await response.json();
          this.roleDtoFormGroup = this.buildFormFromDto(this.roleDto);
        });
      });
    }
  }

  protected save() {
  }

  protected goBack() {
    this.location.back();
  }

  private buildFormFromDto<T extends object>(dto: T): FormGroup {
    return new FormGroup(Object.entries(dto).reduce((acc, [key, value]) => {
      acc[key] = new FormControl(value);
      return acc;
    }, {} as Record<string, FormControl>));
  }
}
