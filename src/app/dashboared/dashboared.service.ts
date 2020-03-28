import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private http: HttpClient) { }

  unreadChat(data:any): Observable<HttpResponse<any>>{
    return this.http.post(environment.host + 'chat/unreadChat',data,{observe:'response'})
  }


}