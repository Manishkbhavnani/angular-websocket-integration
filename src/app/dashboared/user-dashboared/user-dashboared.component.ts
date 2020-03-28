import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from '../../common/common.service';
import { DashboardService } from '../dashboared.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { CookieService } from '@ngx-toolkit/cookie';
import { AuthService } from 'src/app/auth/auth.service';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-user-dashboared',
  templateUrl: './user-dashboared.component.html',
  styleUrls: ['./user-dashboared.component.scss']
})
export class UserDashboaredComponent implements OnInit, OnDestroy {
  public loader: any;
  public timerSubscription: Subscription;
  public timerSessionSubscription: Subscription;


  public profilePic: any;
  public loginUserRoleDashboared: any;
  public unreadChatsList: any = [];
  public isLogin: any;
  public userInfo : any;
  public loginRoute: any;
  public loginRole: any;
  public loggedInUserId: any = '';
  public environment = environment;

  constructor(public injector: Injector, private router: Router) {

  }

  ngOnInit() {
    this.authManage();
  }


  public ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

  }




  private subscribeToData1(): void {
    const auth = this.injector.get(AuthService);
  }
  public userDetail() {
    const userService = this.injector.get(AuthService);
    userService.identify().subscribe((data) => {
      if (data && data['body'] && data['body']['success'] === true && data['body']['data']) {
        const userDetails= data['body']['data'];
        this.userInfo =userDetails; 
                }
    }, (error) => {
      console.error(error);
    });
  }


  public authManage() {
    const cookieService = this.injector.get(CookieService);
    const commonService = this.injector.get(CommonService);
    if (localStorage.getItem('user')) {
      const userData = JSON.parse(cookieService.getItem('_dtl'));
      this.loginUserRoleDashboared = '/user'
      this.loggedInUserId = userData['_id'];
      this.loginRole = userData['lg_role'];
      this.loginRoute = this.router.url;
      this.userDetail();
    } else {
      this.isLogin = false;
    }
  }



}
