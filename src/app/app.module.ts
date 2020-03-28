import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwlModule } from 'ngx-owl-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {JwtInterceptor} from './_incercepter/jwt.intercepter';
import {ErrorInterceptor} from './_incercepter/error.interceptor';
import {AuthGuardService  ,  ReverseAuthGuardService} from './_guard/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { CookieModule } from '@ngx-toolkit/cookie';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { WebsocketService } from './chat/chat.service';
import { MatInputModule } from '@angular/material';
import {CommonsModule } from '../app/common/common.module';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    OwlModule,
    BrowserModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    CommonsModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} , AuthGuardService, ReverseAuthGuardService, CookieService,  {
    provide: JWT_OPTIONS, useValue: JWT_OPTIONS
  }, JwtHelperService,
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  WebsocketService
],
  bootstrap: [AppComponent],
  exports : []
})
export class AppModule { }
