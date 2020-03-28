import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  updateUserProfile(data?: any){
    return this.http.post(environment.host + 'user/updateProfile',data,{observe:'response'})
  }

  userFind(data ?: any) {
    return this.http.post(environment.host + 'user/userFind', data,{observe: 'response'});
  }

}
