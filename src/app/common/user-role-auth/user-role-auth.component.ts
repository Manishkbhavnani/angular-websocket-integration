import { Component, Inject, Injector } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-user-role-auth',
  templateUrl: './user-role-auth.component.html',
  styleUrls: ['./user-role-auth.component.scss']
})
export class UserRoleAuthComponent {
  public userRoleSignUp: FormGroup;
  animal: string;
  name: string;
  public isSubmit: any = false;
  public dialogData;
  public invalidAuth: any;
  constructor(
    public dialogRef: MatDialogRef<UserRoleAuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private injector: Injector, private fb: FormBuilder) {
    this.dialogData = data;
    this.isSubmit = true;
    this.userRoleSignUp = this.fb.group({
      password: [null, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
