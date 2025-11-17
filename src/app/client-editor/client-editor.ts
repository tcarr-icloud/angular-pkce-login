import {Component, inject} from '@angular/core';
import {MaterialModule} from '../material-module/material-module';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClientDto} from '../interfaces/client-dto';
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
  clientDto: ClientDto = {} as ClientDto;

  idControl = new FormControl('');
  clientIdControl = new FormControl('');
  nameControl = new FormControl('');
  descriptionControl = new FormControl('');
  typeControl = new FormControl('');
  rootUrlControl = new FormControl('');
  adminUrlControl = new FormControl('');
  baseUrlControl = new FormControl('');
  surrogateAuthRequiredControl = new FormControl(false);
  enabledControl = new FormControl(true);
  alwaysDisplayInConsoleControl = new FormControl(false);
  clientAuthenticatorTypeControl = new FormControl('');
  secretControl = new FormControl('');
  registrationAccessTokenControl = new FormControl('');
  // defaultRolesControl = new FormControl([]);
  redirectUrisControl = new FormControl<string[]>([]);
  webOriginsControl = new FormControl<string[]>([]);
  notBeforeControl = new FormControl(0);
  bearerOnlyControl = new FormControl(false);
  consentRequiredControl = new FormControl(false);
  standardFlowEnabledControl = new FormControl(true);
  implicitFlowEnabledControl = new FormControl(false);
  directAccessGrantsEnabledControl = new FormControl(false);
  serviceAccountsEnabledControl = new FormControl(false);
  authorizationServicesEnabledControl = new FormControl(false);
  // directGrantsOnlyControl = new FormControl(false);
  publicClientControl = new FormControl(false);
  frontchannelLogoutControl = new FormControl(false);
  protocolControl = new FormControl('');
  attributesControl = new FormControl({});
  authenticationFlowBindingOverridesControl = new FormControl({});
  fullScopeAllowedControl = new FormControl(false);
  nodeReRegistrationTimeoutControl = new FormControl(0);
  registeredNodesControl = new FormControl({});
  protocolMappersControl = new FormControl<any[]>([]);
  // clientTemplateControl = new FormControl('');
  // useTemplateConfigControl = new FormControl(false);
  // useTemplateScopeControl = new FormControl(false);
  // useTemplateMappersControl = new FormControl(false);
  defaultClientScopesControl = new FormControl<string[]>([]);
  optionalClientScopesControl = new FormControl<string[]>([]);
  authorizationSettingsControl = new FormControl({});
  accessControl = new FormControl({});
  originControl = new FormControl('');

  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly authenticatedService: AuthenticatedService = inject(AuthenticatedService);

  constructor(private location: Location) {
  }

  ngOnInit() {
    let clientId = this.route.snapshot.params['id'];
    if (clientId !== "0") {
      this.authenticatedService.getAccessToken().subscribe(token => {
        fetch(environment.apiUrl + '/keycloak/clients/' + clientId, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }).then(async response => {
          response.json().then((data: ClientDto) => {
            this.clientDto = data;

            this.idControl.setValue(this.clientDto.id ?? '');
            this.clientIdControl.setValue(this.clientDto.clientId ?? '');
            this.nameControl.setValue(this.clientDto.name ?? '');
            this.descriptionControl.setValue(this.clientDto.description ?? '');
            this.typeControl.setValue(this.clientDto.type ?? 'confidential');
            this.rootUrlControl.setValue(this.clientDto.rootUrl ?? '');
            this.adminUrlControl.setValue(this.clientDto.adminUrl ?? '');
            this.baseUrlControl.setValue(this.clientDto.baseUrl ?? '');
            this.surrogateAuthRequiredControl.setValue(this.clientDto.surrogateAuthRequired ?? false);
            this.enabledControl.setValue(this.clientDto.enabled ?? true);
            this.alwaysDisplayInConsoleControl.setValue(this.clientDto.alwaysDisplayInConsole ?? false);
            this.clientAuthenticatorTypeControl.setValue(this.clientDto.clientAuthenticatorType ?? '');
            this.secretControl.setValue(this.clientDto.secret ?? '');
            this.registrationAccessTokenControl.setValue(this.clientDto.registrationAccessToken ?? '');
            // this.defaultRolesControl.setValue(this.clientDto.defaultRoles);
            this.redirectUrisControl.setValue(this.clientDto.redirectUris ?? []);
            this.webOriginsControl.setValue(this.clientDto.webOrigins ?? []);
            this.notBeforeControl.setValue(this.clientDto.notBefore ?? 0);
            this.bearerOnlyControl.setValue(this.clientDto.bearerOnly ?? false);
            this.consentRequiredControl.setValue(this.clientDto.consentRequired ?? false);
            this.standardFlowEnabledControl.setValue(this.clientDto.standardFlowEnabled ?? true);
            this.implicitFlowEnabledControl.setValue(this.clientDto.implicitFlowEnabled ?? false);
            this.directAccessGrantsEnabledControl.setValue(this.clientDto.directAccessGrantsEnabled ?? false);
            this.serviceAccountsEnabledControl.setValue(this.clientDto.serviceAccountsEnabled ?? false);
            this.authorizationServicesEnabledControl.setValue(this.clientDto.authorizationServicesEnabled ?? false);
            // this.directGrantsOnlyControl.setValue(false);
            this.publicClientControl.setValue(this.clientDto.publicClient ?? false);
            this.frontchannelLogoutControl.setValue(this.clientDto.frontchannelLogout ?? false);
            this.protocolControl.setValue(this.clientDto.protocol ?? 'openid-connect');
            this.attributesControl.setValue(this.clientDto.attributes ?? null);
            this.authenticationFlowBindingOverridesControl.setValue(this.clientDto.authenticationFlowBindingOverrides ?? null);
            this.fullScopeAllowedControl.setValue(this.clientDto.fullScopeAllowed ?? false);
            this.nodeReRegistrationTimeoutControl.setValue(this.clientDto.nodeReRegistrationTimeout ?? 0);
            this.registeredNodesControl.setValue(this.clientDto.registeredNodes ?? null);
            this.protocolMappersControl.setValue(this.clientDto.protocolMappers ?? []);
            // this.clientTemplateControl.setValue('');
            // this.useTemplateConfigControl.setValue(false);
            // this.useTemplateScopeControl.setValue(false);
            // this.useTemplateMappersControl.setValue(false);
            this.defaultClientScopesControl.setValue(this.clientDto.defaultClientScopes ?? []);
            this.optionalClientScopesControl.setValue(this.clientDto.optionalClientScopes ?? []);
            this.authorizationSettingsControl.setValue('');
            this.accessControl.setValue([]);
            this.originControl.setValue('');
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
