import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { ResponsiveService } from 'shared/services/responsive.service';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { DisplayCartService } from 'shared/services/display-cart.service';
import { DisplayLoginService } from 'shared/services/display-login.service';

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
  displayLoginNav: boolean = false;

  // navigating the user when they login to the intended url. Doing this here because OAuth, redrirect
  constructor( private authService: AuthService, 
    // private responsiveService: ResponsiveService, 
    private router: Router,
    private location: Location,
    private screenBrightnessService: ScreenBrightnessService,
    private displayCartService: DisplayCartService,
    private displayLoginService: DisplayLoginService) {
    
    // app component is a single instance so don't worry about unsubscribing
    this.authService.user$.subscribe(user => {
      if(user)
      {
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl && returnUrl != "null")
        {       
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

    this.displayLoginService.displayLogin$
    .subscribe((display: boolean) => {
      this.displayLoginNav = display
    })
    this._setDisplayProductNav();
    this._setPath();
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
    console.log(`setDisplayCart() is being called from app.comp`);
  }

  _setDisplayLogin() {
    this.displayLoginService._setDisplayLogin(true);
    this.screenBrightnessService.changeBrightness();
    console.log(`setDisplayLogin() is being called from app.comp`);
  }

}
   
      
