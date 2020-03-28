import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReverseAuthGuardService , AuthGuardService} from '../_guard/auth.guard';
import { SignUpUserSComponent} from './sign-up-user/sign-up-user.component';
const routes: Routes = [{ path: '', component: SignUpUserSComponent  , canActivate: [ReverseAuthGuardService] },
{path : 'sign-up-user' , component : SignUpUserSComponent  , canActivate: [ReverseAuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
