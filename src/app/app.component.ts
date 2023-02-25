import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { ResponsiveService } from 'shared/services/responsive.service';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { DisplayCartService } from 'shared/services/display-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  path: string = '';
  displayProductNav?: boolean;
  displayCart: boolean = false;
  displayOrder: boolean = false;
  darkenedScreen: boolean = false;
  swMediumOrSmaller: boolean = false;

  // navigating the user when they login to the intended url. Doing this here because OAuth, redrirect
  constructor( private authService: AuthService, 
    // private responsiveService: ResponsiveService, 
    private router: Router,
    private location: Location,
    private screenBrightnessService: ScreenBrightnessService,
    private displayCartService: DisplayCartService) {
    // app component is a single instance so don't worry about unsubscribing
    console.log(window.innerWidth)
    this.authService.user$.subscribe(user => {
      if(user){
          let returnUrl = localStorage.getItem('returnUrl');
          console.log('appComponent refresh')
          if (returnUrl && returnUrl != "null")
          {       
            console.log(`returnUrl is ${returnUrl}`);
            localStorage.removeItem('returnUrl');
            return router.navigateByUrl(returnUrl);
          }
          return; 
      }
      return;
    })
  }
  ngOnInit(): void {
    this.displayCartService.displayCart$
    .subscribe((display: boolean) => {
        this.displayCart = display;
    })
    this._setDisplayProductNav();
    this._setPath();
    // this.responsiveService.swMediumOrSmaller$
    // .subscribe((response: boolean) => {
    //     if (this.swMediumOrSmaller != response)
    //     {
    //       this.swMediumOrSmaller = response;
    //     }
    // })
  }

  _setPath() {
    this.router.events
    .subscribe(evt => {
      if(this.path != this.location.path())
      {
        this.path = this.location.path();
        this.path = this.path? this.path : '/';
        this._setDisplayProductNav()
      }
    })
  }

  _setDisplayProductNav() {
    if (this.path === "/shopping-cart")
    {
      this.displayProductNav = false;
      return;
    }
    this.displayProductNav = true;
  }

  // small shopping cart click DOES NOT CALL THIS
  _setDisplayCart() {
    this.displayCartService._setDisplayCart();
    this.screenBrightnessService.changeBrightness();
  }

}
   
      
