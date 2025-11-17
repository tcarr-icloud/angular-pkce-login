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
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  roleDto: RoleDTO = null as unknown as RoleDTO;
  idControl = new FormControl('');
  nameControl = new FormControl('');
  descriptionControl = new FormControl('');
  scopeParamRequiredControl = new FormControl(false);
  compositeControl = new FormControl(true);
  compositesControl = new FormControl('');
  clientRoleControl = new FormControl(false);
  containerIdControl = new FormControl('');
  attributesControl = new FormControl('');

  constructor(private location: Location) {
  }

  ngOnInit() {
    let roleId = this.route.snapshot.params['id'];
    if (roleId !== "0") {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/keycloak/roles/' + roleId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          response.json().then(data => {
            this.idControl.setValue(data.id);
            this.nameControl.setValue(data.name);
            this.descriptionControl.setValue(data.description);
            this.scopeParamRequiredControl.setValue(data.scopeParamRequired);
            this.compositeControl.setValue(data.composite);
            this.compositesControl.setValue(data.composites);
            this.clientRoleControl.setValue(data.clientRole);
            this.containerIdControl.setValue(data.containerId);
            this.attributesControl.setValue(data.attributes);
          });
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
