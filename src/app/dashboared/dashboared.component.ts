import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-dashboared',
  templateUrl: './dashboared.component.html',
  styleUrls: ['./dashboared.component.scss']
})
export class DashboaredComponent implements OnInit, OnDestroy {

  isLogin : any;
  mySlideImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages = [1, 2, 3, 4, 5, 6].map((i) => `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions = {
    items: 1, dots: true, nav: false, loop: false, responsive: {
      0: {
        items: 1,

      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    }
  };
  myCarouselOptions = { items: 1, dots: true, nav: true };


  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private auth: AuthService) {
    if (this.auth.isAuthenticated()) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  
  }

  ngOnInit() {
  }
  ngOnDestroy() {

    this.renderer.removeClass(this.document.body, 'auth');
  }
  public scrollTop() {
    window.scroll(0, 0);
  }
}
