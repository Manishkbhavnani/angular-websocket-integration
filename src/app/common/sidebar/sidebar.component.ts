import { Component, OnInit, Input, Injector, AfterContentChecked } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CookieService } from '@ngx-toolkit/cookie';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
import { CommonService } from '../common.service';
import { WebsocketService } from '../../chat/chat.service';

import { Observable, Subscription,timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/dashboared/dashboared.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: any;
  submenu: any;
}
export const ROUTES: RouteInfo[] = [
  { path: '/user', title: 'Dashboard', icon: 'dashboard', class: 1, submenu: [] },
  { path: '/chat', title: 'Chat', icon: 'chat', class: 'chat', submenu: [] },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterContentChecked {
  menuItems: any[];
  public switchUser: any;
  public isLogin: any;
  public loginRoute: any;
  public loginRole: any = 1;
  public userRole: any =1;
  public loggedInUserId: any = '';
  public loginUserRoleDashboared: any;
  public unreadMsgCount:any;

  public timerSubscription2: Subscription;
  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private injector: Injector) { 
    
  }

  ngOnInit() {
    const auth = this.injector.get(AuthService);
    if (auth.isAuthenticated()) {
      const cookieService = this.injector.get(CookieService);
      const userData = JSON.parse(cookieService.getItem('_dtl'));
      this.timerSubscription2 = timer(0, 10000).subscribe(() => this.unreadMsg());
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.authManage();
  }
 
  isMobileMenu() {
    if ($(window).width() > 1024) {
      return false;
    }
    return true;
  };
  public authManage() {


    const cookieService = this.injector.get(CookieService);
    // const commonService = this.injector.get(CommonService);
    if (localStorage.getItem('user')) {
      this.isLogin = true;
      // this.image = cookieService.getItem('profilepic');
      const userData = JSON.parse(cookieService.getItem('_dtl'));
      this.loginUserRoleDashboared = 'user';
      this.loggedInUserId = userData['_id'];
      this.loginRole = 1;
      this.userRole = 1
      this.loginRoute = this.router.url;
    } else {
      this.isLogin = false;
    }
  }

  ngAfterContentChecked() {
    this.authManage();
  }


  public logoutUser() {

    this.authService
      .logout()
      .subscribe((data: any) => {

        if (data.body.success === true) {
          localStorage.removeItem('user');
          this.cookieService.removeItem('token');
          this.cookieService.removeItem('_dtl');
          this.router.navigate(['auth']);
        }
      }, (error) => {

      });
  }

  public unreadMsg() {
    const auth = this.injector.get(AuthService);
    if (auth.isAuthenticated()) {
      const obj =  {role:this.loginRole}
    let chatService = this.injector.get(WebsocketService);
    chatService.unreadMsgCount(obj).subscribe((result) => {
      if (result['body']['status'] === 200 && result['body']['data'].length > 0) {
        this.unreadMsgCount = result['body']['data'][0]['count'];        
      }else{
        this.unreadMsgCount =0;
      } 
    
    })
  }
  }












  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.timerSubscription2.unsubscribe();
  }

}
