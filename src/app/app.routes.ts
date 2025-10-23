import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Userinformation} from './userinformation/userinformation';
import {authenticatedGuard} from './authenticated-guard';
import {Accesstoken} from './accesstoken/accesstoken';
import {User} from './user/user';
import {Client} from './client/client';
import {Role} from './role/role';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'userinformation', component: Userinformation, canActivate: [authenticatedGuard]},
  {path: 'accesstoken', component: Accesstoken, canActivate: [authenticatedGuard]},
  {path: 'users', component: User, canActivate: [authenticatedGuard]},
  {path: 'clients', component: Client, canActivate: [authenticatedGuard]},
  {path: 'roles', component: Role, canActivate: [authenticatedGuard]},
];

