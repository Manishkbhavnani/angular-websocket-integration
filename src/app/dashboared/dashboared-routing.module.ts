import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboaredComponent } from './dashboared.component';

import { UserDashboaredComponent } from './user-dashboared/user-dashboared.component';
import {  AuthGuardService  , ReverseAuthGuardService} from '../_guard/auth.guard';
const routes: Routes = [ {
  path: '', component: DashboaredComponent},{
  path: 'user', component: UserDashboaredComponent , canActivate: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboaredRoutingModule { }
