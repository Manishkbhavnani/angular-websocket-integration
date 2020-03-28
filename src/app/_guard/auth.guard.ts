// Angular or Third Party Imports
import { Injectable, Injector } from '@angular/core';
import decode from 'jwt-decode';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

// Own Imports
import { AuthService } from '../auth/auth.service';
/**
 * Authguard Service for login check for every private route
 */
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      !this.auth.isAuthenticated()) {
      this.router.navigate(['auth']);
      return false;
    }

    return true;
  }

}


/**
 * ReverseAuthGuard Service for check public route
 */
@Injectable()
export class ReverseAuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/user']);
      return false;
    }
    return true;
  }

}











