import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './shared/services/auth.service';
import { ResponsiveService } from 'shared/services/responsive.service';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { OrderViewService } from 'shared/services/order-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  path: string = '';
  path2:string = '';
  displayProductNav?: boolean;
  displayCart: boolean = false;
  displayOrder: boolean = false;
  darkenedScreen: boolean = false;
  swMediumOrSmaller: boolean = false;
  swBreakingPoint: string = '';

  // navigating the user when they login to the intended url. Doing this here because OAuth, redrirect
  constructor( private authService: AuthService, 
    private responsiveService: ResponsiveService, 
    private router: Router,
    private location: Location,
    private screenBrightnessService: ScreenBrightnessService,
    private orderViewService: OrderViewService) {
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
   
    this._setDisplayProductNav();
    this._setPath();
    this.responsiveService.swMediumOrSmaller$
    .subscribe((response: boolean) => {
        if (this.swMediumOrSmaller != response)
        {
          this.swMediumOrSmaller = response;
          if (this.path.slice(0,19) === '/admin/admin-orders' )
          {
            if(this.swMediumOrSmaller && this.displayOrder && !this.darkenedScreen)
            {
              this.screenBrightnessService.changeBrightness();
            }
            if(!this.swMediumOrSmaller && this.displayOrder && this.darkenedScreen)
            {
              this.screenBrightnessService.changeBrightness();
            }
          }
        }
    })
          
    this.screenBrightnessService.brightness$
    .subscribe((bright: boolean) => {
      this.darkenedScreen = bright;
    })
      
    this.orderViewService.orderView$
    .subscribe((view: boolean) => {
          this.displayOrder = view;
        
      })
    }

    _setPath() {
      this.router.events
      .subscribe(evt => {
        if(this.path != this.location.path())
        {
          this.path = this.location.path();
          this.path2 = this.path.slice(0,19) 
          console.log(`path2 is ${this.path2}`);
          this.path = this.path? this.path : '/';
          console.log(this.path)
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
      this.displayCart = !this.displayCart;
      this._setDarkenScreen();
    }

    _setDarkenScreen(){

      if (this.darkenedScreen && this.displayCart)
      {
        this.screenBrightnessService.changeBrightness();
        this.displayCart = !this.displayCart;
        return;
      }

      //  CLICKING ON DESKTOP SHOPPING CART BUTTON
      if (!this.darkenedScreen && this.displayCart)
      {
        this.screenBrightnessService.changeBrightness();
        return;
      }

      if (this.displayOrder && this.darkenedScreen)
      {
        this.screenBrightnessService.changeBrightness();
        this.orderViewService.changeOrderView(false);
        return;
      }
      //  CLICKING ON DESKTOP HIDE SHOPPING CART BUTTON
      if (this.darkenedScreen && !this.displayCart)
      {
        this.screenBrightnessService.changeBrightness();
        return;
      }

    }
  }
   
      
