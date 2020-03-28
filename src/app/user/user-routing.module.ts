import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReverseAuthGuardService , AuthGuardService  } from '../_guard/auth.guard';
const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
