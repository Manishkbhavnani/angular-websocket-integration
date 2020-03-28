import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private jwtHelper: JwtHelperService , private router: Router ,   private cookieService: CookieService ) { }

  login(user?: any): Observable<HttpResponse<any>> {
    return this.http.post(environment.host + 'user/auth', user,
      {observe: 'response'});
  }

  

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(user?: any): Observable<HttpResponse<any>> {
    return this.http.post(environment.host + 'user/logout', '',
      {observe: 'response'});
  }
  logoutAutherized() {
    localStorage.removeItem('user');
    this.cookieService.removeItem('token');
    this.router.navigate(['/auth']);
  }
  
  

  authUser(data?: any) {
    return this.http.post(environment.host + 'user/forgetPassword', data,
    {observe: 'response'});
  }

  

  identify() {
    return this.http.post(environment.host + 'user/me', '',
    {observe: 'response'});
  }

  
  userFind(data?: any) {
    return this.http.post(environment.host + 'user/userFind', data,
    {observe: 'response'});
  }
}
