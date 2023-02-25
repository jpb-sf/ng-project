import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderViewService } from 'shared/services/order-view.service';
import { ResponsiveService } from 'shared/services/responsive.service';
import { ScreenBrightnessService } from 'shared/services/screen-brightness.service';
import { DisplayCartService } from 'shared/services/display-cart.service';

@Component({
  selector: 'screen-brightness',
  templateUrl: './screen-brightness.component.html',
  styleUrls: ['./screen-brightness.component.scss']
})
export class ScreenBrightnessComponent implements OnInit {
    path: string = '';
    displayOrder: boolean = false;
    displayCart: boolean = false;
    darkenedScreen: boolean = false;
    swMediumOrSmaller: boolean = false;

    constructor( 
      private responsiveService: ResponsiveService,
      private router: Router,
      private location: Location,
      private screenBrightnessService: ScreenBrightnessService,
      private orderViewService: OrderViewService, 
      private displayCartService: DisplayCartService) {
    }

    ngOnInit(): void {
      
      this.screenBrightnessService.brightness$
      .subscribe((bright: boolean) => {
        this.darkenedScreen = bright;
      })
        
      this.orderViewService.orderView$
      .subscribe((view: boolean) => {
        this.displayOrder = view;
      })

      this.displayCartService.displayCart$
      .subscribe((displayCart: boolean) => {
        this.displayCart = displayCart;
      })

      this.router.events
      .subscribe(evt => {
        if(this.path != this.location.path())
        {
          this.path = this.location.path();
        }
      })
        this.responsiveService.swMediumOrSmaller$
        .subscribe((response: boolean) => {
          if (this.swMediumOrSmaller != response)
          {
            this.swMediumOrSmaller = response;
          }
      
          if (this.path.slice(0,19) === '/admin/admin-orders' )
          {
    
            if (this.swMediumOrSmaller && this.displayOrder && !this.darkenedScreen)
            {
              this.screenBrightnessService.changeBrightness();
            }
            if (!this.swMediumOrSmaller && this.displayOrder && this.darkenedScreen)
            {
              this.screenBrightnessService.changeBrightness();
            }
          }
        })
    }

    _setDarkenScreen() {
      this.screenBrightnessService.changeBrightness()
      this.orderViewService.changeOrderView(false);
      if (this.displayCart)
      {
        this.displayCartService._setDisplayCart();
      }
    }
}
