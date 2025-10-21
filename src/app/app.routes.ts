import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Userinformation} from './userinformation/userinformation';
import {authenticatedGuard} from './authenticated-guard';
import {Accesstoken} from './accesstoken/accesstoken';
import {Users} from './users/users';
import {Resource} from './resource/resource';
import {Clientrepresentation} from './clientrepresentation/clientrepresentation';
import {Role} from './role/role';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'userinformation', component: Userinformation, canActivate: [authenticatedGuard]},
  {path: 'accesstoken', component: Accesstoken, canActivate: [authenticatedGuard]},
  {path: 'users', component: Users, canActivate: [authenticatedGuard]},
  {path: 'resource', component: Resource, canActivate: [authenticatedGuard]},
  {path: 'clients', component: Clientrepresentation, canActivate: [authenticatedGuard]},
  {path: 'roles', component: Role, canActivate: [authenticatedGuard]},
];

