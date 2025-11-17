import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Userinformation} from './userinformation/userinformation';
import {authenticatedGuard} from './authenticated-guard';
import {Accesstoken} from './accesstoken/accesstoken';
import {Users} from './users/users';
import {Clients} from './clients/clients';
import {Roles} from './roles/roles';
import {UserRepresentation} from './user-representation/user-representation';
import {EndpointConfiguration} from './endpoint-configuration/endpoint-configuration';
import {UserEditor} from './user-editor/user-editor';
import {RoleEditor} from './role-editor/role-editor';
import {ClientEditor} from './client-editor/client-editor';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'authwellknownwendpoints', component: EndpointConfiguration, canActivate: [authenticatedGuard]},
  {path: 'userinformation', component: Userinformation, canActivate: [authenticatedGuard]},
  {path: 'accesstoken', component: Accesstoken, canActivate: [authenticatedGuard]},
  {path: 'keycloak/user/:id', component: UserRepresentation, canActivate: [authenticatedGuard]},
  {path: 'users', component: Users, canActivate: [authenticatedGuard]},
  {path: 'user/:id', component: UserEditor, canActivate: [authenticatedGuard]},
  {path: 'clients', component: Clients, canActivate: [authenticatedGuard]},
  {path: 'client/:id', component: ClientEditor, canActivate: [authenticatedGuard]},
  {path: 'roles', component: Roles, canActivate: [authenticatedGuard]},
  {path: 'role/:id', component: RoleEditor, canActivate: [authenticatedGuard]},
];
