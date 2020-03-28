import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpUserServiceService {

  constructor(private http: HttpClient) { }

  registerUser(user?: any): Observable<HttpResponse<any>> {
    return this.http.post(environment.host + 'user/register', user,
      {observe: 'response'});
  }

}
