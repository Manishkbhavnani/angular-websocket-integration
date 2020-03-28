// Angular Imports
import { Component, OnInit, Renderer2, OnDestroy, Injector } from '@angular/core';
import { MatSpinner } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// Own Imports
import { AuthService } from './auth.service';
import { patternValidator } from '../_shared/pattern.validator';
import { environment } from '../../environments/environment';
import { CookieService } from '@ngx-toolkit/cookie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public authform: FormGroup;
  public loader: any = false;
  public isFormValid = true;
  public roleAvailable: any;
  constructor(private renderer: Renderer2, private authService: AuthService, private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private injector: Injector,
    private router: Router, private cookieService: CookieService) {
    this.renderer.addClass(document.body, 'auth');
  }

  ngOnInit() {
    this.authform = this.fb.group({
      email: [null, [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: [null, [Validators.required]],
      authtype: ['2', [Validators.required]]
    });
    localStorage.removeItem('id_token');
    localStorage.removeItem('role');
    this.cookieService.removeItem('token');
    this.cookieService.removeItem('_dtl');
    localStorage.removeItem('user');

  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'auth');

  }

  public authUser() {
          this.loader = true;
      const toaster = this.injector.get(ToastrService);
      if (this.authform.valid) {
        this.isFormValid = true;

        const params = {
          email: this.authform.get('email').value,
          password: this.authform.get('password').value,
        };

        this.authService
          .login(params)
          .subscribe((data: any) => {
            // this.loader = false;
            this.loader = false;
           
            if (data.body.success === true) {
              localStorage.removeItem('user');
              localStorage.setItem('user', JSON.stringify({ token: data.body.token }));
              this.cookieService.setItem('_dtl', JSON.stringify(data.body.data));
                this.router.navigate(['/user']);

            } else {
              this.loader = false;
              toaster.error(data.body.message, 'Error', {
                timeOut: 3000
              });

            }
          }, (error) => {
            this.loader = false;
            toaster.error(error.message, 'Error', {
              timeOut: 3000
            });

            this.loader = false;
          });
      } else {
        this.isFormValid = false;
        this.loader = false;
      }
    }

  public identifyMe(type?: any) {
    if (this.authform.get('email').value) {
      const params = {
        email: this.authform.get('email').value
      };
      if (type === 'auth') {
        this.loader = true;
      } else {
        this.loader = false;
      }
      const toaster = this.injector.get(ToastrService);
      this.authService
        .userFind(params)
        .subscribe((data: any) => {
          if (data.body.status === true) {
            this.roleAvailable = data.body.role;
            if (type === 'auth') {
              this.authUser();
            }

          } else {
            this.loader = false;
            if (type === 'auth') {
            toaster.error('Login Unsucessful', 'Error', {
              timeOut: 3000
            });
          }
          }
        }, (error) => {
          this.loader = false;
          toaster.error(error.message, 'Error', {
            timeOut: 3000
          });
        });
    }

  }



}




