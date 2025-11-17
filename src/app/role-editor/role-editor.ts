import {Component, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedService} from '../authenticated-service';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';
import {MaterialModule} from '../material-module/material-module';
import {RoleDto} from '../interfaces/role-dto';

@Component({
  selector: 'app-roles-editor',
  imports: [ReactiveFormsModule, MaterialModule, FormsModule],
  templateUrl: './role-editor.html',
  styleUrl: './role-editor.css'
})
export class RoleEditor {
  roleDto: RoleDto = {} as RoleDto;

  idControl = new FormControl('');
  nameControl = new FormControl('');
  descriptionControl = new FormControl('');
  scopeParamRequiredControl = new FormControl(false);
  compositeControl = new FormControl(true);
  compositesControl = new FormControl('');
  clientRoleControl = new FormControl(false);
  containerIdControl = new FormControl('');
  attributesControl = new FormControl('');

  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);
  private route: ActivatedRoute = inject(ActivatedRoute);

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
          response.json().then((data: RoleDto) => {
            this.roleDto = data;
            this.idControl.setValue(this.roleDto.id);
            this.nameControl.setValue(this.roleDto.name);
            this.descriptionControl.setValue(this.roleDto.description);
            this.scopeParamRequiredControl.setValue(this.roleDto.scopeParamRequired);
            this.compositeControl.setValue(this.roleDto.composite);
            this.compositesControl.setValue(this.roleDto.composites);
            this.clientRoleControl.setValue(this.roleDto.clientRole);
            this.containerIdControl.setValue(this.roleDto.containerId);
            this.attributesControl.setValue(this.roleDto.attributes);
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
}
