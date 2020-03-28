import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CommonsModule} from './../common/common.module';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CommonsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers : [AuthService]
})
export class AuthModule { }
