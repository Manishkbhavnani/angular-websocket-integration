import { Component, Renderer2, Injector ,HostListener,ElementRef} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CookieService } from '@ngx-toolkit/cookie';
import { AuthService } from '../app/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isMobile: any = false;
  public previousUrl: string;
  public isLogin: boolean;
  public currentRoute: any;
  public notAllowedSideBar: any = ['/', '/auth'];
  constructor(private renderer: Renderer2, private router: Router, private cookieService: CookieService, private injector: Injector,private elementRef:ElementRef) {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

    this.applyStickyHeader();
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {

          this.currentRoute = event.url;
          if (event.url === '/auth') {
            cookieService.removeItem('profilepic');
          }
         else {
            cookieService.removeItem('user_type');
          }

          if (cookieService.getItem('token') && !localStorage.getItem('user')) {
            localStorage.setItem('user', JSON.stringify({ token: cookieService.getItem('token') }));
          }
          if (localStorage.getItem('user')) {
            const dtl = JSON.parse(this.cookieService.getItem('_dtl'));
            let role = null;  
          }
      
          const auth = this.injector.get(AuthService);
          if (auth.isAuthenticated() && !this.notAllowedSideBar.find(obj => obj === event.url)) {
            setTimeout(() => {
              this.isLogin = true;
            }, 1000);
          } else {
            this.isLogin = false;
          }
        }

        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url;
        }

      });

  }
  title = 'digi-crop';





getIsMobile(): boolean {
  const w = document.documentElement.clientWidth;
  const breakpoint = 992;
  if (w < breakpoint) {
    return true;
  } else {
    return false;
  }
}

applyStickyHeader(){
  if(!this.isMobile)
  {this.renderer.listen(this.elementRef.nativeElement.parentNode, 
    'scroll', (event) => {
       
  var navbar = document.getElementById("sticky-header");
  // var sticky = navbar.offsetTop;
  var img = document.getElementById("my_image");
   if (event.target.scrollTop >= 60 && navbar && img) {
      navbar.classList.add("sticky")
      img.setAttribute('src','assets/images/logo.png');
    } else {
     if(navbar && img){ navbar.classList.remove("sticky");
      img.setAttribute('src','assets/images/logo.png');}
    }
  
   });}
}


ngAfterViewChecked(): void {

}



}
