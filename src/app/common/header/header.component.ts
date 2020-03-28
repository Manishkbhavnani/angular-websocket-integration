import { Component, OnInit, Input, Injector, AfterContentChecked, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
import { CommonService } from '../common.service';
import { ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterContentChecked {
  public loader: any = false;
  public isLogin: any;
  public loginRoute: any;
  public switchUser: any;
 
  public loginRole: any;
  public loggedInUserId: any = '';
  public loginUserRoleDashboared: any;
  public userRole: any;
  @Input('image') image: string;

  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
 
  public countNotify: any = 0;
  public recentUnreadNotify :any;
  constructor(location: Location, private element: ElementRef, private authService: AuthService, private router: Router, private cookieService: CookieService, private injector: Injector) {
    this.location = location;
    this.sidebarVisible = false;
  }

  public authManage() {


    const cookieService = this.injector.get(CookieService);
    const commonService = this.injector.get(CommonService);
    if (localStorage.getItem('user')) {
      this.isLogin = true;
      this.image = cookieService.getItem('profilepic');
      const userData = JSON.parse(cookieService.getItem('_dtl'));
      this.loginUserRoleDashboared = '/user'
      this.loggedInUserId = userData['_id'];
      this.loginRole = parseInt(userData['lg_role'], 10);
      this.userRole = parseInt(userData['role'], 10);
    
      this.loginRoute = this.router.url;
    } else {
      this.isLogin = false;
    }
  }
  ngOnInit() {
    const auth = this.injector.get(AuthService);

    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    // for sidebar
    $(document).ready(() => {
      $('#menu-toggle').click((e) => {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });
    this.authManage();
  }
  ngAfterViewInit(): void {
   
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    // for sidebar
    $(document).ready(() => {
      $('#menu-toggle').click((e) => {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
      });
    });
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      if (toggleButton && toggleButton.classList) {
        toggleButton.classList.add('toggled');
      }

    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    if (this.toggleButton && this.toggleButton.classList) {
      this.toggleButton.classList.remove('toggled');
    }
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    var $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
   
      this.sidebarOpen();
    } else {
   
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  public logoutUser() {

    this.authService
      .logout()
      .subscribe((data: any) => {
        this.loader = false;
        if (data.body.success === true) {
          localStorage.removeItem('user');
          this.cookieService.removeItem('token');
          this.cookieService.removeItem('_dtl');
          this.router.navigate(['auth']);
        }
      }, (error) => {
        this.loader = false;
      });
  }



  ngAfterContentChecked() {
    this.authManage();
  }






  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }
}
