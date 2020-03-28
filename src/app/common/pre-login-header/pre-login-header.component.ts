import { Component, OnInit , AfterViewChecked} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
import * as $ from 'jquery';
@Component({
  selector: 'app-pre-login-header',
  templateUrl: './pre-login-header.component.html',
  styleUrls: ['./pre-login-header.component.scss']
})
export class PreLoginHeaderComponent implements OnInit {
  public isLogin: boolean;
  public loginUserRoleDashboared: any;
  public loader : boolean;
  constructor(private authService: AuthService , private router: Router, private cookieService: CookieService) { 
    if (localStorage.getItem('user')) {
      const userData = JSON.parse(cookieService.getItem('_dtl'));
      this.loginUserRoleDashboared = '/user';
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
 
    
    $(document).ready(function(){
      if ($(window).width() < 991) {
        $("#menuDropdown").removeClass('navbar-collapse');
        // document.getElementById('#menuDropdown').classList.remove('navbar-collapse');
      }else{
        $("#menuDropdown").addClass('navbar-collapse');
        // document.getElementById('#menuDropdown').classList.add('navbar-collapse');
      }
      if(router.url === '/')
     {
          $("#my_image").attr("src","assets/images/logo.png");
          $('.header-transparent .menu-links .nav>li>a').addClass('custom-color-white');
          $('.header-transparent .menu-links .nav>li>a').removeClass('custom-color-black');
        }
      else{
        $("#my_image").attr("src","assets/images/logo.png");
        $('.header-transparent .menu-links .nav>li>a').removeClass('custom-color-white');
        $('.header-transparent .menu-links .nav>li>a').addClass('custom-color-black');
      }
     
  })
 
  }
  
ngAfterViewChecked(): void {
 
 
  //Called after every check of the component's view. Applies to components only.
  //Add 'implements AfterViewChecked' to the class.
  if ($(window).width() < 991) {
    $("#menuDropdown").removeClass('navbar-collapse');
    // document.getElementById('#menuDropdown').classList.remove('navbar-collapse');
  }else{
    $("#menuDropdown").addClass('navbar-collapse');
    // document.getElementById('#menuDropdown').classList.add('navbar-collapse');
  }
}
ngOnInit() {
   
  }



  public myFunction() {
  
    var height = window.scrollY;

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

}
