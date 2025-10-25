import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Userinformation} from './userinformation/userinformation';
import {authenticatedGuard} from './authenticated-guard';
import {Accesstoken} from './accesstoken/accesstoken';
import {Users} from './users/users';
import {Client} from './client/client';
import {Role} from './role/role';
import {User} from './user/user';
import {UserRepresentation} from './user-representation/user-representation';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'userinformation', component: Userinformation, canActivate: [authenticatedGuard]},
  {path: 'accesstoken', component: Accesstoken, canActivate: [authenticatedGuard]},
  {path: 'user/:id', component: User, canActivate: [authenticatedGuard]},
  {path: 'keycloak/user/:id', component: UserRepresentation, canActivate: [authenticatedGuard]},
  {path: 'users', component: Users, canActivate: [authenticatedGuard]},
  {path: 'clients', component: Client, canActivate: [authenticatedGuard]},
  {path: 'roles', component: Role, canActivate: [authenticatedGuard]},
];

